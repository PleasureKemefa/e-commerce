import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Product } from "./types"
import { fetchProductsAPI } from "./productsAPI"

interface ProductsState {
  items: Product[]
  filteredItems: Product[]
  paginatedItems: Product[]
  status: "idle" | "loading" | "failed"
  error: string | null
  categoryFilter: string | null
  sortOrder: "asc" | "desc" | null
  currentPage: number
  itemsPerPage: number
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  paginatedItems: [],
  status: "idle",
  error: null,
  categoryFilter: null,
  sortOrder: null,
  currentPage: 1,
  itemsPerPage: 8,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchProductsAPI()
  }
)

const applyFilters = (state: ProductsState): Product[] => {
  let items = [...state.items]
  if (state.categoryFilter) {
    items = items.filter((p) => p.category === state.categoryFilter)
  }
  if (state.sortOrder) {
    items.sort((a, b) =>
      state.sortOrder === "asc" ? a.price - b.price : b.price - a.price
    )
  }
  return items
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategoryFilter(state, action: { payload: string | null }) {
      state.categoryFilter = action.payload
      state.filteredItems = applyFilters(state)
      state.currentPage = 1
      const start = 0
      const end = start + state.itemsPerPage
      state.paginatedItems = state.filteredItems.slice(start, end)
    },
    setSortOrder(state, action: { payload: "asc" | "desc" | null }) {
      state.sortOrder = action.payload
      state.filteredItems = applyFilters(state)
      state.currentPage = 1
      const start = 0
      const end = start + state.itemsPerPage
      state.paginatedItems = state.filteredItems.slice(start, end)
    },
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      state.paginatedItems = state.filteredItems.slice(start, end)
    },
    setItemsPerPage(state, action: { payload: number }) {
      state.itemsPerPage = action.payload
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      state.paginatedItems = state.filteredItems.slice(start, end)
      },
    loadMoreItems(state) {
  const start = state.paginatedItems.length
  const end = start + state.itemsPerPage
  state.paginatedItems = state.paginatedItems.concat(
    state.filteredItems.slice(start, end)
  )
}

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
  state.status = "idle"
  state.items = action.payload
  state.filteredItems = action.payload
  state.currentPage = 1

  const start = 0
  const end = state.itemsPerPage
  state.paginatedItems = action.payload.slice(start, end)
})

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Failed to fetch products"
      })
  },
})

export const { setCategoryFilter, setSortOrder, setCurrentPage, setItemsPerPage, loadMoreItems } = productsSlice.actions
export default productsSlice.reducer
