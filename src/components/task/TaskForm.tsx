'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';



interface TaskFormProps {
    onSave: (data: {title: string, description: string, dueDate: string}) => void;
    initialData?: Pick<Task, 'title' | 'description' | 'dueDate'>;
    onCancel: () => void;
}

export function TaskForm({ onSave, initialData, onCancel}: TaskFormProps){
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [dueDate, setDueDate] = useState(initialData?.dueDate || '');

    useEffect(() => {
        if(initialData){
            setTitle(initialData.title);
            setDescription(initialData.description);
            setDueDate(initialData.dueDate.slice(0,10)); // slice(0, 10) to get YYYY-MM-DD format
        }
    }, [initialData]);

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if(!title || !description || !dueDate) return;

        const [year, month, day] = dueDate.split('-').map(Number);
        const adjustedDate = new Date(year, month - 1, day, 23, 59, 59, 999);

        onSave({ title, description,dueDate: adjustedDate.toISOString() });
        setTitle('');
        setDescription('');
        setDueDate('');
    }

    return(
        <form 
            onSubmit={handleSubmit}
            className='space-y-4 p-4 border rounded-md bg-white mb-4'>
                <Input
                    placeholder='Título'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    placeholder='Descrição'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    type='date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <div className="flex space-x-2">
                    <Button type="submit">Salvar</Button>
                    {onCancel && (
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Cancelar
                        </Button>
                        )}
                </div>
            </form>
    );
}