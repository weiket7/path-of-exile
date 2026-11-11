import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { storageGet, storageSet } from '../lib/storage'

export const Route = createFileRoute('/todo')({ component: TodoList })

const TASKS_KEY = 'wh_todo_tasks'

type Category = 'Leveling' | 'Atlas' | 'Farming' | 'Trading' | 'Other'
type Priority = 'Low' | 'Medium' | 'High'
type StatusFilter = 'all' | 'active' | 'done'

interface Task {
  id: string
  text: string
  category: Category
  priority: Priority
  done: boolean
}

const CATEGORIES: Array<Category> = ['Leveling', 'Atlas', 'Farming', 'Trading', 'Other']

const PRIORITY_PILL: Record<Priority, string> = {
  Low: 'wh-pill-gem',
  Medium: 'wh-pill-magic',
  High: 'wh-pill-unique',
}

function uid() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `t${Date.now()}_${Math.random().toString(36).slice(2)}`
}

function TodoList() {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [catFilter, setCatFilter] = useState<'all' | Category>('all')
  const [text, setText] = useState('')
  const [category, setCategory] = useState<Category>('Leveling')
  const [priority, setPriority] = useState<Priority>('Medium')

  useEffect(() => {
    setTasks(storageGet<Array<Task>>(TASKS_KEY, []))
  }, [])

  function persist(next: Array<Task>) {
    setTasks(next)
    storageSet(TASKS_KEY, next)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    persist([...tasks, { id: uid(), text: trimmed, category, priority, done: false }])
    setText('')
  }

  function toggleDone(id: string) {
    persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id: string) {
    persist(tasks.filter((t) => t.id !== id))
  }

  const remaining = tasks.filter((t) => !t.done).length
  const filtered = tasks
    .filter((t) => {
      if (statusFilter === 'active' && t.done) return false
      if (statusFilter === 'done' && !t.done) return false
      if (catFilter !== 'all' && t.category !== catFilter) return false
      return true
    })
    .slice()
    .reverse()

  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">05 · Tool</div>
        <h1>League To-Do List</h1>
        <p>
          Track goals across leveling, the Atlas, farming, and trading.
          Everything here is saved locally in this browser — nothing is sent
          anywhere.
        </p>
      </div>

      <form className="wh-composer" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Level Chieftain to 68, buy 6-link chest…"
          required
          maxLength={140}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>
        <button type="submit" className="wh-btn wh-btn-primary">
          Add task
        </button>
      </form>

      <div className="wh-toolbar">
        {(['all', 'active', 'done'] as Array<StatusFilter>).map((f) => (
          <button
            key={f}
            type="button"
            className={statusFilter === f ? 'wh-tab is-active' : 'wh-tab'}
            onClick={() => setStatusFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
          </button>
        ))}
        <select
          className="wh-cat-filter"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value as 'all' | Category)}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="wh-remaining">{remaining} open</span>
      </div>

      <div className="wh-task-list">
        {filtered.length === 0 ? (
          <div className="wh-empty">
            {tasks.length ? 'Nothing matches this filter.' : 'No goals yet — add your first one above.'}
          </div>
        ) : (
          filtered.map((task) => (
            <label key={task.id} className={task.done ? 'wh-task is-done' : 'wh-task'}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <span className="wh-body">
                <b>{task.text}</b>
                <span className="wh-meta">
                  <span className="wh-pill wh-pill-normal">{task.category}</span>
                  <span className={`wh-pill ${PRIORITY_PILL[task.priority]}`}>
                    {task.priority}
                  </span>
                </span>
              </span>
              <button
                type="button"
                className="wh-del"
                title="Delete"
                onClick={(e) => {
                  e.preventDefault()
                  remove(task.id)
                }}
              >
                ✕
              </button>
            </label>
          ))
        )}
      </div>
    </main>
  )
}
