import { useEffect } from 'react';
import ChatListItem from "@/components/chatlist/ChatListItem";
import { useUserStore } from '@/store/userStore';
import { useChatStore } from '@/store/chatStore';
import type { ChatRoom } from '@/types/chatlist';

import chatRoomsData from '@/data/chatRooms.json';
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

    // chatRooms.json의 모든 채팅방을 맵으로 변환
    const jsonChatRoomsMap = new Map(
      (chatRoomsData as ChatRoom[]).map(room => [room.chatId, room])
    );

    // 기존 스토어의 채팅방을 맵으로 변환
    const existingChatRoomsMap = new Map(
      chatRooms.map(room => [room.chatId, room])
    );

    // JSON 파일의 모든 채팅방을 기준으로 병합
    const mergedChatRooms = Array.from(jsonChatRoomsMap.values()).map(jsonRoom => {
      const existingRoom = existingChatRoomsMap.get(jsonRoom.chatId);
      const persistedMessages = messagesByRoom[jsonRoom.chatId];

      // 이미 스토어에 있는 채팅방이고 사용자가 보낸 메시지가 있는 경우
      if (existingRoom && persistedMessages && persistedMessages.length > 0) {
        const lastMessage = persistedMessages[persistedMessages.length - 1];
        return {
          ...existingRoom,
          lastMessage,
          lastUpdated: lastMessage.timestamp,
        };
      }
      
      // 새로운 채팅방이거나 메시지가 없는 경우 JSON 데이터 사용
      const lastMessage = jsonRoom.messages[jsonRoom.messages.length - 1];
      return {
        ...jsonRoom,
        lastMessage,
        lastUpdated: lastMessage ? lastMessage.timestamp : jsonRoom.lastUpdated,
      };
    });

    setChatRooms(mergedChatRooms);

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
    </div>
  );
};

export default ChatList;