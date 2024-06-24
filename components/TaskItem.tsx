'use client'

import { useState } from 'react'

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600 text-yellow-100'
      case 'in_progress': return 'bg-blue-600 text-blue-100'
      case 'completed': return 'bg-green-600 text-green-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  if (isEditing) {
    return (
      <div className="border border-gray-600 p-4 rounded shadow-md bg-gray-800">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded bg-gray-700 text-white"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded bg-gray-700 text-white"
        />
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">Save</button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
      </div>
    )
  }

  return (
    <div className="border border-gray-600 p-4 rounded shadow-md bg-gray-800">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-gray-300 mb-4">{task.description}</p>
      <div className="mt-2 flex items-center">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="mr-2 p-2 border rounded bg-gray-700 text-white"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => setIsEditing(true)} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-700">Edit</button>
        <button onClick={() => onDelete(task.id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
      </div>
    </div>
  )
}