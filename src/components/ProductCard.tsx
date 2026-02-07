import type { Product } from "../features/products/types"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain mb-2"
      />
      <h2 className="text-sm font-semibold truncate">{product.title}</h2>
      <p className="text-gray-600 mt-1">${product.price}</p>
      <p className="text-xs text-gray-400 mt-auto">{product.category}</p>
    </div>
  )
}

export default ProductCard
