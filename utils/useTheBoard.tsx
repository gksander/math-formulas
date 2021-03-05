import * as React from "react";
import { ArrowHeadMarkerDefs } from "../components/ArrowHeadMarkerDefs";
import { Atom, atom, Provider, useAtom, WritableAtom } from "jotai";
import { IPoint } from "../types";

export const useTheBoard = (
  fn: BoardGenerator,
  { xMin = -10, xMax = 10, yMin = -10, yMax = 10 }: BoardConfig,
) => {
  const [elements, setElements] = React.useState<Point[]>([]);

  // Transformers, mapping Euclid -> SVG coords
  const transformX = React.useCallback(
    (x: number): number => -SIZE + ((x - xMin) / (xMax - xMin)) * 2 * SIZE,
    [xMin, xMax],
  );
  const transformY = React.useCallback(
    (y: number): number => SIZE - ((y - yMin) / (yMax - yMin)) * 2 * SIZE,
    [yMin, yMax],
  );

  /**
   * Setting elements
   */
  React.useEffect(() => {
    const newElements = [];

    const point = (x: number, y: number) => {
      const newPoint = new Point(x, y);
      newElements.push(newPoint);
      return newPoint;
    };

    fn({ point });
    setElements(newElements);
  }, [fn, transformX, transformY]);

  return (
    <Provider>
      <svg viewBox={`${-SIZE} ${-SIZE} ${2 * SIZE} ${2 * SIZE}`}>
        <ArrowHeadMarkerDefs id="axes" color="gray" />
        <line
          x1={transformX(xMin)}
          y1={transformY(0)}
          x2={transformX(xMax)}
          y2={transformY(0)}
          strokeWidth={0.4}
          stroke="gray"
          markerStart={`url(#arrowStart-axes)`}
          markerEnd={`url(#arrowEnd-axes)`}
        />
        <line
          x1={transformX(0)}
          y1={transformY(yMin)}
          x2={transformX(0)}
          y2={transformY(yMax)}
          strokeWidth={0.4}
          stroke="gray"
          markerStart={`url(#arrowStart-axes)`}
          markerEnd={`url(#arrowEnd-axes)`}
        />

        {elements.map((p, i) => {
          if (p instanceof Point) {
            return <PointDisplay point={p} key={i} />;
          }
        })}
      </svg>
    </Provider>
  );
};

const SIZE = 50;

type transformer = (x: number) => number;

interface BoardElement {
  Render: () => JSX.Element;
}

class Point {
  coords: WritableAtom<IPoint, (prev: IPoint) => IPoint>;

  constructor(x: number, y: number) {
    this.coords = atom({ x, y });
  }
}

type BoardGenerator = (helpers: {
  point: (x: number, y: number) => Point;
}) => void;

type BoardConfig = {
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
};

const PointDisplay: React.FC<{ point: Point }> = ({ point }) => {
  const [coords, setCoords] = useAtom(point.coords);

  React.useEffect(() => {
    const i = setInterval(() => {
      setCoords((coords) => ({ ...coords, x: coords.x + 3 }));
    }, 400);

    return () => {
      clearInterval(i);
    };
  }, []);

  return <circle cx={coords.x} cy={coords.y} r={2} fill="red" />;
};
