'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type CreateTaskFormProps = {
    onTaskCreated: () => void;
  }

  export default function CreateTaskForm({ onTaskCreated }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      console.error('User not found')
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        { title, description, user_id: user.id },
      ])

    if (error) {
      console.error('Error inserting task:', error)
    } else {
      setTitle('')
      setDescription('')
      onTaskCreated() 
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <div>
        <label htmlFor="title">
          Titre 
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Ajouter'}
      </button>
    </form>
  )
}