import { PrismaClient } from '@prisma/client';
import { getCookie, hasCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function login(req, res) {
    if (req.method === 'GET') {
        if (hasCookie('token', { req, res })) {
            const token = getCookie('token', { req, res });
            const token_in_db = await prisma.user_token.findMany({
                where: {
                    token: token,
                },
            });
            if (token_in_db.length > 0) {
                if (token_in_db[0].expires.valueOf() > Date.now().valueOf()) {
                    res.status(200).json({
                        success: true,
                        user_id: token_in_db[0].userId,
                    });
                    return;
                }
            }
        }
        res.status(200).json({ success: false });
    }
}
