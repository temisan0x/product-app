import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9">
        {product.image ? (
         <Image
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            width={640}
            height={360}
            onError={(e) => {
              e.target.src = '';
            }}
            unoptimized
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">📦</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-600">
            ${parseFloat(product.price || 0).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Stock: {product.quantity || 0}
          </span>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            💕
          </button>
        </div>
      </div>

    </div>)
}