// pages/api/tasks/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
    const { id } = req.query

    if (req.method === 'PUT') {
        const { title, description, dueDate, done } = req.body;
        // Validate the request body more simply
        // Just to update parts of the task
        //!title || !description || !dueDate || typeof done !== 'boolean'
        if (!id || typeof id !== 'string') {
            return resp.status(400).json({ message: 'Missing required fields' });
        }

        try {
            // update only the fields that are provided
            const dataToUpdate: Partial<{
            title: string;
            description: string;
            dueDate: Date;
            done: boolean;
            }> = {};
            if (title !== undefined) dataToUpdate.title = title;
            if (description !== undefined) dataToUpdate.description = description;
            if (dueDate !== undefined) dataToUpdate.dueDate = new Date(dueDate);
            if (done !== undefined) dataToUpdate.done = done;

            const updatedTask = await prisma.task.update({
                where: { id },
                data: dataToUpdate,
            });

            return resp.status(200).json(updatedTask);
        } catch (error) {
            console.error('Failed to update task:', error);
            return resp.status(404).json({ message: 'Task with given ID not found' });
        }
    }

    if (req.method === 'DELETE') {
        await prisma.task.delete({ where: { id: id as string } })
        return resp.status(204).end()
    }

    resp.setHeader('Allow', ['PUT', 'DELETE'])
    resp.status(405).end(`Method ${req.method} Not Allowed`)
}
