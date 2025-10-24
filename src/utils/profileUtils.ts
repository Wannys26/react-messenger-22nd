import MomProfile from '@/assets/svgs/chatroom/mom-profile.svg';
import DefaultProfile from '@/assets/svgs/chatroom/default-profile.svg';
import DefaultProfileGreen from '@/assets/svgs/chatroom/default-profile-green.svg';
import TaerinProfile from '@/assets/svgs/chatroom/taerin-profile.svg';
import JiminProfile from '@/assets/svgs/chatroom/jimin-profile.svg';
import UhginProfile from '@/assets/svgs/chatroom/uhgin-profile.svg';
import DoriProfile from '@/assets/svgs/chatroom/dori-profile.svg';
import FaterProfile from '@/assets/svgs/chatroom/father-profile.svg';
import JinhwaProfile from '@/assets/svgs/chatroom/jinhwa-profile.svg';

const profileMap: Record<string, string> = {
  'user1': MomProfile,
  'user2': DefaultProfile,
  'user3': DefaultProfileGreen,
  'user4': TaerinProfile,
  'user5': JiminProfile,
  'user6': UhginProfile,
  'user7': DefaultProfileGreen,
  'user8': DefaultProfileGreen,
  'user9': DefaultProfileGreen,
  'user10': FaterProfile,
  'user11': DoriProfile,
  'user12': DefaultProfileGreen,
  'user13': JinhwaProfile,
};

export const getProfileImage = (userId: string): string => {
  return profileMap[userId] || DefaultProfile;
};


