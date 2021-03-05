import * as React from "react";
import { useBoard } from "../lib/useBoard";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const Board = useBoard(
    React.useCallback((builder) => {
      builder.axes();
      const A = builder.point(-3, 3);
      const B = builder.point(4, 4);
      const O = builder.point(0, 0);

      builder.line(A, B);
      builder.lineSegment(O, A);
      builder.lineSegment(O, B);
      builder.circle(A, B);
    }, []),
    {},
  );

  return (
    <div className="p-3">
      <div className="w-64 h-64">{Board}</div>
    </div>
  );
};

export default HomePage;
