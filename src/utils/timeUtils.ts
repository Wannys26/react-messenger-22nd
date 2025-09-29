//시간 HH:MM 형식으로 포맷팅
export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

// 날짜를 "YYYY년 M월 D일" 형식으로 포맷팅
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// 채팅 목록에서 표시할 시간 포맷 (오늘이면 시간, 아니면 날짜)
export const formatChatListTime = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDate = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());

  if (msgDate.getTime() === today.getTime()) {
    // 오늘이면 시간만 표시
    return formatTime(timestamp);
  } else if (msgDate.getTime() === today.getTime() - 24 * 60 * 60 * 1000) {
    // 어제면 "어제" 표시
    return '어제';
  } else if (messageDate.getFullYear() === now.getFullYear()) {
    // 올해면 월/일만 표시
    return `${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`;
  } else {
    // 작년 이전이면 년/월/일 표시
    return `${messageDate.getFullYear()}년 ${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`;
  }
};

// 두 날짜가 같은 날인지 확인
export const isSameDate = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// 두 메시지가 같은 시간(분)인지 확인
export const isSameMinute = (timestamp1: string, timestamp2: string): boolean => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  
  return date1.getHours() === date2.getHours() &&
         date1.getMinutes() === date2.getMinutes();
};