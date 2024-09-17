import { RowData } from "@/types/SalesEtransactionTypes";
import { ColDef } from "ag-grid-community";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Menu } from "antd";
import { useState } from "react";
import { ConfirmCancellationDialog } from "@/config/agGrid/registerModule/ConfirmCancellationDialog";
import { cancelEInvoice } from "@/features/salesmodule/salesTransactionSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { toast } from "@/components/ui/use-toast";
import { printFunction } from "@/General";
import { printSellInvoice } from "@/features/salesmodule/salesInvoiceSlice";

const ActionMenu: React.FC<any> = ({ row }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handlePrintInvoice = async (orderId: string) => {
    console.log(orderId);
    dispatch(
      printSellInvoice({ so_invoice: orderId, printInvType: "Original" })
    ).then((response: any) => {
      if (response?.payload?.success) {
        printFunction(response?.payload?.data.buffer.data);
      } else {
        toast({
          title: response?.payload || "Print failed",
          className: "bg-red-600 text-white items-center",
        });
      }
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const payload: any = {
          invoice_no: row?.invoiceNo,
          irn: row?.irnno,
          cancellReason: values.reason,
          remark: values.remark,
        };
        console.log(payload);
        dispatch(cancelEInvoice(payload)).then((response: any) => {
          if (response?.payload?.success) {
            toast({
              title: response?.message || "Cancelled successfully",
              className: "bg-green-600 text-white items-center",
            });
          } else {
            toast({
              title: response?.message || "Cancelled failed",
              className: "bg-red-600 text-white items-center",
            });
          }
        });
        setCancelModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="cancel"
        onClick={() => setCancelModalVisible(true)}
        disabled={row.eInvoice_status == "CANCELLED"}
      >
        Cancel
      </Menu.Item>
      <Menu.Item key="print" onClick={() => handlePrintInvoice(row?.invoiceNo)}>
        Print
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
      <ConfirmCancellationDialog
        isDialogVisible={cancelModalVisible}
        handleOk={handleOk}
        handleCancel={() => setCancelModalVisible(false)}
        row={{ req_id: row?.invoiceNo }}
        form={form}
        module="E-Invoice"
      />
    </>
  );
};

export default ActionMenu;

export const TruncateCellRenderer = (props: any) => {
  const style = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%", // Ensure the width of the cell
    display: "block", // Ensure that the content respects the overflow
  };

  return <div style={style}>{props.value}</div>;
};

export const columnDefs: ColDef<RowData>[] = [
  {
    headerName: "Actions",
    maxWidth: 100,
    cellRenderer: (params: any) => <ActionMenu row={params.data} />,
  },
  { headerName: "#", valueGetter: "node.rowIndex + 1", maxWidth: 50 },
  {
    headerName: "Status",
    field: "eInvoice_status",
    filter: "agDateColumnFilter",
    cellRenderer: "truncateCellRenderer",
    maxWidth: 100,
  },
  {
    headerName: "SO Id",
    field: "so_no",
    filter: "agDateColumnFilter",
    cellRenderer: "truncateCellRenderer",
    maxWidth: 100,
  },
  {
    headerName: "Invoice Date",
    field: "eInvoiceDate",
    filter: "agDateColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "Invoice Number",
    field: "invoiceNo",
    filter: "agTextColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "Bill To Name",
    field: "billToName",
    filter: "agTextColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "Bill To",
    field: "billTo",
    filter: "agTextColumnFilter",
    width: 400,
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "Ack No",
    field: "eInvoiceNo",
    filter: "agTextColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "Ack Date",
    field: "eInvoiceDate",
    filter: "agDateColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "IRN Number",
    field: "irnno",
    filter: "agTextColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "Bill From Address",
    field: "billFromAddress",
    width: 400,
    filter: "agTextColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
  {
    headerName: "Shipping Address",
    field: "shippingaddress2",
    width: 400,
    filter: "agTextColumnFilter",
    cellRenderer: "truncateCellRenderer",
  },
];
