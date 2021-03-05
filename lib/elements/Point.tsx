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
      let tmpPoint = svgRef?.current?.createSVGPoint();
      tmpPoint.x = e.clientX;
      tmpPoint.y = e.clientY;
      tmpPoint = tmpPoint.matrixTransform(
        svgRef?.current?.getScreenCTM()?.inverse(),
      );

      const dragOffset: IPoint = {
        x: untransformX(tmpPoint.x) - x,
        y: untransformY(tmpPoint.y) - y,
      };

      const pointerMove = (e: PointerEvent) => {
        e.preventDefault();
        tmpPoint.x = e.clientX;
        tmpPoint.y = e.clientY;

        const cursor = tmpPoint.matrixTransform(
          svgRef?.current?.getScreenCTM()?.inverse(),
        );

        setCoords(() => ({
          x: untransformX(cursor.x) - dragOffset.x,
          y: untransformY(cursor.y) - dragOffset.y,
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
