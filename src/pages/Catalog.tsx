import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchProducts, setCategoryFilter, setSortOrder, loadMoreItems } from "../features/products/productsSlice"
import ProductCard from "../components/ProductCard"

const Catalog = () => {
  const dispatch = useAppDispatch()
  const { paginatedItems, filteredItems, status, error } = useAppSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight
    ) {
      if (paginatedItems.length < filteredItems.length) {
        dispatch(loadMoreItems())
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [paginatedItems, filteredItems])

  if (status === "loading") return <p>Loading products...</p>
  if (status === "failed") return <p className="text-red-500">{error}</p>

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
        <select
          className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          onChange={(e) => dispatch(setCategoryFilter(e.target.value || null))}
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <select
          className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          onChange={(e) =>
            dispatch(setSortOrder(e.target.value as "asc" | "desc" | null))
          }
        >
          <option value="">Default</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Catalog
