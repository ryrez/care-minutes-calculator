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
      {/* Navigation Header - Enhanced Professional Design */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-100 fixed top-0 w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-18">
            <button 
              onClick={navigateToLanding}
              className="flex items-center gap-3 group"
            >
              {/* Enhanced Futuristic Logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                {/* Circuit pattern background */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
                    <path d="M10 10h6v6h-6zM24 10h6v6h-6zM10 24h6v6h-6zM24 24h6v6h-6z" fill="currentColor"/>
                    <path d="M16 13h8M13 16v8M27 16v8M16 27h8" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                {/* Central data icon */}
                <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                {/* Subtle pulse effect */}
                <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-xl animate-pulse"></div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  ComplianceIQ
                </span>
                <span className="text-xs text-gray-500 font-light -mt-1">
                  Compliance Intelligence
                </span>
              </div>
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
                Platform
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
              
              {/* CTA Button */}
              <button
                onClick={navigateToCalculator}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Try Free
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
            <div className="max-w-6xl mx-auto px-6 py-16">
              {/* Enhanced Back Button */}
              <div className="mb-12">
                <button
                  onClick={navigateToLanding}
                  className="group inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/80 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  <span className="relative">
                    Back to platform
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                  </span>
                </button>
              </div>
              
              {/* Enhanced Calculator Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Compliance Risk Assessment
                </div>
                
                <h1 className="text-5xl font-light text-gray-900 mb-6">
                  Care Minutes
                  <span className="font-normal text-blue-600"> Calculator</span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                  Assess your facility's compliance status with ACQSC requirements. 
                  Get instant insights into potential penalty risks and compliance gaps.
                </p>
                
                <div className="flex justify-center items-center gap-6 mt-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Free assessment</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>30-second analysis</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <span>Secure & private</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Calculator Container */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1"></div>
                <div className="p-8">
                  <Calculator />
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-8 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>ACQSC compliant calculations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Australian data residency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>No data stored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
