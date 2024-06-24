'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import TaskItem from './TaskItem'

type Task = {
  id: string
  title: string
  description: string
  status: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const supabase = createClient()

  

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tasks:', error)
    } else {
      setTasks(data || [])
    }
  }

  async function deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .match({ id })

    if (error) {
      console.error('Error deleting task:', error)
    } else {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  async function updateTask(id: string, updatedTask: Partial<Task>) {
    const { error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .match({ id })

    if (error) {
      console.error('Error updating task:', error)
    } else {
      setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task))
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={deleteTask} 
          onUpdate={updateTask} 
        />
      ))}
    </div>
  )
}