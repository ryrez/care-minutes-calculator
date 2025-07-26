import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateToCalculator = () => {
    setCurrentPage('calculator');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="App bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
                    <path d="M10 10h6v6h-6zM24 10h6v6h-6zM10 24h6v6h-6zM24 24h6v6h-6z" fill="currentColor"/>
                    <path d="M16 13h8M13 16v8M27 16v8M16 27h8" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <svg className="w-4 h-4 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">ComplianceIQ</span>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              <button
                onClick={navigateToLanding}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'landing'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              
              <button
                onClick={navigateToCalculator}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'calculator'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calculator
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === 'landing' && (
        <LandingPage onNavigateToCalculator={navigateToCalculator} />
      )}
      
      {currentPage === 'calculator' && (
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="max-w-4xl mx-auto px-8">
            {/* Back Button */}
            <button
              onClick={navigateToLanding}
              className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to home
            </button>
            
            {/* Calculator Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-light text-gray-900 mb-4">
                Care Minutes Calculator
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Calculate your facility's care minutes compliance status for planning purposes
              </p>
            </div>
            
            {/* Calculator Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <Calculator />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;