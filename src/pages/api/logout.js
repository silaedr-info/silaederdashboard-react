import { deleteCookie } from 'cookies-next';

export default function logout(req, res) {
    if (req.method === 'POST') {
        deleteCookie('token', { req, res });
        res.status(200).redirect('/login');
    }
}
