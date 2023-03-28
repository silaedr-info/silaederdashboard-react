import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getMarks(req, res) {
    if (req.method === 'GET') {
        const token = await prisma.user_token.findMany({
            where: {
                token: req.body.token,
            },
        });
        const user = await prisma.user_marks_cache.findMany({
            where: {
                userId: token[0].userId,
            },
            orderBy: [{ date: 'asc' }],
        });
        let matprak = [];
        user.forEach((x) => {
            matprak.push(x.matprak);
        });
        res.status(200).json({ matprak: matprak });
    }
}
