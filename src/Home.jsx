import { Card, CardCustom } from './Components';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { News } from './VkNews';

function Home(props) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    var data = {
        labels: ['Средняя', 'Максимальная'],
        datasets: [
            {
                label: 'Оценка',
                data: [8, 10 - 8],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            },
        ],
    };

    var options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    return (
        <div className={props.className + ' ml-3'}>
            <div className="flex flex-col items-center sm:flex-row">
                <Card
                    className="mr-0 mb-5 sm:mr-5 sm:mb-0"
                    name="Сводка"
                    img_src="/task.png"
                    desc={
                        <span>
                            Оценки по предметам <strong>Алгебра, Русский язык</strong>{' '}
                            стали лучше. На следующей неделе разбор листочка{' '}
                            <strong>Вероятность</strong>. <strong>Поторопитесь</strong>, у
                            Вас всё еще 0 баллов!
                        </span>
                    }
                />
                <CardCustom
                    className="text-center"
                    name="Средняя оценка за неделю"
                    desc={<Doughnut data={data} options={options} width="200" />}
                />
            </div>

            <News />
        </div>
    );
}

export { Home };
