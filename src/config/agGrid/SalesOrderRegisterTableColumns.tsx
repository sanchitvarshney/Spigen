import { RowData } from "@/types/SalesOrderRegisterType";
import { ColDef } from "ag-grid-community";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Menu, Dropdown, Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  cancelSalesOrder,
  fetchDataForUpdate,
  fetchSellRequestDetails,
} from "@/features/salesmodule/SalesSlice";
import { useState } from "react";
import MaterialListModal from "@/config/agGrid/registerModule/MaterialListModal";

interface ActionMenuProps {
  row: RowData; // Use the RowData type here
}

const ActionMenu: React.FC<ActionMenuProps> = ({ row }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMaterialListModalVisible, setIsMaterialListModalVisible] =
    useState(false);
  const [form] = Form.useForm();
  const { sellRequestDetails } = useSelector(
    (state: RootState) => state.sellRequest
  );
  
console.log(sellRequestDetails,"rr")
  const handleUpdate = (row: any) => {
    const soId = row.req_id; // Replace with actual key for employee ID
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
  const data = useSelector((state: RootState) => state);
  console.log(data.sellRequest);
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
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key="update" onClick={() => handleUpdate(row)}>
        Update
      </Menu.Item>
      <Menu.Item key="cancel" onClick={showCancelModal}>
        Cancel
      </Menu.Item>
      <Menu.Item key="print" onClick={() => handleshowMaterialList(row)}>
        Material List
      </Menu.Item>
      <Menu.Item key="createInvoice" onClick={() => console.log("print", row)}>
        Create Invoice
      </Menu.Item>
      <Menu.Item key="otherAction" onClick={() => console.log("print", row)}>
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
      <MaterialListModal
        visible={isMaterialListModalVisible}
        onClose={handleMaterialListModalClose}
        sellRequestDetails={sellRequestDetails}
      />
    </>
  );
};
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
