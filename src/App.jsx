import { SideBar, SideBarLink } from './Components';
import { IoMdNotifications } from 'react-icons/io';
import { Home } from './Home';
import { useState } from 'react';
import { AutoDiploma } from './AutoDiploma';

function App() {
    const [active, setActive] = useState([true, false, false, false, false]);

    function ChNav(n) {
        var tmp = [false, false, false, false, false];
        tmp[n] = true;
        setActive(tmp);
    }

    return (
        <div className="h-screen w-full">
            <nav className="fixed top-0 z-10 flex w-full items-center justify-between p-4 backdrop-blur-md">
                <h1 className="cursor-default text-xl font-bold">Silaeder Dashboard</h1>
                <div className="flex items-center">
                    <IoMdNotifications className="mr-5 cursor-pointer text-3xl transition-all duration-500 ease-in-out hover:scale-125" />
                    <img
                        className="h-11 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110"
                        src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale"
                        alt="avatar"
                    />
                </div>
            </nav>
            <div className="flex h-full w-full pt-20">
                <SideBar
                    className="fixed"
                    content={
                        <div>
                            <SideBarLink
                                text="Главная"
                                active={active[0]}
                                onClick={() => {
                                    ChNav(0);
                                }}
                            />
                            <SideBarLink
                                text="Silaeder Server"
                                className="mt-5"
                                onClick={() => {
                                    ChNav(1);
                                }}
                                active={active[1]}
                            />
                            <SideBarLink
                                text="Silaeder Conference"
                                className="mt-5"
                                onClick={() => {
                                    ChNav(2);
                                }}
                                active={active[2]}
                            />
                            <SideBarLink
                                text="Генератор дипломов"
                                className="mt-5"
                                onClick={() => {
                                    ChNav(3);
                                }}
                                active={active[3]}
                            />
                            <SideBarLink
                                text="Оценки и расписание"
                                className="mt-5"
                                onClick={() => {
                                    ChNav(4);
                                }}
                                active={active[4]}
                            />
                        </div>
                    }
                />

                {active[0] && <Home className=" absolute right-4 w-7/12 sm:w-4/5" />}

                {active[3] && (
                    <AutoDiploma className=" absolute right-4 w-7/12 sm:w-4/5" />
                )}
            </div>
        </div>
    );
}

export default App;
