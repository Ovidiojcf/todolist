// pages/api/tasks/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
    const { id } = req.query

    if (req.method === 'PUT') {
        const { title, description, dueDate, done } = req.body;

        if (!title || !description || !dueDate || typeof done !== 'boolean') {
            return resp.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const updatedTask = await prisma.task.update({
                where: { id: id as string },
                data: {
                    title,
                    description,
                    dueDate: new Date(dueDate),
                    done
                }
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
