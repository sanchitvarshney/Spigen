import { spigenAxios } from "@/axiosIntercepter";
import { processResponse } from "@/helper/processResponse";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Payload {
    wise:string;
    data:string

}
export interface FetchDataArgs {
  endpoint: string;
  payload:Payload
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
}

// Define the argument type for the thunk
export const fetchTableData = createAsyncThunk<
  ApiResponse<any[]>, // Return type
  FetchDataArgs // Argument type
>(
  "data/fetchData",
  async ({ endpoint,payload }: FetchDataArgs) => {
    const response = await spigenAxios.post(endpoint,payload);
    return processResponse(response.data);
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [] as any[], // Specify the type of data
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTableData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTableData.fulfilled, (state, action) => {
      state.data = action.payload.data; // Access the data property from ApiResponse
      state.loading = false;
     
    });
    builder.addCase(fetchTableData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default dataSlice.reducer;
