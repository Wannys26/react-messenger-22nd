import { useState, type ReactNode } from 'react';
import ArrowDown from '@/assets/svgs/common/arrow-down.svg';
import ArrowUp from '@/assets/svgs/common/arrow-up.svg';

interface CollapsibleSectionProps {
  title: string;
  count?: number;
  children?: ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, count, children, defaultOpen = true }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-[335px] mx-auto">
      {/* 섹션 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-1">
          <span className="text-body3-m1 text-gray-6">{title}</span>
          {count !== undefined && (
            <span className="text-body3-m1 text-gray-6">{count}</span>
          )}
        </div>
        <img
          src={isOpen ? ArrowUp : ArrowDown}
          alt={isOpen ? '접기' : '펼치기'}
          className="w-5 h-5 cursor-pointer"
        />
      </button>

      {/* 섹션 내용 (+부드럽게 펼쳐지도록 애니메이션 추가) */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;


