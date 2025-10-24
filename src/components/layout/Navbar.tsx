import { useNavigate, useLocation } from 'react-router-dom';
import Home from '@/assets/svgs/navbar/home.svg';
import HomeFill from '@/assets/svgs/navbar/home-fill.svg';
import Chat from '@/assets/svgs/navbar/chat.svg';
import ChatFill from '@/assets/svgs/navbar/chat-fill.svg';
import Call from '@/assets/svgs/navbar/call.svg';

interface NavbarProps {
  onCallClick?: () => void;
}

const Navbar = ({ onCallClick }: NavbarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/home';
    const isChat = location.pathname === '/' || location.pathname.startsWith('/chatroom');

    const handleHomeClick = () => {
        navigate('/home');
    };

    const handleChatClick = () => {
        navigate('/');
    };

    const handleCallClick = () => {
        if (onCallClick) {
            onCallClick();
        }
    };

    return (
        <div className="w-full h-[73px] px-[25px] py-4 bg-gray-0 flex justify-center items-center border-t border-gray-3">
            <div 
                className='flex flex-col flex-1 justify-center items-center gap-1 align-stretch cursor-pointer'
                onClick={handleHomeClick}
            >
                <img src={isHome ? HomeFill : Home} alt='home' />
                <div className={`text-body3-m1 ${isHome ? 'text-gray-7' : 'text-gray-6'}`}>홈</div>
            </div>
            <div 
                className='flex flex-col flex-1 justify-center items-center gap-1 align-stretch cursor-pointer'
                onClick={handleChatClick}
            >
                <img src={isChat ? ChatFill : Chat} alt='chat' />
                <div className={`text-body3-m1 ${isChat ? 'text-gray-7' : 'text-gray-6'}`}>채팅</div>
            </div>
            <div 
                className='flex flex-col flex-1 justify-center items-center gap-1 align-stretch cursor-pointer'
                onClick={handleCallClick}
            >
                <img src={Call} alt='call' />
                <div className='text-body3-m1 text-gray-6'>통화</div>
            </div>
        </div>
    );
}

export default Navbar;