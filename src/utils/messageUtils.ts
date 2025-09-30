import type { Message } from '@/types/chat';
import { isSameMinute } from './timeUtils';

// 프로필 표시 여부를 결정하는 함수
export const shouldShowProfile = (
  currentMessage: Message, 
  messages: Message[], 
  index: number, 
  currentUserId: string
): boolean => {
  // 내 메시지는 프로필 표시 안함
  if (currentMessage.userId === currentUserId) return false;

  // 첫 메시지는 항상 프로필 표시
  if (index === 0) return true;

  const prevMessage = messages[index - 1];

  // 날짜가 바뀌면 프로필 표시
  if (currentMessage.date) return true;

  // 이전 메시지와 다른 사용자면 프로필 표시
  if (prevMessage.userId !== currentMessage.userId) return true;

  // 같은 사용자지만 시간(분)이 다르면 프로필 표시
  return !isSameMinute(currentMessage.timestamp, prevMessage.timestamp);
};

// 같은 시간 그룹의 마지막 메시지인지 확인
export const isLastInTimeGroup = (
  currentMessage: Message, 
  messages: Message[], 
  index: number
): boolean => {
  // 마지막 메시지면 true
  if (index === messages.length - 1) return true;

  const nextMessage = messages[index + 1];

  // 다음 메시지가 다른 사용자거나, 분/시간이 다르면 마지막
  return currentMessage.userId !== nextMessage.userId || 
         !isSameMinute(currentMessage.timestamp, nextMessage.timestamp);
};

// 메시지 간격 계산
export const getMessageMargin = (
  currentMessage: Message, 
  messages: Message[], 
  index: number
): string => {
  if (index === 0) return ''; // 첫 메시지는 간격 없음

  const prevMessage = messages[index - 1];

  // 날짜 구분선이 있으면 간격 없음
  if (currentMessage.date) return '';

  // 다른 사용자의 메시지면 12px
  if (currentMessage.userId !== prevMessage.userId) return 'mt-3';

  // 같은 사용자, 같은 분이면 4px
  if (isSameMinute(currentMessage.timestamp, prevMessage.timestamp)) {
    return 'mt-1';
  }

  // 같은 사용자, 다른 분이면 12px
  return 'mt-3';
};