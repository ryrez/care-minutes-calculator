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
      submitData.append('subject', 'CareMetrics - Early Access Request');
      submitData.append('from_name', 'CareMetrics');
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
    <div className="bg-gray-50 min-h-screen">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      {/* Hero - Futuristic gradient background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-400/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              Digital transformation in aged care compliance
            </div>
            
            <h1 className="text-7xl font-extralight text-white mb-8 leading-tight tracking-tight">
              Care minutes
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-light">
                redefined
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
              Next-generation compliance monitoring for Australian aged care facilities. 
              Transform how you track, report, and maintain ACQSC compliance standards.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <button
                onClick={onNavigateToCalculator}
                className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl text-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10">Analyze compliance status</span>
                <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>No registration required</span>
                </div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>30-second analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status visualization - Geometric design */}
      <div className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight text-gray-900 mb-6">
              Compliance
              <span className="font-light text-blue-600"> visibility</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Real-time insights into your facility's compliance status with modern visual indicators
            </p>
          </div>
          
          {/* Modern status cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
              </div>
              <div className="text-4xl font-extralight text-green-600 mb-3">103%</div>
              <div className="text-sm font-medium text-green-800 mb-2">Fully Compliant</div>
              <div className="w-full bg-green-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="w-3 h-3 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50 animate-pulse"></div>
              </div>
              <div className="text-4xl font-extralight text-amber-600 mb-3">94%</div>
              <div className="text-sm font-medium text-amber-800 mb-2">Monitoring Required</div>
              <div className="w-full bg-amber-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 h-1.5 rounded-full" style={{width: '94%'}}></div>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl p-8 border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
              </div>
              <div className="text-4xl font-extralight text-red-600 mb-3">87%</div>
              <div className="text-sm font-medium text-red-800 mb-2">Action Required</div>
              <div className="w-full bg-red-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-red-500 to-rose-500 h-1.5 rounded-full" style={{width: '87%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features - Modern layout */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Advanced features
              </div>
              
              <h2 className="text-5xl font-extralight text-gray-900 mb-12">
                Built for the
                <span className="font-light text-blue-600"> future</span>
              </h2>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Real-time dashboard</h3>
                    <p className="text-gray-600 leading-relaxed">Unified compliance view with instant updates. Monitor your facility's status through intelligent visual indicators and predictive insights.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Automated reporting</h3>
                    <p className="text-gray-600 leading-relaxed">Generate GPMS-compliant reports automatically. Export formatted data that integrates seamlessly with existing workflows.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19H7a2 2 0 01-2-2V7a2 2 0 012-2h4m4 0v18"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Smart alerts</h3>
                    <p className="text-gray-600 leading-relaxed">Proactive notifications before compliance thresholds are breached. Customizable alert parameters for your facility's specific needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced dashboard mockup */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">Live Dashboard</div>
                </div>
                
                <div className="text-center mb-8">
                  <div className="text-6xl font-extralight bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
                    103%
                  </div>
                  <div className="text-sm text-gray-600 mb-6">Current compliance status</div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-lg shadow-green-500/30" style={{width: '100%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>215 min target</span>
                      <span>120%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-green-800">Status: Compliant</div>
                      <div className="text-xs text-green-600">Last updated: 2 minutes ago</div>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics - Clean data visualization */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight text-gray-900 mb-6">
              Compliance
              <span className="font-light text-blue-600"> insights</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-light text-white">$31.92</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">ACQSC penalty per bed/day</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-light text-white">215</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">Required care minutes per day</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-light text-white">30s</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">Average analysis time</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - Modern gradient design */}
      <div className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-400/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-extralight text-white mb-8">
            Transform your
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-light"> compliance workflow</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto">
            Join the future of aged care compliance monitoring. Get early access to our advanced dashboard platform.
          </p>
          
          {!isSubmitted ? (
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@facility.com.au"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg text-white placeholder-gray-300 backdrop-blur-sm"
                required
              />
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 text-lg whitespace-nowrap shadow-xl hover:shadow-blue-500/25"
              >
                Request access
              </button>
            </div>
          ) : (
            <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-8 max-w-lg mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-green-300 font-medium">Access request received. We'll be in touch soon.</p>
              </div>
            </div>
          )}
          
          <p className="text-sm text-gray-400 mt-8 font-light">
            Expected launch Q2 2025 • Early access program opening soon
          </p>
        </div>
      </div>

      {/* Footer - Futuristic minimal */}
      <footer className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
              <div className="text-2xl font-medium text-gray-900 mb-4">CareMetrics</div>
              <p className="text-gray-600 leading-relaxed font-light">
                Next-generation compliance monitoring for Australian aged care facilities. 
                Transforming how facilities track and maintain ACQSC compliance standards.
              </p>
            </div>
            
            <div className="flex flex-col lg:items-end gap-6">
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900 mb-2">Questions?</div>
                <a 
                  href="mailto:ryanrez44@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  ryanrez44@gmail.com
                </a>
              </div>
              
              <div className="flex gap-8 text-sm">
                <button 
                  onClick={onNavigateToCalculator}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Calculator
                </button>
                <a 
                  href="https://www.agedcarequality.gov.au/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  ACQSC
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-16 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-gray-500">
              <p>© 2025 CareMetrics. Designed and built in Melbourne, Australia.</p>
              <p className="font-light">For informational purposes only. Consult your compliance officer for official guidance.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
