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
    <div className="bg-white min-h-screen">
      {/* Hero - Plausible/Fathom inspired simplicity */}
      <div className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-normal text-gray-900 mb-8 leading-tight tracking-tight">
            Care minutes
            <br />
            <span className="text-blue-600">compliance tracking</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
            Monitor care minutes compliance for Australian aged care facilities. 
            Clear visibility into your compliance status with ACQSC requirements.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={onNavigateToCalculator}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Try compliance calculator
            </button>
            <p className="text-sm text-gray-500 font-light">No account required • Takes 30 seconds</p>
          </div>
        </div>
      </div>

      {/* Status indicators - StatusPage.io inspired */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Know where you stand
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Clear visual indicators show your compliance status at a glance
            </p>
          </div>
          
          {/* Status examples - UptimeRobot style */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-4"></div>
              <div className="text-2xl font-light text-gray-900 mb-2">103%</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-4"></div>
              <div className="text-2xl font-light text-gray-900 mb-2">94%</div>
              <div className="text-sm text-gray-600">At Risk</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-4"></div>
              <div className="text-2xl font-light text-gray-900 mb-2">87%</div>
              <div className="text-sm text-gray-600">Non-Compliant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features - Epic MyChart simplicity */}
      <div className="py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-8">
                Built for facility managers
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Live dashboard</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Single metric focus. See your compliance percentage instantly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">GPMS exports</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Generate reports in the format your quarterly submissions expect.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Early warnings</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Get notified when compliance drops below your chosen thresholds.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mock dashboard - Nedap inspired */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-center">
                  <div className="text-5xl font-light text-green-600 mb-2">103%</div>
                  <div className="text-sm text-gray-600 mb-4">Current compliance</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500">Last updated: 2 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof - Simple numbers */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-light text-blue-600 mb-2">$31.92</div>
              <div className="text-sm text-gray-600">ACQSC penalty per bed/day</div>
            </div>
            <div>
              <div className="text-3xl font-light text-blue-600 mb-2">215</div>
              <div className="text-sm text-gray-600">Required care minutes</div>
            </div>
            <div>
              <div className="text-3xl font-light text-blue-600 mb-2">2 min</div>
              <div className="text-sm text-gray-600">To check compliance</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - Athenahealth inspired */}
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Stay ahead of compliance
          </h2>
          <p className="text-xl text-gray-600 mb-12 font-light">
            Join the waitlist for early access to our compliance dashboard.
          </p>
          
          {!isSubmitted ? (
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@facility.com.au"
                className="flex-1 px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                required
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 text-lg whitespace-nowrap"
              >
                Get early access
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-green-800 font-medium">You're on the list! We'll be in touch.</p>
              </div>
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-6">
            Currently in development • Expected launch Q2 2025
          </p>
        </div>
      </div>

      {/* Footer - Minimal like Plausible */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="text-xl font-medium text-gray-900 mb-3">CareMetrics</div>
              <p className="text-gray-600 text-sm max-w-md leading-relaxed">
                Compliance monitoring tools for Australian aged care facilities. 
                Built to simplify ACQSC reporting requirements.
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="text-sm text-gray-600">
                <span className="block mb-1">Questions?</span>
                <a 
                  href="mailto:ryanrez44@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ryanrez44@gmail.com
                </a>
              </div>
              
              <div className="flex gap-6 text-sm text-gray-500">
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
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <p>© 2025 CareMetrics. Made in Melbourne, Australia.</p>
              <p>For informational purposes only. Consult your compliance officer for official guidance.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
