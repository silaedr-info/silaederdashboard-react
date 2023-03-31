import { useState } from 'react';
import { Tab } from './Components';

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
                            <span className="text-xl font-light dark:text-white">
                                Csv файл должен быть вида (разделитель - `):
                            </span>
                            <table className="mt-2 border-separate border-spacing-0 rounded-lg border-2 border-solid border-black dark:border-white">
                                <thead className="border-solid">
                                    <tr>
                                        <th className="border-r-2 border-solid border-gray-400 px-2 py-3 dark:text-white">
                                            Название диплома
                                        </th>
                                        <th className="border-r-2 border-solid border-gray-400 px-2 dark:text-white">
                                            Количество дополнительных полей
                                        </th>
                                        <th className="border-r-2 border-solid border-gray-400 px-2 dark:text-white">
                                            ФИО человека
                                        </th>
                                        <th className="px-2 dark:text-white">
                                            Название проекта
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-light dark:text-white">
                                Файл:{' '}
                            </span>{' '}
                            <input
                                type="file"
                                className="inputFile mb-5 block max-sm:w-[8.5rem]"
                            />
                        </div>

                        <button type="submit" className="button">
                            Создать
                        </button>
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
                            <span className="text-xl font-light dark:text-white">
                                Шаблон:{' '}
                            </span>{' '}
                            <input
                                type="text"
                                name="template"
                                className="input mb-10 block w-full"
                            />
                            <span className="text-xl font-light dark:text-white">
                                Количество дополнительных полей:{' '}
                            </span>{' '}
                            <input
                                type="number"
                                name="have_project"
                                className="input mb-10 block w-full"
                            />
                            <span className="text-xl font-light dark:text-white">
                                ФИО человека:{' '}
                            </span>{' '}
                            <input
                                type="text"
                                name="name"
                                className="input mb-10 block w-full"
                            />
                            <span className="text-xl font-light dark:text-white">
                                Название проекта:{' '}
                            </span>{' '}
                            <input
                                type="text"
                                name="project"
                                className="input mb-5 block w-full"
                            />
                            <button className="button">Создать</button>
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
