import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "antd";
import { ColDef } from "ag-grid-community";

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
    { headerName: "Item Name", field: "item_name" ,maxWidth:800},
    { headerName: "Item Details", field: "item_details" },
    { headerName: "SKU Code", field: "item_code" },
    { headerName: "Qty", field: "qty" },
    { headerName: "UoM", field: "unit" },
    { headerName: "GST Rate", field: "gst_rate"},
    { headerName: "Price", field: "price" },
    { headerName: "HSN SAC", field: "hsn_sac" },
    { headerName: "Remark", field: "remark" },
  ];

  return (
    <Modal
      title="Material List"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={2000} // Adjust modal width as needed
      height={400}
    >
      <div className="ag-theme-quartz h-[calc(100vh-140px)]">
        <AgGridReact
          rowData={sellRequestDetails}
          columnDefs={columnDefs}
          pagination={true}
          suppressCellFocus={true}
        />
      </div>
    </Modal>
  );
};

export default MaterialListModal;
