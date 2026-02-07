import axios from "axios"
import type { Product } from "./types"

const API_URL = "https://fakestoreapi.com/products"

export const fetchProductsAPI = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL)
  return response.data
}
