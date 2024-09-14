import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { spigenAxios } from "@/axiosIntercepter";
import { toast } from "@/components/ui/use-toast";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
}

interface SellInvoiceData {
  channel: string;
  delivery_challan_dt: string;
  so_ship_invoice_id: string;
  client: string;
  client_code: string;
  clientaddress1: string;
  clientaddress2: string;
  billingaddress1: string;
  billingaddress2: string;
  shippingaddress1: string;
  shippingaddress2: string;
}

interface SellShipmentState {
  data: SellInvoiceData[];
  challanDetails: [];
  dataNotes:[];
  ewayBillData:[];
  loading: boolean;
  error: string | null;
}

const initialState: SellShipmentState = {
  data: [],
  challanDetails: [],
  dataNotes: [],
  ewayBillData: [],
  loading: false,
  error: null,
};
interface FetchSellInvoicePayload {
  wise: any;
  data: string;
}

interface CancelPayload {
  remark: string;
  invoice_no: string;
}

interface DebitNote{
  invoice_id: string;
  other_ref: string;
  material:{}
}
export const fetchSalesOrderInvoiceList = createAsyncThunk<
  ApiResponse<any>,
  FetchSellInvoicePayload
>("so_challan_shipment/fetchDeliveryChallan", async (payload) => {
  const response = await spigenAxios.post(
    "so_challan_shipment/fetchDeliveryChallan",
    payload
  );
  return response.data;
});

export const getchallanDetails = createAsyncThunk(
  "so_challan_shipment/getchallanDetails",
  async ({ challan_id }: { challan_id: string }, { rejectWithValue }) => {
    try {
      const response = await spigenAxios.post<any>(
        "/so_challan_shipment/getDeliveryChallanDetails",
        { challan_id: challan_id }
      );

      if (!response.data) {
        throw new Error("No data received");
      }
      // Return the entire response as expected by the fulfilled case
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle error using rejectWithValue
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const printSellInvoice = createAsyncThunk(
  "client/printSellInvoice",
  async ({ so_invoice }: { so_invoice: string }, { rejectWithValue }) => {
    try {
      const response = await spigenAxios.post<any>(
        "/so_challan_shipment/printSellInvoice",
        { so_invoice: so_invoice }
      );

      if (!response.data) {
        throw new Error("No data received");
      }
      // Return the entire response as expected by the fulfilled case
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle error using rejectWithValue
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const cancelInvoice = createAsyncThunk(
  "client/cancelInvoice",
  async (payload: CancelPayload, { rejectWithValue }) => {
    try {
      const response = (await spigenAxios.post<any>(
        "/so_challan_shipment/cancelInvoice",
        payload
      )) as any;

      if (response?.data?.success) {
        toast({
          title: response?.data?.message,
          className: "bg-green-600 text-white items-center",
        });
      } else {
        toast({
          title: response.data.message,
          className: "bg-red-600 text-white items-center",
        });
      }

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createDebitNote = createAsyncThunk(
  "client/createDebitNote",
  async (payload: DebitNote, { rejectWithValue }) => {
    try {
      const response = (await spigenAxios.post<any>(
        "/soEnotes/createDebitNote",
        payload
      )) as any;

      if (response?.data?.success) {
        toast({
          title: response?.data?.message,
          className: "bg-green-600 text-white items-center",
        });
      } else {
        toast({
          title: response.data.message,
          className: "bg-red-600 text-white items-center",
        });
      }

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchDataNotes = createAsyncThunk(
  "so_challan_shipment/fetchDataNotes",
  async ({ sono }: { sono: string }, { rejectWithValue }) => {
    try {
      const response = await spigenAxios.post<any>(
        "/soEnotes/fetchData4Notes",
        { sono: sono }
      );

      if (!response.data) {
        throw new Error("No data received");
      }
      // Return the entire response as expected by the fulfilled case
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle error using rejectWithValue
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchDataForEwayBill = createAsyncThunk(
  "so_challan_shipment/fetchDataForEwayBill",
  async ({ shipment_id }: { shipment_id: string }, { rejectWithValue }) => {
    try {
      const response = await spigenAxios.post<any>(
        "/so_challan_shipment/fetchDataForEwayBill",
        { shipment_id: shipment_id }
      );

      if (!response.data) {
        throw new Error("No data received");
      }
      // Return the entire response as expected by the fulfilled case
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle error using rejectWithValue
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const sellInvoiceSlice = createSlice({
  name: "sellInvoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSalesOrderInvoiceList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesOrderInvoiceList.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.data = action.payload.data;
          state.error = null;
        } else {
          state.error =
            action.payload.message ||
            "Failed to fetch invoice order shipment list";
        }
        state.loading = false;
      })
      .addCase(fetchSalesOrderInvoiceList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch invoice order shipment list";
      })
      .addCase(printSellInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(printSellInvoice.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(printSellInvoice.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false;
      })
      .addCase(cancelInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelInvoice.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancelInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDebitNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDebitNote.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDebitNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getchallanDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getchallanDetails.fulfilled, (state, action) => {
        state.challanDetails = action.payload?.data;
        state.loading = false;
      })
      .addCase(getchallanDetails.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false;
      })
      .addCase(fetchDataNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataNotes.fulfilled, (state, action) => {
        state.dataNotes = action.payload?.data;
        state.loading = false;
      })
      .addCase(fetchDataNotes.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false;
      })
      .addCase(fetchDataForEwayBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataForEwayBill.fulfilled, (state, action) => {
        console.log(action.payload.header)
        state.ewayBillData = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchDataForEwayBill.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false;
      });
  },
});

export default sellInvoiceSlice.reducer;
