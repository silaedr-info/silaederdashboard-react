import { Button } from './Components'
import { IoMdNotifications } from 'react-icons/io'

function App() {
    return (
        <div>
            <nav className='w-screen flex justify-between p-5'>
                <h1 className='font-bold text-xl cursor-pointer transition-all ease-in-out duration-500 hover:scale-110'>Silaeder Dashboard</h1>
                <div className='flex items-center'>
                    <IoMdNotifications className='text-3xl mr-5 cursor-pointer transition-all ease-in-out duration-500 hover:scale-125' />
                    <img className="h-11 transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer" src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale' alt="avatar" />
                </div>
            </nav>
        </div>
    )
}

export default App;