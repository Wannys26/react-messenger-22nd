import { Link } from 'react-router-dom';
import MessageIcon from '@/assets/svgs/home/message-icon.svg';
import { getProfileImage } from '@/utils/profileUtils';

interface MyProfileCardProps {
  name: string;
  userId: string;
}

const MyProfileCard = ({ name, userId }: MyProfileCardProps) => {
  return (
    <div className="flex items-center justify-between w-[335px] mx-auto py-4">
      {/* 프로필 영역 */}
      <Link to={`/profile/${userId}`} className="flex items-center gap-3">
        <div className="w-[52px] h-[52px] rounded-full bg-gray-1 border border-gray-3 flex items-center justify-center overflow-hidden">
          <img
            src={getProfileImage(userId)}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-body1 text-gray-7">{name}</span>
      </Link>

      {/* 나의 메모 버튼 */}
      <button className="flex items-center justify-center gap-1 px-[14px] py-2 border border-gray-4 rounded-[20px] cursor-pointer">
        <span className="text-caption2 text-gray-7">나의 메모</span>
        <img src={MessageIcon} alt="메모" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MyProfileCard;

