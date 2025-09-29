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
  const { chatRooms, setChatRooms, messagesByRoom } = useChatStore();
  
  // 현재 사용자 ID (기본값으로 user2 사용)
  const currentUserId = 'user2';

  // 컴포넌트 마운트 시 사용자 데이터 및 채팅방 데이터 로드
  useEffect(() => {
    loadUsers();

    // 스토어에 채팅방 데이터가 이미 있는지 확인
    const isInitialized = chatRooms.length > 0;

    if (!isInitialized) {
      // 앱 최초 실행 시, chatRooms.json 데이터로 스토어 상태를 초기화
      const initialChatRooms = (chatRoomsData as ChatRoom[]).map(room => {
        const lastMessage = room.messages[room.messages.length - 1];
        return {
          ...room,
          lastMessage,
          lastUpdated: lastMessage ? lastMessage.timestamp : room.lastUpdated,
        };
      });
      setChatRooms(initialChatRooms);
    } else {
      // 이미 데이터가 있다면 (로컬 스토리지에서 불러온 경우),
      // messagesByRoom을 기반으로 lastMessage와 lastUpdated만 갱신
      // unreadCount와 같은 다른 상태는 그대로 유지됩니다.
      const updatedChatRooms = chatRooms.map(room => {
        const persistedMessages = messagesByRoom[room.chatId];
        
        if (persistedMessages && persistedMessages.length > 0) {
          const lastMessage = persistedMessages[persistedMessages.length - 1];
          return {
            ...room,
            lastMessage,
            lastUpdated: lastMessage.timestamp,
          };
        }
        // 업데이트할 메시지가 없으면 기존 방 정보를 그대로 반환
        return room;
      });
      setChatRooms(updatedChatRooms);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadUsers]); // messagesByRoom을 의존성 배열에서 제거 -> 한 번만 실행

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