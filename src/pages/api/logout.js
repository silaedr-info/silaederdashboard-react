import { deleteCookie } from 'cookies-next';

export default function logout(req, res) {
    if (req.method === 'GET') {
        deleteCookie('token', { req, res });
        res.status(307).redirect('/login');
    }
}
