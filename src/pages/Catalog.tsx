import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchProducts } from "../features/products/productsSlice"

const Catalog = () => {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (status === "loading") {
    return <p>Loading products...</p>
  }

  if (status === "failed") {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow p-4"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto object-contain"
          />
          <h2 className="mt-2 font-semibold text-sm">
            {product.title}
          </h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default Catalog
