import { Card, CardCustom } from './Components';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import { News } from './VkNews';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Home(props) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [data, setData] = useState({ labels: [1, 2, 3, 4], datasets: [] });

    async function fetchData() {
        return await axios.get('/api/whoami');
    }
    async function fetchMarks() {
        return await axios.get('/api/getMarks');
    }
    useEffect(() => {
        Promise.all([fetchData(), fetchMarks()]).then((res) => {
            setName(res[0].data.firstname + ' ' + res[0].data.lastname);
            let matprak = res[1].data.matprak;
            let x = matprak[matprak.length - 1] - matprak[matprak.length - 2];
            let summary = '';
            if (x > 0) {
                summary +=
                    'Средняя оценка по матпраку улучшилась на ' +
                    x +
                    ' баллов, теперь оценка ' +
                    matprak[matprak.length - 1] +
                    '. Так держать!';
            }
            if (summary === '') {
                summary = 'Новостей для вас нет!';
            }
            let xi = [];
            for (let i = 0; i < matprak.length; i++) {
                xi.push(i.toString());
            }
            setSummary(summary);
            setData({
                labels: xi,
                datasets: [
                    {
                        label: 'matprak',
                        data: matprak,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.4,
                    },
                ],
            });
        });
    }, []);

    return (
        <div className={props.className + ' ml-3'}>
            <div className="flex flex-col items-center sm:flex-row">
                <Card
                    className="mb-5 mr-0 sm:mb-0 sm:mr-5"
                    name={'Добро пожаловать, ' + name}
                    img_src="/task.png"
                    desc={<span>{summary}</span>}
                />
                <CardCustom
                    className="mt-5 h-1/2 text-center"
                    name={'График оценок по матпраку'}
                    desc={
                        <Line
                            data={data}
                            width="200"
                            options={{
                                scales: {
                                    x: {
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                            }}
                        />
                    }
                />
            </div>

            <News />
        </div>
    );
}

export { Home };
