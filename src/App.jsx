import { SideBar, SideBarLink } from './Components'
import { IoMdNotifications } from 'react-icons/io'
import { Home } from './Home';
import { useState } from 'react';
import { AutoDiploma } from './AutoDiploma';

function App() {
    const [active, setActive] = useState([true, false, false, false, false]);

    function ChNav(n) {
        var tmp = [false, false, false, false, false]
        tmp[n] = true;
        setActive(tmp);
    }

    return (
        <div className='w-full h-screen'>
            <nav className='flex w-full justify-between p-4 fixed top-0 items-center z-10 backdrop-blur-md'>
                <h1 className='font-bold text-xl cursor-default'>Silaeder Dashboard</h1>
                <div className='flex items-center'>
                    <IoMdNotifications className='text-3xl mr-5 cursor-pointer transition-all ease-in-out duration-500 hover:scale-125' />
                    <img className="h-11 transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer" src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale' alt="avatar" />
                </div>
            </nav>
            <div className="pt-20 h-full flex w-full">
                <SideBar className="fixed" content={
                    <div>
                        <SideBarLink text="Главная" active={active[0]} onClick={() => { ChNav(0) }} />
                        <SideBarLink text="Silaeder Server" className="mt-5" onClick={() => { ChNav(1) }} active={active[1]} />
                        <SideBarLink text="Silaeder Conference" className="mt-5" onClick={() => { ChNav(2) }} active={active[2]} />
                        <SideBarLink text="Генератор дипломов" className="mt-5" onClick={() => { ChNav(3) }} active={active[3]} />
                        <SideBarLink text="Оценки и расписание" className="mt-5" onClick={() => { ChNav(4) }} active={active[4]} />
                    </div>
                } />

                {active[0] &&
                    <Home className=" w-7/12 sm:w-4/5 absolute right-4" />
                }

                {active[3] &&
                    <AutoDiploma className=" w-7/12 sm:w-4/5 absolute right-4" />
                }
            </div>
        </div>
    )
}

export default App;