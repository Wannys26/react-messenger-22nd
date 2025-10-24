import { useState } from "react";
import { useLocation } from "react-router-dom";
import StatusBar from "@/components/statusbar/StatusBar";
import Navbar from "@/components/layout/Navbar";
import CallLoadingModal from "@/components/common/CallLoadingModal";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const location = useLocation();

    // Navbar를 표시하지 않을 경로들 (프로필 페이지, 채팅방)
    const hideNavbar = location.pathname.startsWith('/profile') || location.pathname.startsWith('/chatroom');

    // localStorage를 지우는 함수 (임시 사용)
    const handleClearLocalStorage = () => {
        localStorage.clear();
        alert('보낸 메시지가 삭제되었습니다.');
        window.location.reload(); // 페이지를 새로고침하여 변경사항을 반영합니다.
    };

    const handleCallClick = () => {
        setIsCallModalOpen(true);
    };

    const handleCloseCallModal = () => {
        setIsCallModalOpen(false);
    };

    return(
        <div className="h-full bg-[#F5F5F5] flex justify-center">
            <button
                onClick={handleClearLocalStorage}
                className="fixed top-5 right-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg z-50"
            >
                보낸 메시지 전체 삭제
            </button>

            <div className="w-[375px] h-full bg-white shadow-2xl flex flex-col relative">
                <StatusBar />
                {/* 나머지 공간을 모두 차지하도록 main 영역 설정 + 세로 스크롤바 숨김 처리 */}
                <main className="flex-1 flex flex-col overflow-y-hidden relative">
                    <Outlet />
                    {/* 통화 로딩 모달 */}
                    <CallLoadingModal 
                        isOpen={isCallModalOpen} 
                        onClose={handleCloseCallModal} 
                    />
                </main>
                {/* Navbar - 프로필 페이지 제외 */}
                {!hideNavbar && <Navbar onCallClick={handleCallClick} />}
            </div>

            
        </div>
    )
}

export default Layout;