import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { spigenAxios } from "@/axiosIntercepter";

interface ClientPayload {
    clientName:string,
    panNo:string,
    mobileNo:string,
    email:string,
    website:string,
    salesPersonName:string,
}


export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
}



export const createClient = createAsyncThunk<
  ApiResponse<any>,
  { endpoint: string; payload:ClientPayload }
>("/client/add", async ({ endpoint, payload }) => {
  const response = await spigenAxios.post(endpoint, payload);
  return response.data;
});


interface clientState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: clientState = {
  data: [],
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      // Handle createProduct action
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
      })
     
  },
});

export default clientSlice.reducer;
