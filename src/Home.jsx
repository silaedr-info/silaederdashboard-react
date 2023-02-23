import { Card, CardCustom, CardList, CardListItem } from "./Components"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetMatprakPlusnikData } from "./Plusnik";
import { useEffect } from "react";
import { useState } from "react";

function Home(props) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    var data = {
        labels: [
            'Средняя',
            'Максимальная'
        ],
        datasets: [{
            label: 'Оценка',
            data: [8, 10 - 8],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ]
        }],
    };

    var options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 10
                    }
                }
            }
        }
    };

    return (
        <div className={props.className + " ml-3"}>
            <div className="flex items-center flex-col sm:flex-row">
                <Card className="mr-0 mb-5 sm:mr-5 sm:mb-0" name="Сводка" img_src="task.png" desc={<span>Оценки по предметам <strong>Алгебра, Русский язык</strong> стали лучше. На следующей неделе разбор листочка <strong>Вероятность</strong>. <strong>Поторопитесь</strong>, у Вас всё еще 0 баллов!</span>} />
                <CardCustom className="text-center" name="Средняя оценка за неделю" alt="" desc={<Doughnut data={data} options={options} width="200" />} />
            </div>

            <CardList className="mt-5 mb-10" name="Новости" desc={
                <div>
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3681">В рамках уроков «Разговоры о важном» лицей НИУ ВШЭ пригласил наших 11-классниц Дашу и Наташу рассказать о своем проекте</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3680">5 и 6 классы Силаэдра посетили Царь-макет на ВДНХ Экскурсия была увлекательной. Всем очень понравилось.</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3678">Мастер-класс руководителя it-отдела компании Встреча с Игорем Котляром, руководителем IT- департамента компании BUDU "Ренессанс Страхование"</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3676">5 и 6 классы обсуждают компьютерную безопасность и цифровую гигиену.
                        В этот раз по впечатлениям Никиты и Льва после прочтения книги Кевина Митника «Искусство быть невидимым»</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3670">Еще несколько слов о Конференции Силаэдр. Статистика участников и победителей конкурса по годам.</a>} />
                </div>
            } />
        </div>
    )
}

export { Home }