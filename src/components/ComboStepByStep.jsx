import { useEffect, useState, useRef } from "react";

const ComboStepByStep = ({ elementsStepData = [], totalPoints = 0, isWinner = false,  playerName = "", }) => {
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
            .filter((el) => el.hold > 0 || el.reps > 0)
            .map((el) => (
              <div
                key={el.elementId}
                className="p-3 rounded-xl shadow-md transform transition-all duration-500 translate-y-0"
                style={{ animation: `dropIn 0.5s ease forwards` }}
              >
                <h3 className="font-semibold p-2 bg-stone-800 rounded-lg text-center">{el.name}</h3>
                {el.hold > 0 && <p>Hold: {el.hold}</p>}
                {el.reps > 0 && <p>Reps: {el.reps}</p>}
                <p>Dedos: {el.fingers}</p>
                <p>
                  Puntos base: <span className="text-blue-400">{el.basePoints.toFixed(0)}</span>
                </p>
                <p>
                  Aumento por dedos:{" "}
                  <span className={el.pointsWithFingers >= 0 ? "text-green-400" : "text-red-400"}>
                    {el.pointsWithFingers.toFixed(0)}
                  </span>
                </p>
               <p>
                    Limpieza X{" "}
                    <span className={el.cleanFactor < 1 ? "text-red-400" : "text-green-400"}>
                      {el.cleanFactor.toFixed(2)}
                    </span>
                  </p>
                <p>
                  Puntos por Limpieza: <span className="text-blue-400">{el.pointsWithCleanHit.toFixed(0)}</span>
                </p>
              </div>
            ))}

          {/* Mostrar total al final */}
          {displayedElements.length === elementsStepData.length &&
            displayedElements.some((el) => el.hold > 0 || el.reps > 0) && (
              <div className="mt-4 p-2 rounded-xl shadow-lg text-center font-bold text-lg">
              <p>Total Points:</p>
              <p className={isWinner ? "text-green-400" : "text-red-400"}>
                {totalPoints.toFixed(0)}
              </p>

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
