import * as React from "react";

type BoardProps = {
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
};

const SIZE = 50;

export const Board: React.FC<BoardProps> = ({
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  children,
}) => {
  const value = React.useMemo(() => {
    return {
      xMin,
      xMax,
      yMin,
      yMax,
      transformX: (x: number): number =>
        -SIZE + ((x - xMin) / (xMax - xMin)) * 2 * SIZE,
      transformY: (y: number): number =>
        SIZE - ((y - yMin) / (yMax - yMin)) * 2 * SIZE,
    };
  }, [xMin, xMax, yMin, yMax]);

  return (
    <BoardContext.Provider value={value}>
      <svg viewBox={`${-SIZE} ${-SIZE} ${2 * SIZE} ${2 * SIZE}`}>
        {children}
      </svg>
    </BoardContext.Provider>
  );
};

type BoardContextValue = {
  transformX: (x: number) => number;
  transformY: (y: number) => number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};
const BoardContext = React.createContext<BoardContextValue>({
  transformX: (x) => x,
  transformY: (y) => y,
  xMin: 0,
  xMax: 0,
  yMin: 0,
  yMax: 0,
});

export const useBoardContext = () => React.useContext(BoardContext);
