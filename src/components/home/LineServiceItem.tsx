const LineServiceItem = () => {
  return (
    <div className="flex items-center justify-between w-[335px] mx-auto py-3">
      <span className="text-body3-m1 text-gray-6">LINE 서비스</span>
      {/* arrow-down.svg로 대체 필요 */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="cursor-pointer">
        <path
          d="M7.5 5L12.5 10L7.5 15"
          stroke="#777777"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default LineServiceItem;

