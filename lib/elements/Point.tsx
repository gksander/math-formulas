import * as React from "react";
import { atom, useAtom, WritableAtom } from "jotai";
import { IPoint } from "../types";
import { useBoardContext } from "../useBoard";

/**
 * Point class
 */
export class Point {
  coordsAtom: WritableAtom<IPoint, (prev: IPoint) => IPoint>;

  constructor(x: number, y: number) {
    this.coordsAtom = atom({ x, y });
  }
}

/**
 * Point display
 */
type PointDisplayProps = {
  point: Point;
};
export const PointDisplay: React.FC<PointDisplayProps> = ({ point }) => {
  const [{ x, y }] = useAtom(point.coordsAtom);
  const { transformX, transformY } = useBoardContext();

  return (
    <React.Fragment>
      <circle cx={transformX(x)} cy={transformY(y)} r={2} fill="red" />
    </React.Fragment>
  );
};
