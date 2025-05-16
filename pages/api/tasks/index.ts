import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, resp: NextApiResponse){
    if(req.method === 'GET'){
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return resp.status(200).json(tasks);
    }

    if(req.method === 'POST'){
        const {title, description, dueDate} = req.body;
        if(!title || !description || !dueDate){
            return resp.status(400).json({message: 'Title and description are required'});
        }
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate)
            }
        });
        return resp.status(201).json(newTask);
    }

    resp.setHeader('Allow', ['GET', 'POST']);
    resp.status(405).end(`Method ${req.method} Not Allowed`);
}