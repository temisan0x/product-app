"use client";

export default function HeroSection({ isLoggedIn, onAuthClick }) {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-6">Discover Amazing Products</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Browse through our curated collection of products from trusted sellers
          worldwide.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={scrollToProducts}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Products
          </button>
          {!isLoggedIn && (
            <button
              onClick={() => onAuthClick("signup")}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Start Selling
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
