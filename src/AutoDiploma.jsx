import { useState } from "react"
import { Input, ButtonSubmit, InputFile, Tab } from "./Components"

function AutoDiploma(props) {
    const [isCsv, setIsCsv] = useState(false);

    function checked() {
        setIsCsv(!isCsv);
    }

    return (
        <main className={props.className + " flex flex-col"}>
            <div className={"ml-3 flex xl:justify-center flex-col xl:flex-row"}>
                {isCsv ?
                    <form action="/api/upload" className="flex flex-col items-center xl:mr-12">
                        <div className=" text-center mb-5">
                            <Tab text="Форма" className="rounded-lg xl:rounded-none xl:rounded-l-lg xl:mb-0 mb-1" onClick={() => { checked() }} selected={!isCsv} />
                            <Tab text="Csv файл" className="rounded-lg xl:rounded-none xl:rounded-r-lg max-sm:px-11" onClick={() => { checked() }} selected={isCsv} />
                        </div>
                        <div className="flex items-center flex-col mb-14 xl:mt-12 max-sm:opacity-0 max-sm:absolute max-sm:-top-72">
                            <span className="text-xl font-light">Csv файл должен быть вида (разделитель - `):</span>
                            <table className="border-solid border-2 rounded-lg border-separate border-spacing-0 border-black mt-2 ">
                                <thead className="border-solid">
                                    <tr>
                                        <th className="border-solid border-gray-400 border-r-2 py-3 px-2">Название диплома</th>
                                        <th className="border-solid border-gray-400 border-r-2 px-2">Количество дополнительных полей</th>
                                        <th className="border-solid border-gray-400 border-r-2 px-2">ФИО человека</th>
                                        <th className="px-2">Название проекта</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="flex items-center flex-col">
                            <span className="text-xl font-light">Файл: </span> <InputFile className="block mb-5 max-sm:w-[8.5rem]" />
                        </div>

                        <ButtonSubmit text="Создать" />
                    </form>
                    :
                    <form action="/api/upload" className="flex flex-col xl:items-center mr-32 max-xl:w-full">
                        <div className=" text-center mb-5">
                            <Tab text="Форма" className="rounded-lg xl:rounded-none xl:rounded-l-lg xl:mb-0 mb-1" onClick={() => { checked() }} selected={!isCsv} />
                            <Tab text="Csv файл" className="rounded-lg xl:rounded-none xl:rounded-r-lg" onClick={() => { checked() }} selected={isCsv} />
                        </div>
                        <div>
                            <span className="text-xl font-light">Шаблон: </span> <Input type="text" name="template" className="block mb-10 w-full" />
                            <span className="text-xl font-light">Количество дополнительных полей: </span> <Input type="number" name="have_project" className="block mb-10 w-full" />
                            <span className="text-xl font-light">ФИО человека: </span> <Input type="text" name="name" className="block mb-10 w-full" />
                            <span className="text-xl font-light">Название проекта: </span> <Input type="text" name="project" className="block mb-5 w-full" />
                            <ButtonSubmit text="Создать" />
                        </div>
                    </form>}
                <img src="/ex.png" alt="diploma" className="xl:w-[35%] xl:mt-0 xl:mb-0 mb-5 mt-5 rounded-md" />
            </div>
        </main>
    )
}

export { AutoDiploma }