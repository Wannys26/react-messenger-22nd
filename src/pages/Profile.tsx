import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/header/Header';
import type { User } from '@/types/chat';
import usersData from '@/data/users.json';
import EditIcon from '@/assets/svgs/profile/edit-icon.svg';
import MessageIcon from '@/assets/svgs/home/message-icon.svg';
import SnsIcon from '@/assets/svgs/profile/sns-icon.svg';
import { getProfileImage } from '@/utils/profileUtils';
import { useCallModalStore } from '@/store/callModalStore';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const currentUserId = "user2"; // 현재 로그인한 사용자
  const isMyProfile = userId === currentUserId;
  const { openCallModal } = useCallModalStore();

  useEffect(() => {
    const foundUser = usersData.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [userId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChatClick = () => {
    // 1:1 채팅방 찾기
    if (userId === "user1") {
      navigate("/chatroom/1");
    } else {
      alert("채팅방이 아직 생성되지 않았습니다.");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col h-full bg-green-4">
        <div className="bg-green-4">
          <Header type="profile" onBack={handleBack} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-body2-m text-white">사용자를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-green-4 relative">
      {/* 헤더 */}
      <div className="bg-green-4">
        <Header type="profile" onBack={handleBack} />
      </div>
      
      {/* 프로필 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-end px-10 pb-[94px]">
        {/* 프로필 이미지 */}
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden mb-2">
          <img
            src={getProfileImage(user.id)}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 이름 */}
        <h1 className="text-[23px] font-semibold text-white mb-1">
          {user.name}
        </h1>

        {/* 상태 메시지 */}
        <p className="text-[14px] text-white">
          {user.statusMessage || '상태 메세지를 입력해주세요.'}
        </p>

        {/* 액션 버튼 영역 */}
        <div className="flex gap-11 mt-9">
          {isMyProfile ? (
            <>
              {/* 프로필 편집 */}
              <button className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-[60px] h-[60px] rounded-[34px] bg-[#57CE82] bg-opacity-20 flex items-center justify-center">
                  <img src={EditIcon} alt="편집" className="w-7 h-7" />
                </div>
                <span className="text-caption1-m text-white">프로필 편집</span>
              </button>

              {/* 나의 메모 */}
              <button className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-[60px] h-[60px] rounded-[34px] bg-[#57CE82] bg-opacity-20 flex items-center justify-center">
                  <img src={MessageIcon} alt="메모" className="w-8 h-8 brightness-0 invert" />
                </div>
                <span className="text-caption1-m text-white">나의 메모</span>
              </button>

              {/* 나의 SNS */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-[60px] h-[60px] rounded-[34px] bg-[#57CE82] bg-opacity-20 flex items-center justify-center">
                  <img src={SnsIcon} alt="SNS" className="w-6 h-6" />
                </div>
                <span className="text-caption1-m text-white">나의 SNS</span>
              </a>
            </>
          ) : (
            <>
              {/* 프로필 편집 -> 다른 사람 프로필에서는 음성통화 */}
              <button onClick={openCallModal} className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-[60px] h-[60px] rounded-[34px] bg-[#57CE82] bg-opacity-20 flex items-center justify-center">
                  <img src={EditIcon} alt="편집" className="w-7 h-7" />
                </div>
                <span className="text-caption1-m text-white">음성 통화</span>
              </button>

              {/* 나의 메모 -> 다른 사람 프로필에서는 1:1 채팅 */}
              <button onClick={handleChatClick} className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-[60px] h-[60px] rounded-[34px] bg-[#57CE82] bg-opacity-20 flex items-center justify-center">
                  <img src={MessageIcon} alt="채팅" className="w-8 h-8 brightness-0 invert" />
                </div>
                <span className="text-caption1-m text-white">1:1 채팅</span>
              </button>

              {/* SNS */}
              <button className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-[60px] h-[60px] rounded-[34px] bg-[#57CE82] bg-opacity-20 flex items-center justify-center">
                  <img src={SnsIcon} alt="SNS" className="w-6 h-6" />
                </div>
                <span className="text-caption1-m text-white">SNS</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

