import * as React from "react";

export type IPoint = { x: number; y: number };

export interface BoardElement {
  Render: () => React.ReactElement;
}
