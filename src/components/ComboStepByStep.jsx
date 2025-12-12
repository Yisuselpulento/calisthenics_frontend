import { useEffect, useState, useRef } from "react";

const ComboStepByStep = ({ elementsStepData = [], totalPoints = 0 }) => {
  const [displayedElements, setDisplayedElements] = useState([]);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!elementsStepData?.length) return; // evita undefined

    setDisplayedElements([]);
    indexRef.current = 0;

    const interval = setInterval(() => {
      const element = elementsStepData[indexRef.current];
      console.log("Añadiendo elemento:", element); // para debug

      setDisplayedElements((prev) => [...prev, element]);

      indexRef.current += 1;

      if (indexRef.current >= elementsStepData.length) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [elementsStepData]);

  return (
    <div className="mt-6 flex flex-col gap-3 text-sm">
      {displayedElements
        .filter((el) => el.hold > 0 || el.reps > 0) // <-- filtramos elementos válidos
        .map((el) => (
          <div
            key={el.elementId}
            className="p-3 rounded-xl shadow-md transform transition-all duration-500 translate-y-0"
            style={{ animation: `dropIn 0.5s ease forwards` }}
          >
            <h3 className="text-lg font-semibold">{el.name}</h3>
            {el.hold > 0 && <p>Hold: {el.hold}</p>}
            {el.reps > 0 && <p>Reps: {el.reps}</p>}
            <p>Fingers: {el.fingers}</p>
            <p>Base Points: {el.basePoints.toFixed(0)}</p>
            <p>Points with Fingers: {el.pointsWithFingers.toFixed(0)}</p>
            <p>Clean Factor: {el.cleanFactor.toFixed(2)}</p>
            <p>Points after Clean Bonus: {el.pointsWithCleanHit.toFixed(0)}</p>
            <p className="font-bold">Total Points So Far: {el.totalPointsSoFar.toFixed(0)}</p>
          </div>
        ))}

      {/* Mostrar total al final */}
      {displayedElements.length === elementsStepData.length &&
        displayedElements.some((el) => el.hold > 0 || el.reps > 0) && (
          <div className="mt-4 bg-green-600 p-4 rounded-xl shadow-lg text-white text-center font-bold text-xl">
            Total Points: {totalPoints.toFixed(0)}
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
