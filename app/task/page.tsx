"use client";

import { useState } from "react";
import CreateTaskForm from "../../components/CreateTaskForm";
import TaskList from "../../components/TaskList";
import Link from "next/link";
import "./task.css";

export default function TaskPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <section className="task-page">
      <div className="">
        <h1 className="title">Gestionnaires des tâches.</h1>

        <div className="text">
          <CreateTaskForm onTaskCreated={handleTaskCreated} />
        </div>
      </div>

      <div className="task-container mt-20">
        <h2 className="title">Vos tâches.</h2>
        <TaskList key={refreshTrigger} />
      </div>
      <Link href="/" className="link-task">
        Revenir à l'accueil
      </Link>
    </section>
  );
}
