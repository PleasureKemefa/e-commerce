import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Product } from "./types"
import { fetchProductsAPI } from "./productsAPI"

interface ProductsState {
  items: Product[]
  status: "idle" | "loading" | "failed"
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchProductsAPI()
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle"
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Failed to fetch products"
      })
  },
})

export default productsSlice.reducer
