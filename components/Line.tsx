import * as React from "react";
import { IPoint } from "../types";
import { useBoardContext } from "./Board";
import { Point } from "./Point";

class Line {
  start: Point;
  end: Point;

  constructor({ start, end }: { start: Point; end: Point }) {
    this.start = start;
    this.end = end;
  }

  Render = (ops: {}) => {
    const { x: x1, y: y1 } = this.start;
    const { x: x2, y: y2 } = this.end;
    return (
      <LineDisplay start={{ x: x1, y: y1 }} end={{ x: x2, y: y2 }} {...ops} />
    );
  };
}

type LineDisplayProps = {
  start: IPoint;
  end: IPoint;
};

export const LineDisplay: React.FC<LineDisplayProps> = ({ start, end }) => {
  const { xMin, xMax, yMin, yMax, transformX, transformY } = useBoardContext();

  const coords = React.useMemo<
    undefined | [number, number, number, number]
  >(() => {
    // Vertical line
    if (start.x === end.x) {
      if (start.x < xMin || start.x > xMax) {
        return undefined;
      } else {
        return [start.x, yMin, start.x, yMax];
      }
    }

    // Horizontal line
    if (start.y === end.y) {
      if (start.y < yMin || start.y > yMax) {
        return undefined;
      } else {
        return [xMin, start.y, xMax, start.y];
      }
    }

    const m = (end.y - start.y) / (end.x - start.x);

    const leftIntersection: IPoint | null = (() => {
      const hitPointX = xMin;
      const hitPointY = start.y + m * (hitPointX - start.x);

      if (hitPointY >= yMin && hitPointY <= yMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const rightIntersection: IPoint | null = (() => {
      const hitPointX = xMax;
      const hitPointY = start.y + m * (hitPointX - start.x);

      if (hitPointY >= yMin && hitPointY <= yMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const topIntersection: IPoint | null = (() => {
      const hitPointY = yMax;
      const hitPointX = (hitPointY - start.y) / m + start.x;

      if (hitPointX >= xMin && hitPointX <= xMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const bottomIntersection: IPoint | null = (() => {
      const hitPointY = yMin;
      const hitPointX = (hitPointY - start.y) / m + start.x;

      if (hitPointX >= xMin && hitPointX <= xMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const intersections = [
      leftIntersection,
      rightIntersection,
      topIntersection,
      bottomIntersection,
    ]
      .filter(Boolean)
      .sort((a, b) => a.x - b.x);

    const [firstPoint, secondPoint] = intersections;

    if (firstPoint && secondPoint) {
      return [firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y];
    }

    return undefined;
  }, [start, end, xMin, xMin, yMin, yMax]);

  if (!coords) {
    return null;
  }

  const [x1, y1, x2, y2] = coords;

  return (
    <line
      x1={transformX(x1)}
      y1={transformY(y1)}
      x2={transformX(x2)}
      y2={transformY(y2)}
      strokeWidth={1}
      stroke="black"
    />
  );
};

export const useLine = (start: Point, end: Point): Line => {
  return React.useMemo(() => new Line({ start, end }), [start, end]);
};
