export const PlayingStatus: React.FC = () => {
  return (
    <div
      className="flex justify-center gap-2 font-bold"
      style={{
        fontSize: '9px',
      }}
    >
      <div className="flex items-center rounded-full border-2 text-purple-100 px-2">
        <div className="w-[5px] h-[5px] bg-purple-100 rounded-full mr-2" />
        <div className="mr-1">Players online:</div>
        <div>69420</div>
      </div>
      <div className="flex items-center rounded-full border-2 px-2 text-green-100">
        <div className="w-[5px] h-[5px] bg-green-100 rounded-full mr-2" />
        <div className="mr-1">Matches ongoing:</div>
        <div>4522</div>
      </div>
    </div>
  );
};
