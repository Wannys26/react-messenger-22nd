import { useEffect } from 'react';

interface CallLoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallLoadingModal = ({ isOpen, onClose }: CallLoadingModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // 3초 후 자동으로 닫기
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-0 rounded-2xl p-8 flex flex-col items-center gap-4 min-w-[280px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 로딩 스피너 */}
        <div className="w-16 h-16 border-4 border-gray-3 border-t-green-3 rounded-full animate-spin"></div>
        
        {/* 텍스트 */}
        <p className="text-body2-m text-gray-7">통화 연결 중...</p>
        
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="cursor-pointer mt-2 px-6 py-2 bg-gray-3 text-gray-7 text-body3-m1 rounded-lg hover:bg-gray-4 transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default CallLoadingModal;



