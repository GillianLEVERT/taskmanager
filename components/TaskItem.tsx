'use client'

import { useState } from 'react'
import '../app/task/task.css';

type Task = {
  id: string
  title: string
  description: string
  status: string
}

type TaskItemProps = {
  task: Task
  onDelete: (id: string) => void
  onUpdate: (id: string, updatedTask: Partial<Task>) => void
}

export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)

  const handleUpdate = () => {
    onUpdate(task.id, {
      title: editedTitle,
      description: editedDescription
    })
    setIsEditing(false)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(task.id, { status: e.target.value })
  }



  if (isEditing) {
    return (
      <div className="task-item task-form">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <button onClick={handleUpdate} className="task-button save-button">Sauvegarder</button>
        <button onClick={() => setIsEditing(false)} className="task-button cancel-button">Annuler</button>
      </div>
    )
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status status-${task.status}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="task-select"
        >
          <option value="pending">En attente</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Complétée</option>
        </select>
        <button onClick={() => setIsEditing(true)} className="task-button edit-button">Modifier</button>
        <button onClick={() => onDelete(task.id)} className="task-button delete-button">Supprimer</button>
      </div>
    </div>
  )
}