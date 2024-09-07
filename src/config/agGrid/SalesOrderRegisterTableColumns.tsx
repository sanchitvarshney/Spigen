import { RowData } from "@/types/SalesOrderRegisterType";
import { ColDef } from "ag-grid-community";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown, Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  cancelSalesOrder,
  createInvoice,
  fetchDataForUpdate,
  fetchSellRequestDetails,
  fetchSellRequestList,
  printSellOrder,
} from "@/features/salesmodule/SalesSlice";
import { useState } from "react";
import MaterialListModal from "@/config/agGrid/registerModule/MaterialListModal";
import { printFunction } from "@/General";

interface ActionMenuProps {
  row: RowData; // Use the RowData type here
}

const ActionMenu: React.FC<ActionMenuProps> = ({ row }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [isMaterialListModalVisible, setIsMaterialListModalVisible] =
    useState(false);
  const [form] = Form.useForm();
  const [invoiceForm] = Form.useForm(); // Form instance for the invoice modal
  const { sellRequestDetails } = useSelector(
    (state: RootState) => state.sellRequest
  );
  const dateRange = useSelector(
    (state: RootState) => state.sellRequest.dateRange
  );

  const handleUpdate = (row: any) => {
    const soId = row?.req_id; // Replace with actual key for employee ID
    window.open(`/sales/order/update/${soId.replaceAll("/", "_")}`, "_blank");
    dispatch(fetchDataForUpdate({ clientCode: soId }));
  };

  const showCancelModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMaterialListModalClose = () =>
    setIsMaterialListModalVisible(false);

  const handleshowMaterialList = (row: RowData) => {
    dispatch(fetchSellRequestDetails({ req_id: row.req_id }));
    setIsMaterialListModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          remark: values.remark,
          so: row.req_id,
        };
        dispatch(cancelSalesOrder(payload));
        setIsModalVisible(false);
        form.resetFields(); // Clear the form fields after submission
        dispatch(
          fetchSellRequestList({ wise: "DATE", data: dateRange }) as any
        );
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };
  const showInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
  };
  const handleInvoiceModalOk = () => {
    invoiceForm
      .validateFields()
      .then((values) => {
        const payload = {
          bill_id: row.bill_id,
          client_addr_id: values.client_addr_id,
          client_id: row.customer_code,
          invoice_no: values.invoice_no,
          nos_of_boxes: values.nos_of_boxes,
          remark: values.remark,
          shipment_id: [row.req_id],
          so_id: [row.req_id],
        };
        dispatch(createInvoice(payload));
        setIsInvoiceModalVisible(false);
        dispatch(
          fetchSellRequestList({ wise: "DATE", data: dateRange }) as any
        );
        invoiceForm.resetFields();
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  const handleInvoiceModalCancel = () => {
    setIsInvoiceModalVisible(false);
  };

  const handlePrintOrder = async (orderId: string) => {
    dispatch(printSellOrder({ so_id: orderId })).then((response: any) => {
      console.log(response, "print");
      if (response?.payload?.success) {
        printFunction(response?.payload?.data.buffer.data);
      }
    });
  };

  const isDisabled = row.hasInvoice === true || row.status === "Cancelled";

  const menu = (
    <Menu>
      <Menu.Item
        key="update"
        onClick={() => handleUpdate(row)}
        disabled={isDisabled}
      >
        Update
      </Menu.Item>
      <Menu.Item key="cancel" onClick={showCancelModal} disabled={isDisabled}>
        Cancel
      </Menu.Item>
      <Menu.Item key="materialList" onClick={() => handleshowMaterialList(row)}>
        Material List
      </Menu.Item>
      <Menu.Item
        key="createInvoice"
        onClick={showInvoiceModal}
        disabled={isDisabled}
      >
        Create Invoice
      </Menu.Item>
      <Menu.Item key="print" onClick={() => handlePrintOrder(row?.req_id)}>
        Print
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
      <Modal
        title="Confirm Cancellation"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        width={600} // Adjust modal width as needed
      >
        <Form form={form} layout="vertical">
          <p>Are you sure you want to cancel this SO {row.req_id}?</p>
          <Form.Item
            name="remark"
            label="Remarks"
            rules={[{ required: true, message: "Please enter remarks!" }]}
          >
            <Input.TextArea
              rows={4} // Increase the number of rows for larger input area
              placeholder="Enter remarks here"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Create Invoice"
        open={isInvoiceModalVisible}
        onOk={handleInvoiceModalOk}
        onCancel={handleInvoiceModalCancel}
        okText="Yes"
        cancelText="No"
        width={600}
      >
        <Form form={invoiceForm} layout="vertical">
          <p className="pb-5 text-[18px]">
            Are you sure you want to create an invoice for SO {row.req_id}?
          </p>
          <Form.Item
            name="nos_of_boxes"
            label="Number of Boxes (will be displayed in the print sheet)"
            rules={[
              { required: true, message: "Please enter the number of boxes!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="invoice_no"
            label="Invoice Number"
            rules={[
              { required: true, message: "Please enter the invoice number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <MaterialListModal
        visible={isMaterialListModalVisible}
        onClose={handleMaterialListModalClose}
        sellRequestDetails={sellRequestDetails}
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
  { headerName: "#", valueGetter: "node.rowIndex + 1", maxWidth: 50 },
  { headerName: "SO ID", field: "req_id", filter: "agTextColumnFilter" },
  { headerName: "Status", field: "status", filter: "agTextColumnFilter" },
  {
    headerName: "Customer Code",
    field: "customer_code",
    filter: "agTextColumnFilter",
  },
  { headerName: "Channel", field: "channel", filter: "agTextColumnFilter" },
  {
    headerName: "Customer Name",
    field: "channel",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Created By",
    field: "create_by",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Created Date",
    field: "create_dt",
    filter: "agTextColumnFilter",
  },
];
