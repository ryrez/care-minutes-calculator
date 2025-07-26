import React, { useState } from 'react';

function LandingPage({ onNavigateToCalculator }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      const submitData = new FormData();
      submitData.append('access_key', '312285e3-d3ad-4d63-af4e-b5069068cb30');
      submitData.append('subject', 'ComplianceIQ - Early Access Request');
      submitData.append('from_name', 'ComplianceIQ');
      submitData.append('email', email);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Thank you for your interest! Please email us directly at ryanrez44@gmail.com');
      }
    } catch (error) {
      alert('Thank you for your interest! Please email us directly at ryanrez44@gmail.com');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-light text-gray-900 mb-6">
          Compliance Tracking Solutions 
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Care minutes calculation tool for Australian aged care facilities. 
          Estimate compliance status for internal planning purposes.
        </p>
        
        <button
          onClick={onNavigateToCalculator}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Check compliance status
        </button>
        <p className="text-sm text-gray-500 mt-4">Free calculator • No signup required</p>
      </div>

      {/* Status Indicators */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Clear compliance visibility
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-4"></div>
              <div className="text-2xl font-light text-gray-900 mb-2">103%</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-4"></div>
              <div className="text-2xl font-light text-gray-900 mb-2">94%</div>
              <div className="text-sm text-gray-600">At risk</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-4"></div>
              <div className="text-2xl font-light text-gray-900 mb-2">87%</div>
              <div className="text-sm text-gray-600">Non-compliant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Built for facility managers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Live dashboard</h3>
              <p className="text-gray-600 text-sm">See your compliance percentage instantly with clear status indicators.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">GPMS exports</h3>
              <p className="text-gray-600 text-sm">Generate reports formatted for quarterly GPMS submissions.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Early alerts</h3>
              <p className="text-gray-600 text-sm">Get notified when compliance drops below your set thresholds.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Numbers */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-light text-blue-600 mb-2">$31.92</div>
              <div className="text-sm text-gray-600">ACQSC penalty per bed/day</div>
            </div>
            <div>
              <div className="text-3xl font-light text-blue-600 mb-2">215</div>
              <div className="text-sm text-gray-600">Required care minutes per day</div>
            </div>
            <div>
              <div className="text-3xl font-light text-blue-600 mb-2">30 sec</div>
              <div className="text-sm text-gray-600">To check compliance status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
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
                <span className="text-lg font-medium text-gray-900">ComplianceIQ</span>
              </div>
              <p className="text-sm text-gray-600">
                Care minutes calculation for Australian aged care
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 mb-2">Questions?</p>
              <a 
                href="mailto:ryanrez44@gmail.com" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ryanrez44@gmail.com
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-gray-500">
              <p>© 2025 ComplianceIQ. Made in Melbourne, Australia.</p>
              
              <div className="flex flex-wrap items-center gap-6">
                <button 
                  onClick={onNavigateToCalculator}
                  className="hover:text-gray-700 transition-colors"
                >
                  Calculator
                </button>
                <a 
                  href="https://www.agedcarequality.gov.au/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-700 transition-colors"
                >
                  ACQSC
                </a>
              </div>
              
              <div className="text-center lg:text-right">
                <p className="text-xs text-gray-400">
                  For planning purposes only. Consult your compliance officer for official guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
