import { type ReactNode } from 'react';
import Close from '@/assets/svgs/header/profile/close.svg';
import Image from '@/assets/svgs/header/profile/image.svg';
import Setting from '@/assets/svgs/header/profile/setting.svg';

interface ProfileHeaderProps {
  onBack?: () => void;
  rightActions?: ReactNode;
}

const ProfileHeader = ({ onBack, rightActions }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between h-full px-[20px] py-[10px] bg-green-4">
      {/* 왼쪽 */}
      <div className="flex items-center">
        <button onClick={onBack} className='cursor-pointer'>
          <img src={Close} alt="닫기" className="w-[28px] h-[28px] brightness-0 invert" />
        </button>
      </div>
      
      {/* 오른쪽 */}
      <div className="flex items-center gap-[14px]">
        {rightActions || (
          <>
            <button className='cursor-pointer'>
              <img src={Image} alt="이미지" className="w-[24px] h-[24px] brightness-0 invert" />
            </button>
            <button className='cursor-pointer'>
              <img src={Setting} alt="설정" className="w-[24px] h-[24px] brightness-0 invert" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;