export const PlayingStatus: React.FC = () => {
  return (
    <div className="flex justify-center gap-2 font-bold">
      <div className="flex items-center w-[165px] text-[12px] rounded-full border-2 px-3 py-[1px] text-purple-100">
        <div className="w-[5px] h-[5px] bg-purple-100 rounded-full mr-2" />
        <div className="mr-1">Player online:</div>
        <div>69420</div>
      </div>
      <div className="flex items-center text-[12px] w-[170px] rounded-full border-2 px-3 text-green-100">
        <div className="w-[5px] h-[5px] bg-green-100 rounded-full mr-2" />
        <div className="mr-1">Matchs ongoing:</div>
        <div>4522</div>
      </div>
    </div>
  );
};
