
// 메시지 타입
export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  date?: string;
}

// 사용자 타입
export interface User {
  id: string;
  name: string;
  profile: string;
  statusMessage?: string;
}