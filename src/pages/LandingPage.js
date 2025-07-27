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
      {/* Hero Section - Full-bleed with animated dashboard */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              Compliance Status Calculator. Care Minutes Planning Tool.
            </div>
            
            <h1 className="text-6xl font-light text-gray-900 mb-6 leading-tight">
              Smarter Compliance.
              <br />
              <span className="text-blue-600 font-normal">Safer Care.</span>
              <br />
              <span className="text-gray-700">Simplified.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ComplianceIQ empowers aged care providers with intelligent tools for regulatory success, 
              workforce planning, and GPMS-ready reporting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={onNavigateToCalculator}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Free Calculator
              </button>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                No signup required. Instant results.
              </div>
            </div>
          </div>
          
          {/* Animated Dashboard Mockup */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500 font-medium">Live Dashboard</div>
              </div>
              
              {/* Compliance Dial */}
              <div className="text-center mb-8">
                <div className="text-5xl font-light text-green-600 mb-2">103%</div>
                <div className="text-sm text-gray-600 mb-6">Current Compliance Status</div>
                
                {/* Progress Ring */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Status Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-sm font-medium text-green-800">Care Minutes</div>
                  <div className="text-lg font-light text-green-600">221/day</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-sm font-medium text-blue-800">GPMS Ready</div>
                  <div className="text-lg font-light text-blue-600">Q1 2025</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-sm font-medium text-gray-800">Next Alert</div>
                  <div className="text-lg font-light text-gray-600">None</div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Platform Highlights */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Platform Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent compliance tools designed specifically for Australian aged care providers
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intelligent Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Care minutes calculator that helps identify compliance risks for planning.
                Know your status before problems arise.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">GPMS Integration-Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Built for GPMS intergration. Export functionality coming in 2026 to 
                Streamline your quarterly submissions.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19H7a2 2 0 01-2-2V7a2 2 0 012-2h4m4 0v18"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proactive Alerts</h3>
              <p className="text-gray-600 leading-relaxed">
                Smart alert systems coming soon. 
                Set custom thresholds to receive early warnings before compliance issues arise.
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* Why It Matters - Enhanced */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Why It Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The cost of non-compliance extends beyond financial penalties—it impacts your facility's reputation and resident care quality
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Penalty Calculator */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Compliance Risk Calculator</h3>
              
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-light text-red-600 mb-2">$31.92</div>
                  <div className="text-sm text-gray-600 mb-4">per bed, per day penalty</div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">100-bed facility example:</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Daily risk:</span>
                        <span className="font-semibold text-red-600">$3,192</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly risk:</span>
                        <span className="font-semibold text-red-600">$95,760</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Annual risk:</span>
                        <span className="font-bold text-red-700 text-lg">$1,165,080</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={onNavigateToCalculator}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Calculate Your Risk
                </button>
                <p className="text-xs text-gray-500 mt-2">Free assessment • No signup required</p>
              </div>
            </div>
            
            {/* Supporting Stats */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Beyond Financial Impact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Reputation Protection</h4>
                      <p className="text-gray-600 text-sm">Maintain community trust and family confidence in your care standards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Operational Excellence</h4>
                      <p className="text-gray-600 text-sm">Optimise staffing decisions and resource allocation with real-time insights</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Peace of Mind</h4>
                      <p className="text-gray-600 text-sm">Confidence in your compliance status with clear, actionable insights</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Key Compliance Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-light text-blue-600">215</div>
                    <div className="text-blue-700">Required minutes/day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-blue-600">30s</div>
                    <div className="text-blue-700">Assessment time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center relative overflow-hidden">
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
              <span className="text-xl font-semibold">ComplianceIQ</span>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2025 Ryan Rezel trading as ComplianceIQ. All rights reserved. Made in Melbourne, Australia.
            </div>
            
            {/* Disclaimer */}
            <div className="text-xs text-gray-500 max-w-2xl">
              Features shown are planned developments. Current functionality limited to care minutes calculation.
              For planning purposes only - consult compliance officers for official guidance. 
              ComplianceIQ is not affiliated with ACQSC or any government agency.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;