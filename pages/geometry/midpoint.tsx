import * as React from "react";
import { Board } from "../../components/Board";
import { usePoint } from "../../components/Point";
import { useAxes } from "../../components/Axes";
import { useLine } from "../../components/Line";
import { useLineSegment } from "../../components/LineSegment";
import { Tex } from "../../components/Tex";

const Midpoint: React.FC = () => {
  const [x0, setX0] = React.useState<number | "">(0);
  const [y0, setY0] = React.useState<number | "">(0);
  const [x1, setX1] = React.useState<number | "">(3);
  const [y1, setY1] = React.useState<number | "">(3);

  const Axes = useAxes();
  const P0 = usePoint(x0 || 0, y0 || 0);
  const P1 = usePoint(x1 || 0, y1 || 0);
  const MP = usePoint(((x0 || 0) + (x1 || 0)) / 2, ((y0 || 0) + (y1 || 0)) / 2);
  const LS = useLineSegment(P0, P1);

  return (
    <div>
      <h1 className="text-2xl font-bold">Midpoint</h1>
      <div>
        <div>
          x0 ={" "}
          <input
            type="number"
            value={x0}
            onChange={(e) => {
              const val = e.target.value;
              const parsedVal = parseFloat(val);
              setX0(isNaN(parsedVal) ? "" : parsedVal);
            }}
          />
        </div>
        <div>
          y0 ={" "}
          <input
            type="number"
            value={y0}
            onChange={(e) => {
              const val = e.target.value;
              const parsedVal = parseFloat(val);
              setY0(isNaN(parsedVal) ? "" : parsedVal);
            }}
          />
        </div>
      </div>
      <div>
        <Tex
          expr={`(x_M, y_M) = \\left( \\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2} \\right) = \\left( \\frac{${x0} + ${x1}}{2}, \\frac{${y0} + ${y1}}{2} \\right)`}
          isBlock
        />
      </div>
      <div className="w-64 h-64">
        <Board>
          <Axes.Render />
          <LS.Render />
          <P0.Render />
          <P1.Render />
          <MP.Render />
        </Board>
      </div>
    </div>
  );
};

export default Midpoint;
