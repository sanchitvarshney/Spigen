import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MaterialListModalProps {
  visible: boolean;
  onClose: () => void;
  sellRequestDetails: any[];
}

const MaterialListModal: React.FC<MaterialListModalProps> = ({
  visible,
  onClose,
  sellRequestDetails,
}) => {
  const columnDefs: ColDef[] = [
    { headerName: "#", valueGetter: "node.rowIndex + 1", maxWidth: 50 },
    { headerName: "Item Type", field: "so_type" },
    { headerName: "Item Name", field: "item_name", width: 500 },
    { headerName: "Item Details", field: "item_details" },
    { headerName: "SKU Code", field: "item_code" },
    { headerName: "Qty", field: "qty" },
    { headerName: "UoM", field: "unit" },
    { headerName: "GST Rate", field: "gst_rate" },
    { headerName: "Price", field: "price" },
    { headerName: "HSN SAC", field: "hsn_sac" },
    { headerName: "Remark", field: "remark" },
  ];

  return (
    <Sheet open={visible} onOpenChange={onClose}>
      <SheetHeader></SheetHeader>
      <SheetContent side={"bottom"}>
        <SheetTitle>Material List of</SheetTitle>
        <div className="ag-theme-quartz h-[calc(100vh-140px)]">
          <AgGridReact
            rowData={sellRequestDetails}
            columnDefs={columnDefs}
            pagination={true}
            suppressCellFocus={true}
          />
        </div>
      </SheetContent>
      <SheetFooter></SheetFooter>
    </Sheet>
  );
};

export default MaterialListModal;
