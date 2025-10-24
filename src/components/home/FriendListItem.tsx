import { Link } from 'react-router-dom';
import type { User } from '@/types/chat';
import { getProfileImage } from '@/utils/profileUtils';

interface FriendListItemProps {
  user: User;
}

const FriendListItem = ({ user }: FriendListItemProps) => {
  return (
    <Link to={`/profile/${user.id}`}>
      <div className="flex items-center hover:bg-gray-1 cursor-pointer">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0 mr-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={getProfileImage(user.id)}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 친구 정보 */}
        <div className="flex-1 min-w-0">
          {/* 이름 */}
          <div className="text-body2-sb text-gray-7 truncate mb-1">
            {user.name}
          </div>
          
          {/* 상태 메시지 */}
          {user.statusMessage && (
            <div className="text-body3-r text-gray-6 truncate">
              {user.statusMessage}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FriendListItem;


