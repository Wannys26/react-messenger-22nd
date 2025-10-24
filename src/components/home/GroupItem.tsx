import { Link } from 'react-router-dom';
import type { User } from '@/types/chat';
import { getProfileImage } from '@/utils/profileUtils';

interface GroupItemProps {
  chatRoomId: string;
  groupName: string;
  participants: User[];
  totalCount: number;
}

const GroupItem = ({ chatRoomId, groupName, participants, totalCount }: GroupItemProps) => {
  // 최대 4명의 프로필만 표시
  const displayProfiles = participants.slice(0, 4);

  return (
    <Link to={`/chatroom/${chatRoomId}`} className="flex items-center gap-3">
      {/* 그룹 프로필 (2x2 그리드) */}
      <div className="flex flex-wrap gap-[2px] w-12 h-12">
        {displayProfiles.map((user) => (
          <div
            key={user.id}
            className="w-[22px] h-[22px] rounded-full overflow-hidden bg-green-1 flex items-center justify-center"
          >
            <img
              src={getProfileImage(user.id)}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 그룹 정보 */}
      <div className="flex items-center gap-[5px]">
        <span className="text-body2-m text-gray-7">{groupName}</span>
        <span className="text-body2-m text-gray-5">{totalCount}</span>
      </div>
    </Link>
  );
};

export default GroupItem;

