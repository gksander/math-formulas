import * as React from "react";
import { Point, PointDisplay } from "./elements/Point";
import { CoordinateTransformer } from "./types";
import { Provider } from "jotai";
import { Axes, AxesDisplay } from "./elements/Axes";
import { LineSegment, LineSegmentDisplay } from "./elements/LineSegment";

/**
 * API for using board
 */
export const useBoard = (
  fn: BoardGenerator,
  { xMin = -10, xMax = 10, yMin = -10, yMax = 10 }: BoardConfig,
) => {
  const [elements, setElements] = React.useState<
    (Axes | Point | LineSegment)[]
  >([]);

  // Transformers, mapping Euclid -> SVG coords
  const transformX: CoordinateTransformer = React.useCallback(
    (x: number): number => -SIZE + ((x - xMin) / (xMax - xMin)) * 2 * SIZE,
    [xMin, xMax],
  );
  const transformY: CoordinateTransformer = React.useCallback(
    (y: number): number => SIZE - ((y - yMin) / (yMax - yMin)) * 2 * SIZE,
    [yMin, yMax],
  );

  /**
   * Building board based on generating fn
   */
  React.useEffect(() => {
    const newElements = [];
    const addElement: <T>(el: T) => T = (el) => {
      newElements.push(el);
      return el;
    };

    const axes = () => addElement(new Axes());
    const point = (x: number, y: number) => addElement(new Point(x, y));
    const lineSegment = (start: Point, end: Point) =>
      addElement(new LineSegment(start, end));

    fn({ point, axes, lineSegment });
    setElements(newElements);
  }, [fn]);

  /**
   * Provide some values so components can do _maths_
   */
  const value: BoardContextValue = React.useMemo(
    () => ({ transformX, transformY, xMin, xMax, yMin, yMax }),
    [transformX, transformY, xMin, xMax, yMin, yMax],
  );

  return (
    <Provider>
      <BoardContext.Provider value={value}>
        <svg viewBox={`${-SIZE} ${-SIZE} ${2 * SIZE} ${2 * SIZE}`}>
          {elements.map((el, i) => {
            if (el instanceof Axes) {
              return <AxesDisplay key={i} />;
            } else if (el instanceof Point) {
              return <PointDisplay point={el} key={i} />;
            } else if (el instanceof LineSegment) {
              return <LineSegmentDisplay lineSegment={el} key={i} />;
            }
          })}
        </svg>
      </BoardContext.Provider>
    </Provider>
  );
};

const SIZE = 50;

type BoardGenerator = (helpers: {
  axes: () => Axes;
  point: (x: number, y: number) => Point;
  lineSegment: (start: Point, end: Point) => LineSegment;
}) => void;

type BoardConfig = {
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
};

type BoardContextValue = {
  transformX: CoordinateTransformer;
  transformY: CoordinateTransformer;
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