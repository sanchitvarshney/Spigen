import { Button, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Ensure this path is correct

interface CreateInvoiceDialogProps {
  isDialogVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  row: {
    req_id: string;
  };
  form: FormInstance;
}

export function CreateInvoiceDialog({
  isDialogVisible,
  handleOk,
  handleCancel,
  row,
  form,
}: CreateInvoiceDialogProps) {
  return (
    <Dialog open={isDialogVisible} onOpenChange={handleCancel}>
      <DialogContent
        className="min-w-[600px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <Form form={form} layout="vertical">
          <p className="pb-5 text-[18px]">
            Are you sure you want to create an invoice for SO {row.req_id}?
          </p>
          <Form.Item
            name="nos_of_boxes"
            label="Number of Boxes"
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
