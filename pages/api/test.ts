import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
}
