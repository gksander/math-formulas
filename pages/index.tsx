import * as React from "react";
import { useBoard } from "../lib/useBoard";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const Board = useBoard(
    React.useCallback(({ point, axes, lineSegment }) => {
      axes();
      const A = point(-3, 0);
      const B = point(9, 3);

      lineSegment(A, B);
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
