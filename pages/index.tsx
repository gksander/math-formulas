import * as React from "react";
import { useBoard } from "../lib/useBoard";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const Board = useBoard(
    React.useCallback(({ point, axes, lineSegment, line }) => {
      axes();
      const A = point(-3, 3);
      const B = point(9, 3);
      const O = point(0, 0);

      line(A, B);
      lineSegment(O, A);
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
