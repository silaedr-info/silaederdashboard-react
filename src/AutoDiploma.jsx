import { useState } from 'react';
import { Input, ButtonSubmit, InputFile, Tab } from './Components';

function AutoDiploma(props) {
    const [isCsv, setIsCsv] = useState(false);

    function checked() {
        setIsCsv(!isCsv);
    }

    return (
        <main className={props.className + ' flex flex-col'}>
            <div className={'ml-3 flex flex-col xl:flex-row xl:justify-center'}>
                {isCsv ? (
                    <form
                        action="/api/upload"
                        className="flex flex-col items-center xl:mr-12"
                    >
                        <div className=" mb-5 text-center">
                            <Tab
                                text="Форма"
                                className="mb-1 rounded-lg xl:mb-0 xl:rounded-none xl:rounded-l-lg"
                                onClick={checked}
                                selected={!isCsv}
                            />
                            <Tab
                                text="Csv файл"
                                className="rounded-lg max-sm:px-11 xl:rounded-none xl:rounded-r-lg"
                                onClick={checked}
                                selected={isCsv}
                            />
                        </div>
                        <div className="mb-14 flex flex-col items-center max-sm:absolute max-sm:-top-72 max-sm:opacity-0 xl:mt-12">
                            <span className="text-xl font-light">
                                Csv файл должен быть вида (разделитель - `):
                            </span>
                            <table className="mt-2 border-separate border-spacing-0 rounded-lg border-2 border-solid border-black ">
                                <thead className="border-solid">
                                    <tr>
                                        <th className="border-r-2 border-solid border-gray-400 py-3 px-2">
                                            Название диплома
                                        </th>
                                        <th className="border-r-2 border-solid border-gray-400 px-2">
                                            Количество дополнительных полей
                                        </th>
                                        <th className="border-r-2 border-solid border-gray-400 px-2">
                                            ФИО человека
                                        </th>
                                        <th className="px-2">Название проекта</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-light">Файл: </span>{' '}
                            <InputFile className="mb-5 block max-sm:w-[8.5rem]" />
                        </div>

                        <ButtonSubmit text="Создать" />
                    </form>
                ) : (
                    <form
                        action="/api/upload"
                        className="mr-32 flex flex-col max-xl:w-full xl:items-center"
                    >
                        <div className=" mb-5 text-center">
                            <Tab
                                text="Форма"
                                className="mb-1 rounded-lg xl:mb-0 xl:rounded-none xl:rounded-l-lg"
                                onClick={checked}
                                selected={!isCsv}
                            />
                            <Tab
                                text="Csv файл"
                                className="rounded-lg xl:rounded-none xl:rounded-r-lg"
                                onClick={checked}
                                selected={isCsv}
                            />
                        </div>
                        <div>
                            <span className="text-xl font-light">Шаблон: </span>{' '}
                            <Input
                                type="text"
                                name="template"
                                className="mb-10 block w-full"
                            />
                            <span className="text-xl font-light">
                                Количество дополнительных полей:{' '}
                            </span>{' '}
                            <Input
                                type="number"
                                name="have_project"
                                className="mb-10 block w-full"
                            />
                            <span className="text-xl font-light">ФИО человека: </span>{' '}
                            <Input
                                type="text"
                                name="name"
                                className="mb-10 block w-full"
                            />
                            <span className="text-xl font-light">Название проекта: </span>{' '}
                            <Input
                                type="text"
                                name="project"
                                className="mb-5 block w-full"
                            />
                            <ButtonSubmit text="Создать" />
                        </div>
                    </form>
                )}
                <img
                    src="/ex.png"
                    alt="diploma"
                    className="my-5 rounded-md xl:my-0 xl:w-[35%]"
                />
            </div>
        </main>
    );
}

export { AutoDiploma };
