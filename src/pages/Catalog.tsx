import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchProducts } from "../features/products/productsSlice"
import ProductCard from "../components/ProductCard"

const Catalog = () => {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (status === "loading") return <p>Loading products...</p>
  if (status === "failed") return <p className="text-red-500">{error}</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Catalog
