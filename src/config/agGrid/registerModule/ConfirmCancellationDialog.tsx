import { Button, Form, Input, Select } from "antd";
import { FormInstance } from "antd/lib/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Ensure this path is correct
const { Option } = Select;

interface ConfirmCancellationDialogProps {
  isDialogVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  row: {
    req_id: string;
  };
  form: FormInstance;
  module?: string;
}

export function ConfirmCancellationDialog({
  isDialogVisible,
  handleOk,
  handleCancel,
  row,
  form,
  module,
}: ConfirmCancellationDialogProps) {
  return (
    <Dialog open={isDialogVisible} onOpenChange={handleCancel}>
      <DialogContent
        className="min-w-[800px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Confirm Cancellation</DialogTitle>
        </DialogHeader>
        {module === "E-Invoice" ? (
           <Form
           form={form}
           layout="vertical"
           
         >
           <p> Are you sure you want to cancel this E-Invoice {row.req_id}?</p>
           <Form.Item
             name="remark"
             label="Remark"
             rules={[{ required: true, message: "Please select a Remark" }]}
           >
             <Select placeholder="Select a reason" allowClear>
               <Option value="1">Order Cancelled</Option>
               <Option value="2">Duplicate</Option>
               <Option value="3">Data Entry Mistake</Option>
               <Option value="4">Others</Option>
             </Select>
           </Form.Item>
           <Form.Item
             name="reason"
             label="Reasons for Cancellation"
             rules={[{ required: true, message: "Please enter Reason!" }]}
           >
             <Input.TextArea rows={4} placeholder="Enter reason here" style={{ height: 120, resize: 'none' }} />
           </Form.Item>
          </Form>
        ) : (
          <Form form={form} layout="vertical">
            <p>
              {" "}
              Are you sure you want to cancel this {module ? module : "SO"}{" "}
              {row.req_id}?
            </p>
            <Form.Item
              name="remark"
              label="Remarks"
              rules={[{ required: true, message: "Please enter remarks!" }]}
            >
              <Input.TextArea rows={4} placeholder="Enter remarks here" />
            </Form.Item>
          </Form>
        )}
        <DialogFooter>
          <Button type="default" onClick={handleCancel} className="mr-2">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}