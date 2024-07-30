import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { spigenAxios } from "@/axiosIntercepter";

interface ProductPayload {
  p_name?: string;
  p_sku?: string;
  units_id?: string;
  producttKey?: string; 
  product_name?: string;
  hsn?: string;
  jobworkcost?: number;
  labourcost?: number;
  packingcost?: number;
  othercost?: number;
  minstock?: number;
  batchstock?: number;
  category?: string;
  mrp?: number;
  brand?: string;
  ean?: string;
  weight?: number;
  vweight?: number;
  height?: number;
  width?: number;
  minstockrm?: number;
  producttype?: string;
  isenabled?: boolean;
  gsttype?: string;
  gstrate?: number;
  location?: string;
  description?: string;
  uom?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
}

export const fetchProducts = createAsyncThunk<
  ApiResponse<any>,
  string
>("/products", async (endpoint) => {
  const response = await spigenAxios.get(endpoint);
  return response.data;
});


export const fetchProductForUpdate = createAsyncThunk<
  ApiResponse<any>,
  { endpoint: string; product_key: string }
>("/products/getProductForUpdate", async ({ endpoint, product_key }) => {
  const response = await spigenAxios.post(endpoint, { product_key });
  return response.data;
});


export const createProduct = createAsyncThunk<
  ApiResponse<any>,
  { endpoint: string; payload: ProductPayload }
>("/products/insertProduct", async ({ endpoint, payload }) => {
  const response = await spigenAxios.post(endpoint, payload);
  return response.data;
});

export const updateProduct = createAsyncThunk<
  ApiResponse<any>,
  { endpoint: string; payload: ProductPayload }
>("/products/updateProduct", async ({ endpoint, payload }) => {
  const response = await spigenAxios.post(endpoint, payload);
  return response.data;
});

interface ProductState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts action
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      // Handle createProduct action
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
      })
      // Handle updateProduct action
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.data;
        state.data = state.data.map((product) =>
          product.producttKey === updatedProduct.producttKey ? updatedProduct : product
        );
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })
      // Handle fetchProductForUpdate action
      .addCase(fetchProductForUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductForUpdate.fulfilled, (state, action) => {
        const fetchedProduct = action.payload.data;
        state.data = state.data.map((product) =>
          product.producttKey === fetchedProduct.producttKey ? fetchedProduct : product
        );
        state.loading = false;
      })
      .addCase(fetchProductForUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product details";
      });
  },
});




export default productSlice.reducer;
