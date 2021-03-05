import * as React from "react";
import { useTheBoard } from "../utils/useTheBoard";

const Test2: React.FC = () => {
  const [x, setX] = React.useState(3);

  const Board = useTheBoard(
    React.useCallback(({ point }) => {
      point(3, 5);
    }, []),
    {},
  );

  return (
    <div>
      <div>
        <input
          type="number"
          value={x}
          onChange={(e) => setX(parseInt(e.target.value))}
        />
      </div>
      <div className="w-64 h-64">{Board}</div>
    </div>
  );
};

export default Test2;
