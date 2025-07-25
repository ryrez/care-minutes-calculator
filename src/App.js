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
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      {/* Navigation Header - Futuristic glassmorphism */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 fixed top-0 w-full z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center h-18">
            <button 
              onClick={navigateToLanding}
              className="text-2xl font-medium bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              CareMetrics
            </button>
            
            <div className="flex items-center gap-8">
              <button
                onClick={navigateToLanding}
                className={`relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                  currentPage === 'landing' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
                {currentPage === 'landing' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
              
              <button
                onClick={navigateToCalculator}
                className={`relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                  currentPage === 'calculator' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Calculator
                {currentPage === 'calculator' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-18">
        {currentPage === 'landing' && (
          <LandingPage onNavigateToCalculator={navigateToCalculator} />
        )}
        
        {currentPage === 'calculator' && (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="max-w-6xl mx-auto px-8 py-12">
              {/* Back to Home Button - Futuristic style */}
              <div className="mb-12">
                <button
                  onClick={navigateToLanding}
                  className="group inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/50 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  <span className="relative">
                    Back to home
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                  </span>
                </button>
              </div>
              
              {/* Calculator Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Compliance analyzer
                </div>
                <h1 className="text-5xl font-extralight text-gray-900 mb-6">
                  Care minutes
                  <span className="font-light text-blue-600"> calculator</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                  Analyze your facility's compliance status with ACQSC requirements. 
                  Get instant insights into potential penalty risks.
                </p>
              </div>
              
              {/* Calculator Component Container */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/50 p-8">
                <Calculator />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

