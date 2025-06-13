export default function CallToAction({ onAuthClick }) {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Selling?</h3>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of sellers who are making money by selling their products on RealBuy
        </p>
        <button
          onClick={() => onAuthClick('signup')}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started Today
        </button>
      </div>
    </section>
  );
}