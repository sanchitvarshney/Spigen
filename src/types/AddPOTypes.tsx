import { RowData2 } from "@/data";
import { Dispatch, SetStateAction } from "react";
export interface AddPoUIStateType {
  excelModel: boolean;
  setExcelModel: Dispatch<SetStateAction<boolean>>;
  setRowData: Dispatch<SetStateAction<RowData2[]>>;
  backModel: boolean;
  setBackModel: Dispatch<SetStateAction<boolean>>;
  resetModel: boolean;
  setResetModel: Dispatch<SetStateAction<boolean>>;
}

export interface Props {
  uiState: AddPoUIStateType;
}
