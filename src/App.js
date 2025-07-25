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
      {/* Navigation Header - Minimal like Plausible */}
      <nav className="bg-white border-b border-gray-100 fixed top-0 w-full z-50">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={navigateToLanding}
              className="text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              CareMetrics
            </button>
            <div className="flex items-center gap-8">
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
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-8">
              {/* Back to Home Button - Cleaner style */}
              <div className="mb-8">
                <button
                  onClick={navigateToLanding}
                  className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
