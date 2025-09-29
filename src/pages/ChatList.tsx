import { useEffect } from 'react';
import ChatListItem from "@/components/chatlist/ChatListItem";
import { useUserStore } from '@/store/userStore';
import { useChatStore } from '@/store/chatStore';
import type { ChatRoom } from '@/types/chatlist';

import chatRoomsData from '@/data/chatRooms.json';
import Navbar from "@/components/layout/Navbar";
import ChatlistHeader from "@/components/header/ChatlistHeader";
import Searchbar from "@/components/chatlist/Searchbar";

const ChatList = () => {

  const { users, loadUsers } = useUserStore();
  const { chatRooms, setChatRooms } = useChatStore();
  
  // 현재 사용자 ID (기본값으로 user2 사용)
  const currentUserId = 'user2';

  // 컴포넌트 마운트 시 사용자 데이터 및 채팅방 데이터 로드
  useEffect(() => {
    loadUsers();
    // 스토어의 chatRooms가 빈 상태 -> chatRooms.json에서 초기 데이터를 로드
    if (chatRooms.length === 0) {
      const initialChatRooms = (chatRoomsData as ChatRoom[]).map(room => {
        const lastMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1] : undefined;
        return {
          ...room,
          lastMessage,
          lastUpdated: lastMessage ? lastMessage.timestamp : room.lastUpdated,
        };
      });
      setChatRooms(initialChatRooms);
    }
  }, [loadUsers, chatRooms, setChatRooms]);

  // 스토어의 chatRooms 사용 -> 마지막 업데이트 시간 순으로 정렬
  const sortedChatRooms = [...chatRooms].sort((a, b) => {
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });

  return (
    <div className="flex flex-col h-full bg-gray-0">
      <ChatlistHeader />
      <Searchbar />
      <div className="flex-1 overflow-y-auto">
        {sortedChatRooms.length > 0 ? (
          <div className="pb-4">
            {sortedChatRooms.map((chatRoom) => (
              <ChatListItem
                key={chatRoom.chatId}
                chatRoom={chatRoom}
                users={users}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-body2-m text-gray-5">아직 채팅방이 없습니다</span>
            <span className="text-body3-r text-gray-4 mt-1">새로운 대화를 시작해보세요</span>
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
};

export default ChatList;