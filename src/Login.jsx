import { Input } from './Components'

function LoginPage(props) {
    return (
        <div className={props.className + " bg-white"}>
            <form>
                <Input text="dfsdf" />
            </form>
        </div>
    )
}

export { LoginPage }