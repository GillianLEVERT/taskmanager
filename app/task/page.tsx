'use client'

import { useState } from 'react'
import CreateTaskForm from '../../components/CreateTaskForm'
import TaskList from '../../components/TaskList'

export default function TaskPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTaskCreated = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create a New Task</h2>
        <CreateTaskForm onTaskCreated={handleTaskCreated} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
        <TaskList key={refreshTrigger} />
      </div>
    </div>
  )
}