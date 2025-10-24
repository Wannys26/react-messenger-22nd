import { useRef, useEffect } from 'react';
import type { Message, User } from '@/types/chat'; 
import MessageBubble from '@/components/chatroom/MessageBubble';
import DateSeparator from '@/components/chatroom/DateSeparator';
import { findUserById } from '@/utils/userUtils';
import { formatTime } from '@/utils/timeUtils';
import { shouldShowProfile, isLastInTimeGroup, getMessageMargin } from '@/utils/messageUtils';
import { getProfileImage } from '@/utils/profileUtils';

interface ChatAreaProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
  onUserNameClick?: (userId: string) => void; // 사용자 이름 클릭 핸들러 추가
}

const ChatArea = ({ messages, users, currentUserId, onUserNameClick}: ChatAreaProps) => {
  // 스크롤을 맨 아래로 이동시키기 위한 ref
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // 메시지가 추가될 때마다 스크롤을 하단으로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      ref={chatAreaRef}
      className="flex-1 overflow-y-auto px-3 py-4 bg-green-2"
    >
      <div className="w-full max-w-[351px] mx-auto">
        {messages.map((message, index) => {
          const user = findUserById(users, message.userId);
          const isMe = message.userId === currentUserId;
          const showProfile = shouldShowProfile(message, messages, index, currentUserId);
          const isLastInGroup = isLastInTimeGroup(message, messages, index);
          const marginClass = getMessageMargin(message, messages, index);
          
          return (
            <div key={message.id} className={marginClass}>
              {/* 날짜 구분선 */}
              {message.date && (
                <DateSeparator 
                  date={message.date} 
                  isFirstMessage={index === 0}
                />
              )}
              
              {/* 메시지 버블 */}
              <MessageBubble
                message={message.content}
                time={formatTime(message.timestamp)}
                isMe={isMe}
                userName={user.name}
                userProfile={getProfileImage(user.id)}
                userId={user.id}
                showProfile={showProfile}
                isLastInGroup={isLastInGroup}
                onUserNameClick={onUserNameClick}
              />
            </div>
          );
        })}
        
        {/* 스크롤 앵커 */}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;