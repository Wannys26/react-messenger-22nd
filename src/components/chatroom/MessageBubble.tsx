import DefaultProfile from '@/assets/svgs/chatroom/default-profile.svg';

interface MessageBubbleProps {
  message: string;
  time: string;
  isMe: boolean;
  userName?: string;
  userProfile?: string;
  userId?: string; // 사용자 ID 추가
  showProfile?: boolean;
  isLastInGroup?: boolean; // 같은 시간 그룹의 마지막 메시지인지
  onUserNameClick?: (userId: string) => void; // 사용자 이름 클릭 핸들러 추가
}

const MessageBubble = ({
  message,
  time,
  isMe,
  userName = "마밍",
  userProfile = DefaultProfile,
  userId = "",
  showProfile = true,
  isLastInGroup = true,
  onUserNameClick
}: MessageBubbleProps) => {
  
  // 사용자 이름 클릭 핸들러
  const handleUserNameClick = () => {
    if (onUserNameClick && userId && !isMe) {
      onUserNameClick(userId);
    }
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      {/* 상대방 메시지일 때 프로필 */}
      {!isMe && showProfile && (
        <div className="flex flex-col items-center mr-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={userProfile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* 상대방 메시지에서 프로필이 없을 때 공간 확보 */}
      {!isMe && !showProfile && (
        <div className="w-8 mr-2 flex-shrink-0"></div>
      )}

      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
        {/* 상대방 이름 */}
        {!isMe && showProfile && (
          <button
            onClick={handleUserNameClick}
            className={`text-body3-m2  mb-[4px] ml-1 tracking-[-0.12px] text-left ${
              onUserNameClick ? 'hover:text-green-4 cursor-pointer' : ''
            }`}
          >
            {userName}
          </button>
        )}
        
        <div className={`flex items-end gap-[6px] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* 메시지 버블 */}
          <div
            className={`px-3 pt-[7px] pb-[6px] break-all flex items-center ${
              isMe
                ? 'bg-white text-gray-7'
                : 'bg-white text-gray-7'
            }`}
            style={{
              maxWidth: '224px', // padding 제외한 최대 너비
              borderRadius: isMe 
                ? '8px 0 8px 8px'  // 내가 보낸 메시지
                : '0 8px 8px 8px'   // 남이 보낸 메시지
            }}
          >
            <span className="text-body3-m2">
              {message}
            </span>
          </div>
          
          {/* 시간 (같은 시간 그룹의 마지막 메시지에만 표시) */}
          {isLastInGroup && (
            <span className="text-caption3-r text-green-5 whitespace-nowrap">
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;