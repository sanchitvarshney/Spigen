import { Dialog, DialogContent } from "@/components/ui/dialog";
import ExcelImportButton from "@/config/agGrid/ExcelImportButton";
import { Props } from "@/types/AddPOTypes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const AddPOPopovers: React.FC<Props> = ({ uiState }) => {
  const {
    excelModel,
    setExcelModel,
    setRowData,
    resetModel,
    setResetModel,
    backModel,
    setBackModel,
  } = uiState;
  const navigate = useNavigate();

  const handleImport = (data: any) => {
    //map data from excel
    const mappedData = data.data.map((item: any) => ({
      type: item.item_type,
      material: item.item,
      materialDescription: item.item_desc,
      asinNumber: item.asin === "." ? undefined : item.asin,
      orderQty: Number(item.qty),
      rate: Number(item.rate),
      currency: item.currency,
      gstRate: Number(item.gst_rate),
      dueDate: item.due_date,
      hsnCode: item.hsn,
      isNew: true,
    }));
    // Set the response data in the table
    setRowData((prevRowData) => {
      if (prevRowData.length === 1 && prevRowData[0].material === "") {
        return mappedData;
      } else {
        return [...prevRowData, ...mappedData];
      }
    });

    setExcelModel(false);
  };

  return (
    <div>
      {/* excel upload model =============*/}
      <Dialog open={excelModel} onOpenChange={setExcelModel}>
        <DialogContent className="grid grid-cols-2 min-w-[1000px] px-[50px] py-[100px]">
          <div>
            <ExcelImportButton onImport={handleImport} />
          </div>
          <div>
            <h2 className="text-[16px] font-[600] text-slate-600">
              Instructions
            </h2>
            <ol className="text-slate-500 text-[14px] ml-[10px] list-decimal">
              <li> Don't Edit columns colored as red.</li>
              <li>Don't change order of columns.</li>
              <li>Custom Fields columns with bold headers are mandatory.</li>
              <li>
                In unit column, just enter unit name, and that should exactly
                match with the product units. (eg. for Litre, 'litre' is
                incorrect).
              </li>
              <li>
                In unit column, just enter unit name, and that should exactly
                match with the product units. (eg. for Litre, 'litre' is
                incorrect).
              </li>
              <li>
                To apply absolute discount in document currency, keep 'Discount
                Type' column blank, whereas to apply percentage discount enter
                '%' in 'Discount Type' column.
              </li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>
      {/* excel upload model =============*/}

      {/* go back model ======================= */}
      <AlertDialog open={backModel} onOpenChange={setBackModel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-600">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="shadow-slate-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="shadow bg-cyan-700 hover:bg-cyan-800 shadow-slate-500"
              onClick={() => navigate("/create-po")}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* go back model ======================= */}

      {/* reset confarmation model ====================*/}
      <AlertDialog open={resetModel} onOpenChange={setResetModel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-600">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-700 shadow hover:bg-red-600 shadow-slate-500"
              onClick={() => setRowData([])}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* reset confarmation model ====================*/}
    </div>
  );
};

export default AddPOPopovers;
