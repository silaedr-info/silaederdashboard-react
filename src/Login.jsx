import { ButtonSubmit, Input } from './Components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage(props) {
    const { query } = useRouter();
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    function submit() {
        setSubmitted(true);
    }
    useEffect(() => {
        if (query.status === 'success') {
            toast.success('Добро пожаловать!', {
                position: 'bottom-center',
                autoClose: 1000,
                closeOnClick: false,
                draggable: false,
                pauseOnHover: true,
                theme: 'light',
            });
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
        if (query.status === 'error') {
            toast.error('Неверный логин или пароль', {
                position: 'bottom-center',
                autoClose: 5000,
                closeOnClick: false,
                draggable: false,
                pauseOnHover: true,
                theme: 'light',
            });
        }
    }, [query]);

    return (
        <div
            className={
                props.className +
                ' absolute top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-white'
            }
        >
            <h1 className="mb-3 text-4xl font-normal">Войти: </h1>
            <form
                className="flex flex-col items-center rounded-xl bg-gray-200 py-4 px-10"
                onSubmit={submit}
                action="/api/login"
                method="POST"
            >
                <div className="mb-5 w-fit">
                    <span className="block text-center text-xl font-light">Логин: </span>
                    <Input type="text" name="username" />
                </div>
                <div className="mb-4 w-fit">
                    <span className="block text-center text-xl font-light">Пароль: </span>
                    <Input type="password" name="password" />
                </div>
                <ButtonSubmit text="Войти" disabled={submitted} />
            </form>
            <ToastContainer transition={Zoom} />
        </div>
    );
}

export { LoginPage };
