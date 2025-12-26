import { FaTrophy } from "react-icons/fa";
import { getRankingColor } from "../../helpers/getRankingColor";

const RankingDisplay = ({ ranking }) => {
  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <div className="flex gap-6">
        {/* Static */}
        <div className="flex flex-col items-center">
          <FaTrophy
            className={`text-xl ${getRankingColor(ranking.static.tier)}`}
          />
          <span className="text-xs font-bold">{ranking.static.elo}</span>
          <span className="text-[10px]">{ranking.static.tier}</span>
          <span className="text-[10px]">(Static)</span>
        </div>

        {/* Dynamic */}
        <div className="flex flex-col items-center">
          <FaTrophy
            className={`text-xl ${getRankingColor(ranking.dynamic.tier)}`}
          />
          <span className="text-xs font-bold">{ranking.dynamic.elo}</span>
          <span className="text-[10px]">{ranking.dynamic.tier}</span>
          <span className="text-[10px]">(Dynamic)</span>
        </div>
      </div>
    </div>
  );
};

export default RankingDisplay;
