import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import columnDefs, { RowData } from "@/config/agGrid/SalseOrderCreateTableColumns";
import DebitTextInputCellRenderer from "@/config/agGrid/invoiceModule/DebitTextInputCellRenderer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchcurrency } from "@/features/salesmodule/createSalesOrderSlice";

interface Item {
    item_value: number;
    cgst: string;
    sgst: string;
    igst: string;
    item_part_no?: string;
    item_name?: string;
    orderqty?: number;
    rate?: number;
    localValue?: number;
  }

interface DebitNoteProps {
  visible: boolean;
  onClose: () => void;
  sellRequestDetails: any;
}

const DebitNote: React.FC<DebitNoteProps> = ({
  visible,
  onClose,
  sellRequestDetails,
}) => {
  // const columnDefs: ColDef[] = [
  //   { headerName: "#", valueGetter: "node.rowIndex + 1", maxWidth: 50 },
  //   { headerName: "Invoice Number", field: "so_id" },
  //   { headerName: "Shipment Id", field: "shipment_id" },
  //   { headerName: "Part Code", field: "item_part_no" },
  //   {
  //     headerName: "Component",
  //     field: "item_name",
  //     width: 500,
  //     cellStyle: cellStyle,
  //   },
  //   { headerName: "Qty", field: "item_qty" },
  //   { headerName: "Rate", field: "item_rate" },
  // ];
  const [rowData, setRowData] = useState<RowData[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const itemCGSTs = sellRequestDetails?.materials?.map(
    (item:Item) => parseFloat(item.cgst) || 0
  );
  const itemSGSTs = sellRequestDetails?.materials?.map(
    (item:Item) => parseFloat(item.sgst) || 0
  );
  const itemIGSTs = sellRequestDetails?.materials?.map(
    (item:Item) => parseFloat(item.igst) || 0
  );

  const totalValue = sellRequestDetails?.materials?.reduce(
    (acc: number, item: Item) => {
      const orderQty = item.orderqty ?? 0; // Use default value 0 if undefined
      const rate = item.rate ?? 0; // Use default value 0 if undefined
      return acc + (orderQty * rate);
    },
    0
  );
  const totalCGST = itemCGSTs?.reduce((acc:number, value:number) => acc + value, 0);
  const totalSGST = itemSGSTs?.reduce((acc:number, value:number) => acc + value, 0);
  const totalIGST = itemIGSTs?.reduce((acc:number, value:number) => acc + value, 0);
console.log(rowData)

useEffect(() => {

  const updatedData: RowData[] = sellRequestDetails?.materials?.map((material: any) => (
    {
    type: material.so_type?.value || "product",
    items: material.item_code || "",
    material: material.selectedItem?.[0].id || "",
    materialDescription: material.item_deatils || "",
    rate: parseFloat(material.rate) || 0,
    orderQty: material.orderqty || 1,
    currency: material.currency || "364907247",
    gstType: material.gsttype?.[0]?.id || "I",
    localValue:material.exchangetaxablevalue,
    foreignValue: parseFloat(material.exchangerate) || 0,
    cgst: parseFloat(material.cgst) || 0,
    sgst: parseFloat(material.sgst) || 0,
    igst: parseFloat(material.igst) || 0,
    dueDate: material.due_date || "",
    hsnCode: material.hsncode || "",
    remark: material.remark || "",
    gstRate:material?.gstrate || 0,
    updateid:material?.updateid || 0,
    isNew: true,
  }));
  setRowData(updatedData);
}, [sellRequestDetails]);

const { currency } = useSelector(
  (state: RootState) => state.createSalesOrder
);

const components = useMemo(
  () => ({
    textInputCellRenderer: (props: any) => (
      <DebitTextInputCellRenderer
        {...props}
        currency={currency}
        setRowData={setRowData}
      />
    ),
    // datePickerCellRenderer: DatePickerCellRenderer,
    // statusCellRenderer: StatusCellRenderer,
  }),
  []
);

useEffect(() => {
  dispatch(fetchcurrency());
}, []);

console.log(rowData,currency)
  return (
    <Sheet open={visible} onOpenChange={onClose}>
      <SheetHeader></SheetHeader>
      <SheetContent side={"bottom"}>
        <SheetTitle>
        Create Debit Note of {sellRequestDetails?.header?.invoiceNo}
        </SheetTitle>
        <div className="ag-theme-quartz h-[calc(100vh-140px)] grid grid-cols-4 gap-4">
          <div className="col-span-1 max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-800 scrollbar-track-gray-300 bg-white border-r flex flex-col gap-4 p-4">
            <Card className="rounded-sm shadow-sm shadow-slate-500">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#e0f2f1]">
                <CardTitle className="font-[550] text-slate-600">
                  Bill To Detail
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4 flex flex-col gap-4 text-slate-600">
                <h3 className="font-[600]">Client</h3>
                <p className="text-[14px]">{sellRequestDetails?.client?.[0]?.clientname||"--"}</p>
                <h3 className="font-[600]">Branch</h3>
                <p className="text-[14px]">{sellRequestDetails?.client?.[0]?.clientbranch?.label||"--"}</p>
                <h3 className="font-[600]">Address</h3>
                <p className="text-[14px]">
                  {sellRequestDetails?.client?.[0]?.clientaddress1|| "" + sellRequestDetails?.client?.[0]?.clientaddress2||"--"}
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-sm shadow-sm shadow-slate-600">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#e0f2f1]">
                <CardTitle className="font-[550] text-slate-600">
                  Bill From
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4 flex flex-col gap-4 text-slate-500">
                <h3 className="font-[600]">Address</h3>
                <p className="text-[14px]">
                  {sellRequestDetails?.bill?.billaddress1 || "" + sellRequestDetails?.bill?.billaddress2}
                </p>
                <ul>
                  <li className="grid grid-cols-[1fr_150px] mt-4">
                    <div>
                      <h3 className="font-[600]">PinCode</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">{sellRequestDetails?.bill?.billpin||"--"}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_150px] mt-4">
                    <div>
                      <h3 className="font-[600]">GST</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">{sellRequestDetails?.bill?.billgstid}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_150px] mt-4">
                    <div>
                      <h3 className="font-[600]">PAN</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">{sellRequestDetails?.bill?.billpanno}</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-sm shadow-sm shadow-slate-500">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#e0f2f1]">
                <CardTitle className="font-[550] text-slate-600">
                  Ship To
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4 flex flex-col gap-4 text-slate-600">
                <h3 className="font-[600]">Address</h3>
                <p className="text-[14px]">
                  {sellRequestDetails?.ship?.addrshipname}
                </p>
                <ul>
                  <li className="grid grid-cols-[1fr_150px] mt-4">
                    <div>
                      <h3 className="font-[600]">PinCode</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">{sellRequestDetails?.ship?.pin}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_150px] mt-4">
                    <div>
                      <h3 className="font-[600]">GST</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">{sellRequestDetails?.ship?.shipgstid}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_150px] mt-4">
                    <div>
                      <h3 className="font-[600]">PAN</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">{sellRequestDetails?.ship?.shippanno}</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-sm shadow-sm shadow-slate-500">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#e0f2f1]">
                <CardTitle className="font-[550] text-slate-600">
                  Tax Detail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-600">
                  <ul>
                    <li className="grid grid-cols-[1fr_150px] mt-4">
                      <div>
                        <h3 className="font-[600]">
                          Sub-Total value before Taxes :
                        </h3>
                      </div>
                      <div>
                        <p className="text-[14px]">{totalValue?.toFixed(2)}</p>
                      </div>
                    </li>
                    <li className="grid grid-cols-[1fr_150px] mt-4">
                      <div>
                        <h3 className="font-[600]">CGST :</h3>
                      </div>
                      <div>
                        <p className="text-[14px]">
                          (+){totalCGST?.toFixed(2)}
                        </p>
                      </div>
                    </li>
                    <li className="grid grid-cols-[1fr_150px] mt-4">
                      <div>
                        <h3 className="font-[600]">SGST :</h3>
                      </div>
                      <div>
                        <p className="text-[14px]">
                          (+){totalSGST?.toFixed(2)}
                        </p>
                      </div>
                    </li>
                    <li className="grid grid-cols-[1fr_150px] mt-4">
                      <div>
                        <h3 className="font-[600]">ISGST :</h3>
                      </div>
                      <div>
                        <p className="text-[14px]">
                          (+){totalIGST?.toFixed(2)}
                        </p>
                      </div>
                    </li>
                    <li className="grid grid-cols-[1fr_150px] mt-4">
                      <div>
                        <h3 className="font-[600] text-cyan-600">
                          Sub-Total values after Taxes :
                        </h3>
                      </div>
                      <div>
                        <p className="text-[14px]">
                          {(
                            totalValue +
                            totalCGST +
                            totalSGST +
                            totalIGST
                          )?.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs as (ColDef | ColGroupDef)[]}
              pagination={true}
              suppressCellFocus={true}
              components={components}
            />
          </div>
        </div>
      </SheetContent>
      <SheetFooter></SheetFooter>
    </Sheet>
  );
};

export default DebitNote;

// const cellStyle = {
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
// };
