import React, { useState } from 'react';
import { Stethoscope, Activity, Home } from 'lucide-react';

// Import your components here
// import Calculator from './components/Calculator';
// import ProfessionalLandingPage from './components/ProfessionalLandingPage';

// Placeholder components for demonstration
function Calculator() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-8" style={{ borderColor: '#E5E7EB' }}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#2C5F7C' }}>
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#1F2937' }}>
              Care Minutes Analytics Dashboard
            </h1>
            <p style={{ color: '#6B7280' }}>
              This is where your professional healthcare calculator component would be rendered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalLandingPage({ onNavigateToCalculator }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-8" style={{ borderColor: '#E5E7EB' }}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#2C5F7C' }}>
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#1F2937' }}>
              Professional Landing Page
            </h1>
            <p className="mb-6" style={{ color: '#6B7280' }}>
              This is where your professional healthcare landing page component would be rendered.
            </p>
            <button
              onClick={onNavigateToCalculator}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: '#2C5F7C' }}
            >
              Access Analytics Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalHealthcareApp() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateToCalculator = () => {
    setCurrentPage('calculator');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="App min-h-screen">
      {/* Professional Healthcare Navigation */}
      <nav className="bg-white border-b-2 shadow-sm sticky top-0 z-50" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Professional Healthcare Logo */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5F7C' }}>
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold" style={{ color: '#1F2937' }}>ComplianceIQ</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ 
                    backgroundColor: '#F0FDF4', 
                    color: '#166534',
                    border: '1px solid #BBF7D0'
                  }}>
                    Clinical Planning Tool
                  </span>
                </div>
              </div>
            </div>
            
            {/* Professional Navigation Links */}
            <div className="flex items-center gap-2">
              <button
                onClick={navigateToLanding}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'landing'
                    ? 'text-white shadow-sm'
                    : 'hover:bg-gray-50'
                }`}
                style={currentPage === 'landing' ? 
                  { backgroundColor: '#2C5F7C' } : 
                  { color: '#6B7280' }
                }
              >
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </div>
              </button>
              
              <button
                onClick={navigateToCalculator}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'calculator'
                    ? 'text-white shadow-sm'
                    : 'hover:bg-gray-50'
                }`}
                style={currentPage === 'calculator' ? 
                  { backgroundColor: '#2C5F7C' } : 
                  { color: '#6B7280' }
                }
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Analytics Dashboard</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === 'landing' && (
        <ProfessionalLandingPage onNavigateToCalculator={navigateToCalculator} />
      )}
      
      {currentPage === 'calculator' && (
        <Calculator />
      )}
    </div>
  );
}

export default ProfessionalHealthcareApp; 