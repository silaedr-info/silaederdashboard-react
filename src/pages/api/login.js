import { PrismaClient } from '@prisma/client';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function login(req, res) {
    const sha_js = require('sha.js');
    let token;
    if (req.method === 'POST') {
        const username = req.body.username;
        const password = req.body.password;
        const pass_hash = sha_js('sha256').update(password).digest('hex');
        const user = await prisma.user.findMany({
            where: {
                username: username,
                password_hash: pass_hash,
            },
        });
        if (user.length === 0) {
            res.status(200).json({ success: false });
            return;
        } else {
            const user_token = await prisma.user_token.findMany({
                where: {
                    userId: user[0].id,
                },
            });
            if (
                user_token.length === 0 ||
                user_token[0].expires.valueOf() < Date.now().valueOf()
            ) {
                let expires = new Date();
                expires.setDate(expires.getDate() + 60);
                const usertoken = await prisma.user_token.create({
                    data: {
                        userId: user[0].id,
                        expires: expires,
                    },
                });
                token = usertoken.token;
            } else {
                token = user_token[0].token;
            }
            setCookie('token', token, { req, res, maxAge: 31536000 });
        }
    }
    res.status(200).json({ success: true, token: token });
}
