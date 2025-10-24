import ShieldIcon from '@/assets/svgs/common/shield-done.svg';

const LineOfficialAccount = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* LINE 공식 계정 아이콘 */}
        <div className="w-11 h-11 rounded-full bg-green-3 flex items-center justify-center">
          <img src={ShieldIcon} alt="LINE" className="w-6 h-6" />
        </div>
        <span className="text-body2-m text-gray-7">LINE 공식 계정</span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-body3-r text-gray-6">2</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4L10 8L6 12"
            stroke="#777777"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default LineOfficialAccount;

