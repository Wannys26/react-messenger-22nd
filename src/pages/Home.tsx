import Header from "@/components/header/Header";
import MyProfileCard from "@/components/home/MyProfileCard";
import CollapsibleSection from "@/components/home/CollapsibleSection";
import LineServiceItem from "@/components/home/LineServiceItem";
import LineOfficialAccount from "@/components/home/LineOfficialAccount";
import GroupItem from "@/components/home/GroupItem";
import CreateGroupButton from "@/components/home/CreateGroupButton";
import FriendListItem from "@/components/home/FriendListItem";
import { useEffect, useState } from "react";
import type { User } from "@/types/chat";
import usersData from "@/data/users.json";
import chatRoomsData from "@/data/chatRooms.json";

const Home = () => {
    const [friends, setFriends] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const currentUserId = "user2"; // 현재 로그인한 사용자

    useEffect(() => {
        // 본인 정보
        const user = usersData.find(u => u.id === currentUserId);
        if (user) setCurrentUser(user);

        // 본인(user2) 제외한 친구 목록
        const friendsList = usersData.filter(user => user.id !== currentUserId);
        setFriends(friendsList);
    }, []);

    // 그룹 채팅방 목록
    const groupChats = chatRoomsData.filter(room => room.chatType === 'group');

    return (
        <div className="flex flex-col h-full bg-gray-0">
            <Header type="home" />
            
            {/* 메인 컨텐츠 */}
            <div className="flex-1 overflow-y-auto">
                {/* 본인 프로필 카드 */}
                {currentUser && (
                    <MyProfileCard
                        name={currentUser.name}
                        userId={currentUser.id}
                    />
                )}

                {/* 구분선 */}
                <div className="h-[1px] bg-gray-3" />

                {/* LINE 서비스 섹션 */}
                <div className="flex flex-col gap-3">
                    <LineServiceItem />
                </div>

                <div className="h-[1px] bg-gray-3" />

                {/* 그룹 섹션 */}
                <div className="flex flex-col gap-4 py-4">
                    <CollapsibleSection title="그룹" count={groupChats.length}>
                        <div className="flex flex-col gap-4">
                          {groupChats.map(chat => {
                            const participantIds = chat.participants.filter(id => id !== currentUserId);
                            const participants: User[] = [];
                            
                            participantIds.forEach(id => {
                              const user = usersData.find(u => u.id === id);
                              if (user) {
                                participants.push(user as User);
                              }
                            });
                            
                            return (
                              <GroupItem
                                key={chat.chatId}
                                chatRoomId={chat.chatId}
                                groupName={chat.chatName}
                                participants={participants}
                                totalCount={chat.participants.length}
                              />
                            );
                          })}
                          <CreateGroupButton />
                        </div>
                    </CollapsibleSection>
                </div>

                <div className="h-[1px] bg-gray-3" />

                {/* 친구 섹션 */}
                <div className="flex flex-col gap-4 py-4">
                    <CollapsibleSection title="친구" count={friends.length}>
                        <div className="flex flex-col gap-3">
                            {/* LINE 공식 계정 최상단 */}
                            <LineOfficialAccount />
                            
                            {/* 친구 목록 */}
                            {friends.map(friend => (
                                <FriendListItem key={friend.id} user={friend} />
                            ))}
                        </div>
                    </CollapsibleSection>
                </div>

                <div className="h-[1px] bg-gray-3" />
            </div>
        </div>
    );  
}

export default Home;
