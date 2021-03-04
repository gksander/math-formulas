import * as React from "react";
import { Board } from "../components/Board";
import { usePoint } from "../components/Point";
import { useAxes } from "../components/Axes";
import { useLineSegment } from "../components/LineSegment";
import { useCircle } from "../components/Circle";
import { useLine } from "../components/Line";
import { usePolygon } from "../components/Polygon";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const [y, setY] = React.useState(5);

  const [_tt, setTt] = React.useState(0);
  React.useEffect(() => {
    const i = setInterval(() => setTt((v) => v + 1), 1000);
    return () => {
      clearInterval(i);
    };
  }, []);

  const Axes = useAxes();
  const A = usePoint(-1, 2);
  const B = usePoint(5, y);
  const D = usePoint(-10, 10);
  const E = usePoint(-10, -10);
  const LS = useLineSegment(A, B);
  const L = useLine(A, B);
  const C = useCircle({ center: A, passesThroughPoint: B });
  const Poly = usePolygon([E, B, A, D]);

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
          <line x1={0} x2={5} y1={3} y2={3} />
          <Axes.Render stroke="blue" />
          <L.Render />
          <LS.Render stroke="purple" />
          {/*<C.Render />*/}
          <A.Render fill="green" />
          <B.Render />
          {/*<Poly.Render />*/}
        </Board>
      </div>
    </div>
  );
};

export default HomePage;
