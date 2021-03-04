import * as React from "react";
import { useBoardContext } from "./Board";

/**
 * Axes class
 */
class Axes {
  constructor() {}

  Render = () => <AxesDisplay />;
}

/**
 * Axes display
 */
type AxesDisplayProps = {};
const AxesDisplay: React.FC<AxesDisplayProps> = () => {
  const { xMin, xMax, yMin, yMax, transformX, transformY } = useBoardContext();

  return (
    <React.Fragment>
      <line
        x1={transformX(xMin)}
        y1={transformY(0)}
        x2={transformX(xMax)}
        y2={transformY(0)}
        strokeWidth={0.4}
        stroke="gray"
      />
      <line
        x1={transformX(0)}
        y1={transformY(yMin)}
        x2={transformX(0)}
        y2={transformY(yMax)}
        strokeWidth={0.4}
        stroke="gray"
      />
    </React.Fragment>
  );
};

/**
 * Expose axes functionality
 */
export const useAxes = () => {
  return React.useMemo(() => new Axes(), []);
};
