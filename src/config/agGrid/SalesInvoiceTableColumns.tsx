import { RowData } from "@/types/SalesInvoiceTypes";
import { ColDef } from "ag-grid-community";
import { Button, Dropdown, Form, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cancelInvoice, fetchSalesOrderInvoiceList, getchallanDetails, printSellInvoice } from "@/features/salesmodule/salesInvoiceSlice";
import { AppDispatch, RootState } from "@/store";
import { useState } from "react";
import ViewInvoiceModal from "@/config/agGrid/invoiceModule/ViewInvoiceModal";
import { printFunction } from "@/General";
import { ConfirmCancellationDialog } from "@/config/agGrid/registerModule/ConfirmCancellationDialog";

const ActionMenu: React.FC<any> = ({ row }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [viewInvoice , setViewInvoice] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { challanDetails }:any = useSelector(
    (state: RootState) => state.sellInvoice
  );
  const dateRange = useSelector(
    (state: RootState) => state.sellRequest.dateRange
  );

  const handleViewInvoice = (row:any) => {
    dispatch(getchallanDetails({ challan_id: row.so_ship_invoice_id }))
    setViewInvoice(true);
  };

  const handlePrintInvoice = async (orderId: string) => {
    dispatch(printSellInvoice({ so_invoice: orderId })).then((response: any) => {
      if (response?.payload?.success) {
        printFunction(response?.payload?.data.buffer.data);
      }
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          remark: values.remark,
          invoice_no: row.so_ship_invoice_id,
        };
        dispatch(cancelInvoice(payload));
        setCancelModalVisible(false);
        form.resetFields(); // Clear the form fields after submission
        dispatch(
          fetchSalesOrderInvoiceList({ wise: "datewise", data: dateRange }) as any
        );
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  const isDisabled = row.hasInvoice === true || row.status === "Cancelled";

  const menu = (
    <Menu>
      <Menu.Item
        key="update"
        onClick={()=>handleViewInvoice(row)}
        disabled={isDisabled}
      >
        View
      </Menu.Item>
      <Menu.Item key="cancel" disabled={isDisabled} onClick={()=>handlePrintInvoice(row?.so_ship_invoice_id)}>
        Download
      </Menu.Item>
      <Menu.Item key="materialList" onClick={()=> setCancelModalVisible(true)} disabled={row?.isEwayBill == "Y" || row?.isEInvoice == "Y"}>
        Cancel
      </Menu.Item>
      <Menu.Item
        key="createInvoice"
        // onClick={console.log(row)}
        disabled={isDisabled}
      >
        Debit Note
      </Menu.Item>
      <Menu.Item key="print" onClick={() => console.log(row?.req_id)}>
        Credit Note
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
      <ViewInvoiceModal visible={viewInvoice} onClose={() => setViewInvoice(false)} sellRequestDetails={challanDetails} />
      <ConfirmCancellationDialog
        isDialogVisible={cancelModalVisible}
        handleOk={handleOk}
        handleCancel={() => setCancelModalVisible(false)}
        row={{req_id:row.so_ship_invoice_id}}
        form={form}
        module="Invoice"
      />
    </>
  );
};

export default ActionMenu;

export const columnDefs: ColDef<RowData>[] = [
  {
    headerName: "Actions",
    maxWidth: 100,
    cellRenderer: (params: any) => <ActionMenu row={params.data} />,
  },

  { headerName: "S.No.", valueGetter: "node.rowIndex + 1", maxWidth: 50 },
  { headerName: "SO ID", field: "so_id", filter: "agNumberColumnFilter" },
  {
    headerName: "Date",
    field: "delivery_challan_dt",
    filter: "agDateColumnFilter",
  },
  { headerName: "Channel", field: "channel", filter: "agDateColumnFilter" },
  {
    headerName: "Invoice Number",
    field: "so_ship_invoice_id",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Bill To Code",
    field: "client_code",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Bill To",
    field: "shipToName",
    filter: "agTextColumnFilter",
    width: 400,
  },
  {
    headerName: "EwayBill Created",
    field: "isEwayBill",
    valueGetter: (params) => (params?.data?.isEwayBill === "N" ? "No" : "Yes"),
  },
  {
    headerName: "EInvoice Created",
    field: "isEInvoice",
    valueGetter: (params) => (params?.data?.isEInvoice === "N" ? "No" : "Yes"),
  },
];
