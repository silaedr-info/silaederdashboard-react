import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function whoami(req, res) {
    if (req.method === 'GET') {
        const token = await prisma.user_token.findMany({
            where: {
                token: req.body.token,
            },
        });
        const user = await prisma.user.findMany({
            where: {
                id: token[0].userId,
            },
        });
        res.status(200).json(user[0]);
    }
}
