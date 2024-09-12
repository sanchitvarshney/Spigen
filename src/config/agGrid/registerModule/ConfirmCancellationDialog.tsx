import { Button, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Ensure this path is correct

interface ConfirmCancellationDialogProps {
  isDialogVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  row: {
    req_id: string;
  };
  form: FormInstance;
  module?: string
}

export function ConfirmCancellationDialog({
  isDialogVisible,
  handleOk,
  handleCancel,
  row,
  form,
  module
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
        <Form form={form} layout="vertical">
          <p> Are you sure you want to cancel this {module ? module : "SO"} {row.req_id}?</p>
          <Form.Item
            name="remark"
            label="Remarks"
            rules={[{ required: true, message: "Please enter remarks!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter remarks here" />
          </Form.Item>
        </Form>
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
