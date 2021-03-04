import * as React from "react";
import v4 from "uuid/dist/v4";

export const useUuid = () => React.useMemo(() => v4(), []);
