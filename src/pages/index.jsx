import { SideBar, SideBarLink, Spinner } from '../Components';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillHome, AiFillSchedule } from 'react-icons/ai';
import { FaServer } from 'react-icons/fa';
import { HiPresentationChartLine } from 'react-icons/hi';
import { GiDiploma } from 'react-icons/gi';
import { Home } from '../Home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AutoDiploma } from '../AutoDiploma';
import { useRouter } from 'next/router';

function App() {
    async function fetchLogin() {
        return await axios.get('/api/checkLogin');
    }
    const router = useRouter();

    const [screenSize, getDimension] = useState({
        dynamicWidth: 0,
        dynamicHeight: 0,
    });

    const setDimension = (w, h) => {
        getDimension({
            dynamicWidth: w,
            dynamicHeight: h,
        });
    };

    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        setDimension(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', () => {
            setDimension(window.innerWidth, window.innerHeight);
        });

        Promise.all([fetchLogin()]).then((res) => {
            if (!res[0].data.success) {
                router.push('/login');
            } else {
                var target = document.getElementById('first-time');

                setTimeout(() => {
                    target.classList.add('opacity-0', '-z-30');
                    target.classList.remove('z-30');
                    setDeleted(true);
                }, 1000);
            }
        });

        return () => {
            window.removeEventListener('resize', () => {
                setDimension(window.innerWidth, window.innerHeight);
            });
        };
    }, []);
    const [active, setActive] = useState([true, false, false, false, false]);

    function ChNav(n) {
        var tmp = [false, false, false, false, false];
        tmp[n] = true;
        setActive(tmp);
    }

    return (
        <main className="h-screen w-screen">
            <div
                id="first-time"
                className="absolute z-30 flex h-full w-full flex-col items-center justify-center text-center backdrop-blur-2xl transition-all duration-1000 ease-in-out"
            >
                <h1 className="text-5xl font-light dark:text-white">Добро пожаловать</h1>
                <Spinner className="mt-5 h-10 w-10 border-4 border-t-black dark:border-t-white" />
            </div>

            <nav className="fixed top-0 z-10 flex w-full items-center justify-between p-4 backdrop-blur-md">
                <h1 className="cursor-default text-xl font-bold dark:text-white">
                    Silaeder Dashboard
                </h1>
                <div className="flex items-center">
                    <IoMdNotifications className="mr-5 cursor-pointer text-3xl transition-all duration-500 ease-in-out hover:scale-125 dark:text-white" />
                    <img
                        className="h-11 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110"
                        src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale"
                        alt="avatar"
                    />
                </div>
            </nav>
            <div className="flex h-full w-full pt-20">
                <SideBar
                    className="fixed max-sm:bottom-0 max-sm:z-20"
                    content={
                        <div className="max-sm:flex">
                            <SideBarLink
                                text={
                                    screenSize.dynamicWidth >= 640 ? (
                                        'Главная'
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <AiFillHome className="text-2xl" />
                                        </div>
                                    )
                                }
                                active={active[0]}
                                onClick={() => {
                                    ChNav(0);
                                }}
                            />
                            <SideBarLink
                                text={
                                    screenSize.dynamicWidth >= 640 ? (
                                        'Silaeder Server'
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <FaServer className="text-2xl" />
                                        </div>
                                    )
                                }
                                className="max-sm:ml-2 sm:mt-5"
                                onClick={() => {
                                    ChNav(1);
                                }}
                                active={active[1]}
                            />
                            <SideBarLink
                                text={
                                    screenSize.dynamicWidth >= 640 ? (
                                        'Silaeder Conference'
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <HiPresentationChartLine className="text-2xl" />
                                        </div>
                                    )
                                }
                                className="max-sm:ml-2 sm:mt-5"
                                onClick={() => {
                                    ChNav(2);
                                }}
                                active={active[2]}
                            />
                            <SideBarLink
                                text={
                                    screenSize.dynamicWidth >= 640 ? (
                                        'Генератор дипломов'
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <GiDiploma className="text-2xl" />
                                        </div>
                                    )
                                }
                                className="max-sm:ml-2 sm:mt-5"
                                onClick={() => {
                                    ChNav(3);
                                }}
                                active={active[3]}
                            />
                            <SideBarLink
                                text={
                                    screenSize.dynamicWidth >= 640 ? (
                                        'Оценки и расписание'
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <AiFillSchedule className="text-2xl" />
                                        </div>
                                    )
                                }
                                className="max-sm:ml-2 sm:mt-5"
                                onClick={() => {
                                    ChNav(4);
                                }}
                                active={active[4]}
                            />
                        </div>
                    }
                />

                {active[0] && (
                    <Home
                        id="home"
                        className={
                            deleted
                                ? 'sm:absolute sm:right-4 sm:w-4/5'
                                : 'max-sm:fixed sm:absolute sm:right-4 sm:w-4/5'
                        }
                    />
                )}

                {active[3] && <AutoDiploma className="sm:absolute sm:right-4 sm:w-4/5" />}
            </div>
        </main>
    );
}

export default App;
