'use client';

import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from '@/components/task/TaskForm';
import { TaskItem } from '@/components/task/TaskItem';
import { Task } from '@/types/task';

export default function HomePage(){
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function handleSave(data: { title: string; description: string; dueDate: string }) {
    if (editingTask) {
      updateTask(editingTask.id, {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
      });
      setEditingTask(null);
    } else {
      createTask(data.title, data.description, data.dueDate);
    }
  }

  function handleCancel() {
    setEditingTask(null);
  }

  return (
    <main className='max-w-xl mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-4'>Tarefas</h1>

      <TaskForm
        onSave={handleSave}
        onCancel={handleCancel}
        initialData={
          editingTask
            ? {
              title: editingTask.title,
              description: editingTask.description,
              dueDate: editingTask.dueDate,
            }
            : undefined
        }
      />

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={(id, updates) => {
              if(Object.keys(updates).length === 1 && 'done' in updates){
                updateTask(id, updates);
              }else{
                const target = tasks.find((t) => t.id === id);
                if(target) setEditingTask(target);
              }
            }}
            onDelete={(id) => deleteTask(id)}        
          />
        ))}
      </ul>
    </main>
  );
}