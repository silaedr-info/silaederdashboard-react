import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from './Components';

function LoginPage(props) {
    const { query } = useRouter();
    const [submitted, setSubmitted] = useState(false);
    function submit() {
        setSubmitted(true);
    }
    useEffect(() => {
        if (query.status === 'error') {
            toast.error('Неверный логин или пароль', {
                position: 'bottom-center',
                autoClose: 5000,
                closeOnClick: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'light',
            });
        }
    }, [query]);

    return (
        <div
            className={
                props.className +
                ' absolute top-0 z-20 flex h-screen w-screen flex-col items-center justify-center'
            }
        >
            <h1 className="mb-3 text-4xl font-normal dark:text-white">Войти: </h1>
            <form
                className="flex flex-col items-center rounded-xl bg-gray-200 px-10 py-4 dark:bg-gray-700"
                onSubmit={submit}
                action="/api/login"
                method="POST"
            >
                <div className="mb-5 w-fit">
                    <span className="block text-center text-xl font-light dark:text-white">
                        Логин:{' '}
                    </span>
                    <input className="input" type="text" name="username" />
                </div>
                <div className="mb-4 w-fit">
                    <span className="block text-center text-xl font-light dark:text-white">
                        Пароль:{' '}
                    </span>
                    <input className="input" type="password" name="password" />
                </div>
                <button className="button" disabled={submitted}>
                    {submitted ? (
                        <div className="flex items-center">
                            <Spinner className="mr-2 h-5 w-5 border-2 border-t-white dark:border-t-black" />
                            <span>Подождите, пожалуйста...</span>
                        </div>
                    ) : (
                        <span>Войти</span>
                    )}
                </button>
            </form>
            <ToastContainer transition={Zoom} />
        </div>
    );
}

export { LoginPage };
