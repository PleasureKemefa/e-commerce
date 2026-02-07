import React from "react"
import type { Product } from "../features/products/types"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col">
      
      <div className="h-56 w-full bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm flex-1 line-clamp-3 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-500 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
