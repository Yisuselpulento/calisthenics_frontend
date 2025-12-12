import { useEffect, useState, useRef } from "react";

const AnimatedNumber = ({ value, duration = 1000, interval = 50, className = "", decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const currentValueRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const steps = Math.ceil(duration / interval); 
    const step = value / steps; 
    currentValueRef.current = 0;

    const updateNumber = () => {
      currentValueRef.current += step;
      if (currentValueRef.current >= value) {
        setDisplayValue(value);
        cancelAnimationFrame(rafRef.current);
        return;
      } else {
        setDisplayValue(currentValueRef.current);
        rafRef.current = requestAnimationFrame(updateNumber);
      }
    };

    rafRef.current = requestAnimationFrame(updateNumber);

    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration, interval]);

  return <span className={className}>{displayValue.toFixed(decimals)}</span>;
};

const ComboStepByStep = ({
  elementsStepData = [],
  totalPoints = 0,
  isWinner = false,
  playerName = "",
}) => {
  const [displayedElements, setDisplayedElements] = useState([]);
  const [isCalculating, setIsCalculating] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!elementsStepData?.length) return;

    setDisplayedElements([]);
    indexRef.current = 0;
    setIsCalculating(true);

    const interval = setInterval(() => {
      const element = elementsStepData[indexRef.current];
      setDisplayedElements((prev) => [...prev, element]);
      indexRef.current += 1;

      if (indexRef.current >= elementsStepData.length) {
        clearInterval(interval);
        setIsCalculating(false);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [elementsStepData]);

  return (
    <div className="mt-6 flex flex-col gap-3 text-sm">
      {displayedElements
        .filter((el) => el.hold > 0 || el.reps > 0)
        .map((el) => (
          <div
            key={el.elementId}
            className="p-3 rounded-xl shadow-md transform transition-all duration-500 translate-y-0"
            style={{ animation: `dropIn 0.5s ease forwards` }}
          >
            <h3 className="font-semibold p-2 bg-stone-800 rounded-lg text-center">
              {el.name}
            </h3>
            {el.hold > 0 && <p>Hold: {el.hold}</p>}
            {el.reps > 0 && <p>Reps: {el.reps}</p>}
            <p>Dedos: {el.fingers}</p>
            <p>
              Puntos base: <AnimatedNumber value={el.basePoints} className="text-blue-400" />
            </p>
            <p>
              Aumento por dedos:{" "}
              <AnimatedNumber
                value={el.pointsWithFingers}
                className={el.pointsWithFingers >= 0 ? "text-green-400" : "text-red-400"}
              />
            </p>
           <p>
                Limpieza X{" "}
                <AnimatedNumber
                  value={el.cleanFactor}
                  decimals={2}
                  className={el.cleanFactor < 1 ? "text-red-400" : "text-green-400"}
                />
              </p>
            <p>
              Puntos por Limpieza:{" "}
              <AnimatedNumber value={el.pointsWithCleanHit} className="text-blue-400" />
            </p>
          </div>
        ))}

      {isCalculating && (
        <p className="text-white text-center font-semibold mt-2">Calculando...</p>
      )}

      {displayedElements.length === elementsStepData.length &&
        displayedElements.some((el) => el.hold > 0 || el.reps > 0) && (
          <div className="mt-4 p-2 rounded-xl shadow-lg text-center font-bold text-lg">
            <p>Total Points:</p>
            <AnimatedNumber
              value={totalPoints}
              className={isWinner ? "text-green-400" : "text-red-400"}
            />
            {playerName && (
              <p className={`mt-2 font-semibold ${isWinner ? "text-green-400" : "text-red-400"}`}>
                {playerName} {isWinner ? "🏆 Ganador" : "💀 Perdedor"}
              </p>
            )}
          </div>
        )}

      <style>
        {`
          @keyframes dropIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ComboStepByStep;