import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { spigenAxios } from "@/axiosIntercepter";

interface SellRequestPayload {
  headers: {
    channel: string;
    customer: string;
    customer_branch: string;
    customer_address1: string;
    customer_address2: string;
    customer_gstin: string;
    bill_id: string;
    billing_address1: string;
    billing_address2: string;
    isSameClientAdd: string;
    shipping_id: string;
    shipping_address1: string;
    shipping_address2: string;
    shipping_pinCode: string;
    [key: string]: any; 
  };
  materials: {
    items: string[];
    qty: number[];
    price: number[];
    gst_rate: number[];
    so_type: string[];
    hsn: string[];
    cgst: number[];
    sgst: number[];
    igst: number[];
    gst_type: string[];
    currency: string[];
    exchange_rate: number[];
    due_date: string[];
    remark: string[];
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
}

export const createSellRequest = createAsyncThunk<
  ApiResponse<any>,
  { endpoint: string; payload: SellRequestPayload }
>("/sellRequest/createSellRequest", async ({ endpoint, payload }) => {
  const response = await spigenAxios.post(endpoint, payload);
  return response.data;
});

interface SellRequestState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SellRequestState = {
  data: [],
  loading: false,
  error: null,
};


const sellRequestSlice = createSlice({
  name: "sellRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(createSellRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSellRequest.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createSellRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create sell request";
      });
  },
});

export default sellRequestSlice.reducer;
