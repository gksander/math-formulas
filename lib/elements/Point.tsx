import * as React from "react";
import { atom, useAtom, WritableAtom } from "jotai";
import { IPoint, NumberAtom } from "../types";
import { useBoardContext } from "../useBoard";

/**
 * Point class
 */
export class Point {
  x: NumberAtom;
  y: NumberAtom;
  coordsAtom: WritableAtom<IPoint, (prev: IPoint) => IPoint>;

  constructor(x: number | NumberAtom, y: number | NumberAtom) {
    this.x =
      typeof x === "number"
        ? atom(x)
        : atom(
            (get) => get(x),
            () => null,
          );
    this.y =
      typeof y === "number"
        ? atom(y)
        : atom(
            (get) => get(y),
            () => null,
          );

    this.coordsAtom = atom(
      (get) => ({ x: get(this.x), y: get(this.y) }),
      (get, set, arg) => {
        const newCoords = arg({ x: get(this.x), y: get(this.y) });
        set(this.x, newCoords.x);
        set(this.y, newCoords.y);
      },
    );
  }
}

/**
 * Point display
 */
type PointDisplayProps = {
  point: Point;
};
export const PointDisplay: React.FC<PointDisplayProps> = ({ point }) => {
  const [{ x, y }, setCoords] = useAtom(point.coordsAtom);
  const {
    transformX,
    transformY,
    untransformX,
    untransformY,
    svgRef,
  } = useBoardContext();

  /**
   * On pointer down:
   *  - Determine offset within the point.
   *  - Register move listener and update coordinates in live time
   *  - On pointer up/leave, remove event listeners
   */
  const handlePointerDown: React.PointerEventHandler<SVGCircleElement> = React.useCallback(
    (e) => {
      e.preventDefault();
      const pointerMove = (e: PointerEvent) => {
        e.preventDefault();

        const tmpPoint = svgRef?.current?.createSVGPoint();
        tmpPoint.x = e.clientX;
        tmpPoint.y = e.clientY;
        const cursor = tmpPoint.matrixTransform(
          svgRef?.current?.getScreenCTM()?.inverse(),
        );

        setCoords(() => ({
          x: untransformX(cursor.x),
          y: untransformY(cursor.y),
        }));
      };

      const pointerUp = () => {
        svgRef?.current?.removeEventListener("pointermove", pointerMove);
        svgRef?.current?.removeEventListener("pointerup", pointerUp);
        svgRef?.current?.removeEventListener("pointerleave", pointerUp);
      };

      svgRef?.current?.addEventListener("pointermove", pointerMove);
      svgRef?.current?.addEventListener("pointerup", pointerUp);
      svgRef?.current?.addEventListener("pointerleave", pointerUp);
    },
    [transformX, transformY, untransformX, untransformY],
  );

  return (
    <React.Fragment>
      <circle
        cx={transformX(x)}
        cy={transformY(y)}
        r={2}
        fill="red"
        onPointerDown={handlePointerDown}
      />
    </React.Fragment>
  );
};
