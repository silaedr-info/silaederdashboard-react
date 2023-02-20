function Button(props) {
    return (
        <button onClick={props.onClick} className={props.className + ' p-3 rounded-lg text-white hover:bg-gray-800 bg-black transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-300 dark:text-black dark:hover:bg-white dark:hover:shadow-gray-700'}>{props.text}</button>
    )
}

function ButtonSimple(props) {
    return (
        <button onClick={props.onClick} className={props.className + ' p-3 rounded-lg text-white hover:bg-gray-800 bg-black transition-all duration-500 ease-in-out transform hover:shadow-2xl dark:bg-gray-300 dark:text-black dark:hover:bg-white dark:hover:shadow-gray-700'}>{props.text}</button>
    )
}

function Link(props) {
    if (props.active) {
        return (
            <button onClick={props.onClick} className={props.className + ' overline decoration-2 font-bold text-black hover:text-slate-600 dark:hover:text-slate-400 transition-all ease-in-out duration-300 transform dark:text-gray-300'}>{props.text}</button>
        )
    } else {
        return (
            <button onClick={props.onClick} className={props.className + ' text-black dark:hover:text-slate-400 hover:text-slate-600 transition-all ease-in-out duration-300 transform dark:text-gray-300'}>{props.text}</button>
        )
    }
}

function Card(props) {
    return (
        <div className={props.className + ' dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:shadow-gray-800 dark:shadow-slate-800 bg-gray-100 rounded-lg p-7 shadow-md hover:shadow-xl hover:bg-gray-200 hover:bg-opacity-70 transition-all ease-in-out duration-500 flex flex-col sm:flex-row items-center'}>
            <img width="70rem" className="rounded-lg" src={props.img_src} alt='card img' />
            <div className="sm:ml-10">
                <h1 className="text-2xl font-medium dark:text-gray-300 text-center sm:text-left">{props.name}</h1>
                <h3 className="dark:text-gray-300 text-center sm:text-left">{props.desc}</h3>
            </div>
        </div>
    )
}

function CardCustom(props) {
    return (
        <div className={props.className + ' dark:bg-gray-700 dark:hover:bg-gray-600 dark:shadow-slate-800 dark:hover:shadow-gray-800 bg-gray-100 rounded-lg p-7 shadow-md hover:shadow-xl hover:bg-gray-200 hover:bg-opacity-70 transition-all ease-in-out duration-500 flex flex-row items-center'}>
            {props.custom}
            <div className="flex items-center flex-col">
                <h1 className="text-2xl font-medium dark:text-gray-300">{props.name}</h1>
                <h3 className="dark:text-gray-300">{props.desc}</h3>
            </div>
        </div>
    )
}

function SideBar(props) {
    return (
        <div className={props.className + " w-4/12 sm:w-2/12 h-full p-3 bg-gray-200 rounded-br-3xl rounded-tr-3xl"}>
            <div>
                {props.content}
            </div>
        </div>
    )
}

function SideBarLink(props) {
    if (props.active) {
        return (
            <button onClick={props.onClick} className={props.className + " bg-black text-white pt-3 pb-3 w-full rounded-xl transition-all ease-in-out duration-700 hover:shadow-2xl hover:bg-gray-800 sblnk"}>{props.text}</button>
        )
    } else {
        return (
            <button onClick={props.onClick} className={props.className + " bg-gray-500 text-white pt-3 pb-3 w-full rounded-xl transition-all ease-in-out duration-700 hover:shadow-2xl hover:bg-gray-700 sblnk"}>{props.text}</button>
        )
    }
}

function CardList(props) {
    return (
        <div className={props.className+" dark:bg-gray-700 dark:hover:bg-gray-600 dark:shadow-slate-800 dark:hover:shadow-gray-800 bg-gray-100 rounded-lg p-7 shadow-md hover:shadow-xl hover:bg-gray-200 hover:bg-opacity-70 transition-all ease-in-out duration-500 flex flex-row items-center"}>
            <div className="flex items-center flex-col">
                <h1 className="text-2xl font-medium dark:text-gray-300 text-center">{props.name}</h1>
                <h3 className="dark:text-gray-300">{props.desc}</h3>
            </div>
        </div>
    )
}

function CardListItem(props) {
    return (
        <div className={props.className+" dark:bg-gray-500 dark:shadow-slate-600 dark:hover:shadow-gray-600 bg-gray-500 text-white rounded-lg p-3 shadow-md transition-all ease-in-out duration-500 flex flex-row items-center mt-5"}>
            <span>{props.contents}</span>
        </div>
    )
}

export { Button, Link, Card, CardCustom, ButtonSimple, SideBar, SideBarLink, CardList, CardListItem }