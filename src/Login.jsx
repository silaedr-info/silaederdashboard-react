import { ButtonSubmit, Input } from './Components';

function LoginPage(props) {
    return (
        <div
            className={
                props.className +
                ' absolute top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-white'
            }
        >
            <h1 className="mb-3 text-4xl font-normal">Войти: </h1>
            <form className="flex flex-col items-center rounded-xl bg-gray-200 py-4 px-10">
                <div className="mb-5 w-fit">
                    <span className="block text-center text-xl font-light">Логин: </span>
                    <Input />
                </div>
                <div className="mb-4 w-fit">
                    <span className="block text-center text-xl font-light">Пароль: </span>
                    <Input type="password" />
                </div>
                <ButtonSubmit text="Войти" />
            </form>
        </div>
    );
}

export { LoginPage };
