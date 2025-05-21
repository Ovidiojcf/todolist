'use client';

import React from "react";
import { Task } from "@/types/task";
import { format, isBefore } from "date-fns";
import { CheckSquare, Square, Edit, Trash } from "lucide-react";

interface TaskItemProps {
    task: Task;
    onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => void;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete}: TaskItemProps){
    const dueDate = new Date(task.dueDate);
    const isOverdue = !task.done && isBefore(dueDate, new Date());
    
    let status = '';
    let statusClass = '';

    if(task.done){
        status = 'Concluída';
        statusClass = 'bg-green-200 text-green-800';
    }else if(isOverdue){
        status = 'Atrasada';
        statusClass = 'bg-red-200 text-red-800';
    }else{
        status = 'Pendente';
        statusClass = 'bg-yellow-200 text-yellow-800';
    }

    function toggleDone(){
        onUpdate(task.id, {done: !task.done});
    }

    return (
        <li className={`flex items-center justify-between p-4 border rounded-md mb-2 
            ${ task.done ? 'bg-white border-green-600' : isOverdue ? 'bg-red-100 text-red-700' : 'bg-white'}`
        }>
            <div className="flex items-center space-x-4">
                <button
                    className="text-gray-800 focus:outline-none"
                    onClick={toggleDone}
                    aria-label={task.done ? 'Mark as undone' : 'Mark as done'}>
                        {task.done ? <CheckSquare size={24} /> : <Square size={24} />}
                </button>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-800">{ task.title }</h3>
                        <span className={`text-sm px-2 py-1 rounded text-right ${statusClass}`}>{status}</span>
                    </div>
                    <p className="text-sm text-gray-800 whitespace-pre-line pr-2">{ task.description }</p>
                    <p className="text-xs mt-1 text-gray-800">Data: {format(dueDate, 'dd/MM/yyyy')}</p>
                </div>
            </div>

            <div className="flex space-x-3">
                <button 
                    className="text-blue-600 hover:text-blue-800"
                    // TODO: implementar edição com formulário modal ou inline
                    onClick={() => onUpdate(task.id, {})}
                    aria-label="Edit task">
                        <Edit size={20}></Edit>
                </button>
                <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete(task.id)}
                    aria-label="Delete task">
                        <Trash size={20} />
                </button>
            </div>
        </li>
    );
}