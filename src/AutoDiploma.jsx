import { useState } from "react"
import { Input, ButtonSubmit, InputFile, Tab } from "./Components"

function AutoDiploma(props) {
    const [isCsv, setIsCsv] = useState(false);

    function checked(isChecked) {
        setIsCsv(isChecked);
    }

    return (
        <main className={props.className + " flex flex-col"}>
            <div className={"ml-3 flex justify-center"}>
                {isCsv ?
                    <form action="/api/upload" className="flex flex-col items-center mr-12">
                        <div className=" text-center mb-5">
                            <Tab text="Форма" className="rounded-l-lg" onClick={() => { checked(!isCsv) }} selected={!isCsv} />
                            <Tab text="Csv файл" className="rounded-r-lg" onClick={() => { checked(isCsv) }} selected={isCsv} />
                        </div>
                        <div className="flex items-center flex-col mb-14 mt-12">
                            <span className="text-xl font-light">Csv файл должен быть вида (разделитель - `):</span>
                            <table className="border-solid border-2 rounded-lg border-separate border-spacing-0 border-black mt-2 ">
                                <thead className="border-solid">
                                    <tr>
                                        <th className="border-solid border-gray-400 border-r-2 py-3">Название диплома</th>
                                        <th className="border-solid border-gray-400 border-r-2">Количество дополнительных полей</th>
                                        <th className="border-solid border-gray-400 border-r-2">ФИО человека</th>
                                        <th>Название проекта</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <span className="text-xl font-light">Файл: </span> <InputFile className="block mb-5" />

                        <ButtonSubmit text="Создать" />
                    </form>
                    :
                    <form action="/api/upload" className="flex flex-col items-center mr-32">
                        <div className=" text-center mb-5">
                            <Tab text="Форма" className="rounded-l-lg" onClick={() => { checked(isCsv) }} selected={!isCsv} />
                            <Tab text="Csv файл" className="rounded-r-lg" onClick={() => { checked(!isCsv) }} selected={isCsv} />
                        </div>
                        <span className="text-xl font-light">Шаблон: </span> <Input type="text" name="template" className="block mb-10 w-full" />
                        <span className="text-xl font-light">Количество дополнительных полей: </span> <Input type="number" name="have_project" className="block mb-10 w-full" />
                        <span className="text-xl font-light">ФИО человека: </span> <Input type="text" name="name" className="block mb-10 w-full" />
                        <span className="text-xl font-light">Название проекта: </span> <Input type="text" name="project" className="block mb-5 w-full" />

                        <ButtonSubmit text="Создать" />
                    </form>}
                <img src="/ex.png" alt="diploma" className="w-[35%] rounded-md" />
            </div>
        </main>
    )
}

export { AutoDiploma }