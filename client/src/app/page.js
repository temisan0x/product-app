'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductsGrid from '../components/ProductsGrid';
import AuthModal from '../components/AuthModal';
import CallToAction from '../components/CallToAction';

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  
  const { 
    isLoggedIn, 
    user, 
    loading: authLoading, 
    error: authError, 
    login, 
    register, 
    logout,
    setError: setAuthError 
  } = useAuth();
  
  const { 
    products, 
    loading: productsLoading, 
    error: productsError 
  } = useProducts();

  const handleAuthClick = (mode = 'signin') => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
    setAuthError('');
  };

const handleAuthSubmit = async (mode, payload) => {
  try {
    const result = mode === 'signin' 
      ? await login(payload) 
      : await register(payload);
    
    if (result && result.success) {
      setShowAuthModal(false);
      alert(`${mode === 'signin' ? 'Signed in' : 'Account created'} successfully!`);
    } else {
      const errorMessage = result?.error || 'Something went wrong';
      setAuthError(errorMessage);
    }
  } catch (error) {
    setAuthError(error.message || 'An unexpected error occurred');
  }
};

  const handleCloseModal = () => {
    setShowAuthModal(false);
    setAuthError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn}
        user={user}
        onAuthClick={handleAuthClick}
        onLogout={logout}
      />

      <HeroSection 
        isLoggedIn={isLoggedIn}
        onAuthClick={handleAuthClick}
      />

      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest products from our community of sellers
            </p>
          </div>

          <ProductsGrid 
            products={products}
            loading={productsLoading}
            error={productsError}
          />
        </div>
      </section>

      {!isLoggedIn && (
        <CallToAction onAuthClick={handleAuthClick} />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={handleCloseModal}
        onSubmit={handleAuthSubmit}
        loading={authLoading}
        error={authError}
        initialMode={authModalMode}
      />
    </div>
  );
}