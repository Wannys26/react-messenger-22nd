import StatusBar from "@/components/statusbar/StatusBar";
import { Outlet } from "react-router-dom";
const Layout = () => {

    // localStorage를 지우는 함수 (임시 사용)
    const handleClearLocalStorage = () => {
        localStorage.clear();
        alert('보낸 메시지가 삭제되었습니다.');
        window.location.reload(); // 페이지를 새로고침하여 변경사항을 반영합니다.
    };


    return(
        <div className="h-full bg-[#F5F5F5] flex justify-center">
            <button
                onClick={handleClearLocalStorage}
                className="fixed top-5 right-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg z-50"
            >
                보낸 메시지 전체 삭제
            </button>

            <div className="w-[375px] h-full bg-white shadow-2xl flex flex-col">
                <StatusBar />
                {/* 나머지 공간을 모두 차지하도록 main 영역 설정 + 세로 스크롤바 숨김 처리 */}
                <main className="flex-1 flex flex-col overflow-y-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;