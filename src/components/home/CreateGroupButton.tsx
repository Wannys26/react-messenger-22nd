import PlusIcon from '@/assets/svgs/common/plus-icon.svg';

const CreateGroupButton = () => {
  return (
    <button className="flex items-center gap-4 w-full hover:bg-gray-1 transition-colors">
      {/* Plus 아이콘 */}
      <div className="w-11 h-11 rounded-full bg-gray-2 flex items-center justify-center">
        <img src={PlusIcon} alt="추가" className="w-6 h-6" />
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col items-start">
        <span className="text-body2-m text-gray-7">그룹 만들기</span>
        <span className="text-caption1-r text-gray-5">그룹 대화에 친구를 초대해보세요</span>
      </div>
    </button>
  );
};

export default CreateGroupButton;

