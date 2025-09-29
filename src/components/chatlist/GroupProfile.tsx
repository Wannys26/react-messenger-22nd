import type { User } from '@/types/chat';
import { findUserById } from '@/utils/userUtils';
import DefaultProfile from '@/assets/svgs/chatroom/default-profile.svg';

interface GroupProfileProps {
  participants: string[];
  users: User[];
  currentUserId: string;
}

const GroupProfile = ({ participants, users, currentUserId }: GroupProfileProps) => {
  // 현재 사용자를 제외한 다른 참여자 목록 가져오기
  const otherParticipants = participants
    .filter(id => id !== currentUserId)
    .map(id => findUserById(users, id));

  // 프로필에 표시할 최대 4명의 사용자를 선택
  const profileUsers = otherParticipants.slice(0, 4);

  // 4개 미만일 경우, 기본 프로필 이미지로 채워 2x2 그리드를 유지
  const displayUsers: User[] = [];
  for (let i = 0; i < 4; i++) {
    if (profileUsers[i]) {
      displayUsers.push(profileUsers[i]);
    } else {
      displayUsers.push({ id: `placeholder-${i}`, name: 'placeholder', profile: DefaultProfile });
    }
  }

  return (
    <div className="w-12 h-12 grid grid-cols-2 grid-rows-2 gap-[2px] overflow-hidden">
      {displayUsers.map((user) => (
        <img
          key={user.id}
          src={user.profile}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      ))}
    </div>
  );
};

export default GroupProfile;