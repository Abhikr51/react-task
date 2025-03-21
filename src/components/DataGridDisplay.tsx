import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
// refer to https://github.com/jpmorganchase/salt-ds/tree/main/site/src/examples/ag-grid-theme/data
import { useAgGridHelpers } from "../helpers/useAgGridHelpers";
// import "ag-grid-community/styles/ag-grid.css";
import "@salt-ds/ag-grid-theme/salt-ag-theme.css";
import { forwardRef } from "react";
const DataGridDisplay = forwardRef<AgGridReact, AgGridReactProps>(
  ({ ...props }, ref) => {
    const { agGridProps,containerProps } = useAgGridHelpers();
    return (
      <div
        className={containerProps.className}
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact {...agGridProps} {...props} ref={ref}/>
      </div>
    );
  }
);

export default DataGridDisplay