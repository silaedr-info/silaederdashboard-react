import { ButtonSubmit, Input } from './Components'

function LoginPage(props) {
    return (
        <div className={props.className + " bg-white flex items-center justify-center flex-col absolute top-0 w-screen h-screen z-20"}>
            <h1 className='text-4xl font-normal mb-3'>Войти: </h1>
            <form className='flex flex-col items-center bg-gray-200 py-4 px-10 rounded-xl'>
                <div className='w-fit mb-5'><span className='font-light text-xl block text-center'>Логин: </span><Input /></div>
                <div className='w-fit mb-4'><span className='font-light text-xl block text-center'>Пароль: </span><Input type="password" /></div>
                <ButtonSubmit text="Войти" />
            </form>
        </div>
    )
}

export { LoginPage }