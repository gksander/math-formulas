import * as React from "react";
import { IPoint } from "../types";
import { distanceBetweenPoints } from "../utils/distanceBetweenPoints";
import { useBoardContext } from "./Board";
import { Point } from "./Point";
import { abs } from "../utils/mathFns";

class Circle {
  center: Point;
  radius: number;

  constructor({
    center,
    radius,
    passesThroughPoint,
  }: {
    center: Point;
    radius?: number;
    passesThroughPoint?: Point;
  }) {
    this.center = center;

    this.radius = (() => {
      if (passesThroughPoint) {
        return distanceBetweenPoints(center, passesThroughPoint);
      } else if (radius) {
        return radius;
      } else {
        return 1;
      }
    })();
  }

  Render = (ops: {}) => (
    <CircleDisplay
      center={{ x: this.center.x, y: this.center.y }}
      radius={this.radius}
      {...ops}
    />
  );
}

type CircleDisplayProps = {
  center: IPoint;
  radius: number;
};

const CircleDisplay: React.FC<CircleDisplayProps> = ({ center, radius }) => {
  const { transformX, transformY } = useBoardContext();

  return (
    <ellipse
      cx={transformX(center.x)}
      cy={transformY(center.y)}
      rx={abs(transformX(radius))}
      ry={abs(transformY(radius))}
      strokeWidth={1}
      stroke="black"
      fill="transparent"
    />
  );
};

export const useCircle = ({
  center,
  radius,
  passesThroughPoint,
}: {
  center: Point;
  radius?: number;
  passesThroughPoint?: Point;
}): Circle => {
  return React.useMemo(
    () => new Circle({ center, radius, passesThroughPoint }),
    [center, radius, passesThroughPoint],
  );
};
