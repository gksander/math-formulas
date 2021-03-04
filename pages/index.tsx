import * as React from "react";
import { Board } from "../components/Board";
import { usePoint } from "../components/Point";
import { useAxes } from "../components/Axes";
import { useLineSegment } from "../components/LineSegment";
import { Tex } from "../components/Tex";
import { useCircle } from "../components/Circle";
import { useLine } from "../components/Line";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const [y, setY] = React.useState(3);

  const Axes = useAxes();
  const A = usePoint(-1, -2);
  const B = usePoint(5, y);
  const LS = useLineSegment(A, B);
  const L = useLine(A, B);
  const C = useCircle({ center: A, passesThroughPoint: B });

  return (
    <div style={{ padding: "40px" }}>
      y=
      <input
        value={y}
        type="number"
        onChange={(e) => setY(parseFloat(e.target.value) || 0)}
      />
      <br />
      <br />
      <div style={{ width: 300, height: 300, border: "1px solid black" }}>
        <Board>
          <Axes.Render />
          <LS.Render stroke="purple" />
          <L.Render />
          <A.Render fill="green" />
          <B.Render />
          <C.Render />
        </Board>
      </div>
    </div>
  );
};

export default HomePage;
