'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';



export function useTasks(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    },[])

    async function fetchTasks() {
        try {
            setLoading(true);
            const response = await fetch('/api/tasks');
            if(!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoading(false);
        }
    }

    async function createTask(title: string, description: string, dueDate: string){
        try {
            setLoading(true);
            const response = await fetch('/api/tasks',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, description, dueDate})
            });
            if(!response.ok) throw new Error('Failed to create task');
            await fetchTasks();
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoading(false);
        }
    }


    async function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>){
        try {
            setLoading(true);
            const response = await fetch(`/api/tasks/${id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            })
            if(!response.ok) throw new Error('Failed to update task');
            await fetchTasks();
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoading(false);
        }
    }

    async function deleteTask(id: string){
        try {
            setLoading(true);
            const response = await fetch(`/api/tasks/${id}`,{
                method: 'DELETE'
            })
            if(!response.ok) throw new Error('Failed to delete task');
            await fetchTasks();
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoading(false);
        }
    }




    return {
        tasks,
        loading,
        error,
        createTask,
        fetchTasks,
        updateTask,
        deleteTask,
    }
}