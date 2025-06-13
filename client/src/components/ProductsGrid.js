import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

export default function ProductsGrid({ products, loading, error }) {
  if (error) {
    return (
      <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
        {error}
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl text-gray-300 mb-4">🛍️</div>
        <h4 className="text-xl font-semibold text-gray-600 mb-2">No products available yet</h4>
        <p className="text-gray-500">Be the first to add products to our marketplace!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}