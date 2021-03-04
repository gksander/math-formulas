import * as React from "react";
import { useBoardContext } from "./Board";
import { Tex } from "./Tex";
import { IPoint } from "../types";

/**
 * Point class
 */
export class Point {
  x: number;
  y: number;

  constructor({ x, y }: IPoint) {
    this.x = x;
    this.y = y;
  }

  Render = (ops: { fill?: string }) => (
    <PointDisplay x={this.x} y={this.y} {...ops} />
  );
}

/**
 * Display of a point
 */
type PointDisplayProps = IPoint & {
  fill?: string;
};
const PointDisplay: React.FC<PointDisplayProps> = ({ x, y, fill = "red" }) => {
  const { transformX, transformY } = useBoardContext();
  return (
    <React.Fragment>
      <circle cx={transformX(x)} cy={transformY(y)} r={2} fill={fill} />
      <foreignObject
        x={transformX(x)}
        y={transformY(y)}
        width="20%"
        height="20%"
        style={{ display: "flex" }}
      >
        <span style={{ fontSize: 4 }}>
          <Tex expr={`(${x}, ${y})`} />
        </span>
      </foreignObject>
    </React.Fragment>
  );
};

/**
 * Using a point
 */
export const usePoint = (x: number, y: number) => {
  return React.useMemo(() => {
    return new Point({ x, y });
  }, [x, y]);
};
