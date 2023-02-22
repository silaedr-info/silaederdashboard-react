import { useState } from "react"
import { Input, ButtonSubmit } from "./Components"

function AutoDiploma(props) {
    const [isCsv, setIsCsv] = useState(false)

    return (
        <div className={props.className + " ml-3"}>
            <form action="/api/upload" className="flex flex-col items-center">
                <span className="text-xl font-light">Шаблон: </span> <Input type="text" name="template" className="block mb-5" />
                <span className="text-xl font-light">Количество дополнительных полей: </span> <Input type="number" name="have_project" className="block mb-5" />
                <span className="text-xl font-light">ФИО человека: </span> <Input type="text" name="name" className="block mb-5" />
                <span className="text-xl font-light">Название проекта: </span> <Input type="text" name="project" className="block mb-5" />

                <span className="text-xl font-light">Файл: </span> <Input type="file" className="block mb-5" />

                <ButtonSubmit text="Создать" />
            </form>
        </div>
    )
}

export { AutoDiploma }