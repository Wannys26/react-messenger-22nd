import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Battery from '@/assets/svgs/statusbar/battery.svg';
import Signal from '@/assets/svgs/statusbar/mobile-signal.svg';
import Wifi from '@/assets/svgs/statusbar/wifi.svg'; 

const StatusBar = () => {
    const location = useLocation();
    const [time, setTime] = useState('');
    
    // Profile 페이지인지 확인
    const isProfilePage = location.pathname.startsWith('/profile');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}`);
        }

        updateTime(); // 컴포넌트가 마운트될 때 즉시 시간 설정
        const interval = setInterval(updateTime, 60000); // 매 분마다 시간 업데이트

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
    },[])

    return (
        <div className={`w-full h-[47px] flex justify-between items-center pt-[14px] pr-[28.6px] pb-[12px] pl-[30px] ${isProfilePage ? 'bg-green-4' : 'bg-white'}`}>
            {/* 시간 */}
            <div className='mt-[1px]'>
                <span className={`text-base font-semibold ${isProfilePage ? 'text-gray-0' : 'text-gray-7'}`}>{time}</span>    
            </div>
            {/* 우측 아이콘들 */}
            <div className='gap-[7px] flex justify-center items-center'>
                <img src={Signal} alt="mobile signal" className={isProfilePage ? 'brightness-0 invert' : ''} />
                <img src={Wifi} alt="wifi" className={isProfilePage ? 'brightness-0 invert' : ''} />
                <img src={Battery} alt="battery" className={isProfilePage ? 'brightness-0 invert' : ''} />
            </div>
        </div>
    )
}

export default StatusBar;