import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { useBoardContext } from "./Board";
import { ArrowHeadMarkerDefs } from "./ArrowHeadMarkerDefs";
import { useUuid } from "../utils/useUuid";

/**
 * Axes class
 */
class Axes {
  constructor() {}

  Render = (ops: AxesDisplayProps) => <AxesDisplay {...ops} />;
}

/**
 * Axes display
 */
type AxesDisplayProps = {
  stroke?: string;
  tickDistance?: number;
};

const AxesDisplay: React.FC<AxesDisplayProps> = ({ stroke = "gray" }) => {
  const { xMin, xMax, yMin, yMax, transformX, transformY } = useBoardContext();
  const id = useUuid();

  return (
    <React.Fragment>
      {/* Defs that can be used inside the SVG */}
      <ArrowHeadMarkerDefs id={id} color={stroke} />
      <line
        x1={transformX(xMin)}
        y1={transformY(0)}
        x2={transformX(xMax)}
        y2={transformY(0)}
        strokeWidth={0.4}
        stroke={stroke}
        markerStart={`url(#arrowStart-${id})`}
        markerEnd={`url(#arrowEnd-${id})`}
      />
      <line
        x1={transformX(0)}
        y1={transformY(yMin)}
        x2={transformX(0)}
        y2={transformY(yMax)}
        strokeWidth={0.4}
        stroke={stroke}
        markerStart={`url(#arrowStart-${id})`}
        markerEnd={`url(#arrowEnd-${id})`}
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
