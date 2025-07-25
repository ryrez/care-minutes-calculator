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
    <div className="App">
      {/* Navigation Header - Clean and simple */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={navigateToLanding}
              className="flex items-center gap-3"
            >
              {/* Caring + Analytical Logo */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center relative">
                {/* Heart shape (caring) */}
                <svg className="w-4 h-4 text-white absolute" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                {/* Analytics bars overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-1 opacity-80">
                  <div className="flex items-end gap-0.5">
                    <div className="w-0.5 h-1 bg-white"></div>
                    <div className="w-0.5 h-2 bg-white"></div>
                    <div className="w-0.5 h-1.5 bg-white"></div>
                  </div>
                </div>
              </div>
              <span className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                ComplianceIQ
              </span>
            </button>
            
            <div className="flex items-center gap-6">
              <button
                onClick={navigateToLanding}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'landing' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              
              <button
                onClick={navigateToCalculator}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'calculator' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calculator
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {currentPage === 'landing' && (
          <LandingPage onNavigateToCalculator={navigateToCalculator} />
        )}
        
        {currentPage === 'calculator' && (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* Back to Home Button */}
              <div className="mb-8">
                <button
                  onClick={navigateToLanding}
                  className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back to home
                </button>
              </div>
              
              {/* Calculator Component */}
              <Calculator />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;