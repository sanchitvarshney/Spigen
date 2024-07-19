import React, { useMemo, useCallback, useState, useEffect } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "@ag-grid-community/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTableData } from "@/features/agGrid/aggridSlice";
import CustomLoadingCellRenderer from "@/config/agGrid/CustomLoadingCellRenderer";
import { TransformFunction } from "@/helper/TableTransformation";

interface Payload {
  wise: string;
  data: string;
}

interface GridTableProps {
  endpoint: string;
  columns: ColDef[];
  payload: Payload;
  transform: TransformFunction;
}

const ReusableTable: React.FC<GridTableProps> = ({ endpoint, columns, payload, transform }) => {
  const [rowData, setRowData] = useState<any[] | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.aggrid.data);
  const loading = useSelector((state: RootState) => state.aggrid.loading);
  
  const defaultColDef = useMemo<ColDef>(
    () => ({
      editable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
    }),
    []
  );

  const onGridReady = useCallback(
    () => {
      dispatch(fetchTableData({ endpoint, payload }));
    },
    [dispatch, endpoint, payload]
  );

  useEffect(() => {
    if (loading) {
      setRowData(null);
    } else {
      if (data) {
        setRowData(transform(data));
      }
    }
  }, [data, loading, transform]);

  console.log(loading, rowData);

  return (
    <div>
      <div className="w-full h-[500px] ag-theme-quartz">
        <AgGridReact
          components={{ customLoadingCellRenderer: CustomLoadingCellRenderer }}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowData={rowData}
          loadingCellRenderer="customLoadingCellRenderer" // Use the name registered for custom renderer
          loadingCellRendererParams={CustomLoadingCellRenderer}
          rowModelType="clientSide"
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default ReusableTable;
