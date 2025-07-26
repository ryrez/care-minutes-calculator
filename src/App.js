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
              {/* Futuristic Logo - Circuit/Data Flow Design */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Circuit pattern background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
                    <path d="M8 8h4v4H8zM20 8h4v4h-4zM8 20h4v4H8zM20 20h4v4h-4z" fill="currentColor"/>
                    <path d="M12 10h8M10 12v8M22 12v8M12 22h8" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                {/* Central data icon */}
                <svg className="w-4 h-4 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                {/* Pulse effect */}
                <div className="absolute inset-0 bg-blue-400 opacity-30 rounded-lg animate-pulse"></div>
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
