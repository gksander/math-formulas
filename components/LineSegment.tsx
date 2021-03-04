import * as React from "react";
import { useBoardContext } from "./Board";
import { IPoint } from "../types";
import { Point } from "./Point";

class LineSegment {
  start: Point;
  end: Point;

  constructor({ start, end }: { start: Point; end: Point }) {
    this.start = start;
    this.end = end;
  }

  Render = (ops: { stroke?: string }) => (
    <LineSegmentDisplay
      start={{ x: this.start.x, y: this.start.y }}
      end={{ x: this.end.x, y: this.end.y }}
      {...ops}
    />
  );
}

type LineSegmentDisplayProps = {
  start: IPoint;
  end: IPoint;
  stroke?: string;
};

export const LineSegmentDisplay: React.FC<LineSegmentDisplayProps> = ({
  start,
  end,
  stroke = "blue",
}) => {
  const { transformX, transformY } = useBoardContext();
  return (
    <line
      x1={transformX(start.x)}
      y1={transformY(start.y)}
      x2={transformX(end.x)}
      y2={transformY(end.y)}
      strokeWidth={1}
      stroke={stroke}
    />
  );
};

/**
 * Exposing line segment functionality
 */
export const useLineSegment = (start: Point, end: Point) => {
  return React.useMemo(() => {
    return new LineSegment({ start, end });
  }, [start, end]);
};
