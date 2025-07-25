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
      {/* Hero Section - Nedap Style */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
          Care minutes compliance
          <br />
          <span className="font-normal text-blue-600">made simple</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Real-time compliance tracking for Australian aged care facilities. 
          Know your status instantly, prevent penalties automatically.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onNavigateToCalculator}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors mb-4"
          >
            Check compliance status →
          </button>
          <p className="text-sm text-gray-500">Free compliance calculator • No signup required</p>
        </div>
      </div>

      {/* Problem/Solution - Consolidated */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              Stop compliance surprises
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-light text-red-600 mb-3">$31.92</div>
              <div className="text-sm text-gray-600">per bed, per day penalty</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-light text-blue-600 mb-3">60 sec</div>
              <div className="text-sm text-gray-600">to check compliance status</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-light text-green-600 mb-3">Real-time</div>
              <div className="text-sm text-gray-600">monitoring and alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works - Simple */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              How it works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-medium">1</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Enter your data</h3>
              <p className="text-gray-600 text-sm">Beds and current care minutes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-medium">2</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Get instant results</h3>
              <p className="text-gray-600 text-sm">Compliance status and risk</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-medium">3</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Take action</h3>
              <p className="text-gray-600 text-sm">Prevent penalties early</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Simple */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Get early access
          </h2>
          <p className="text-gray-600 mb-8">
            We're building a full compliance tracking system. Join the waitlist for early access.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@facility.com.au"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Join waitlist
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-green-800 font-medium">Thanks! We'll notify you when we launch.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Minimal */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">CareMetrics</h3>
              <p className="text-sm text-gray-600">
                Australian aged care compliance tracking
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 mb-2">
                Questions? Email us
              </p>
              <a 
                href="mailto:ryanrez44@gmail.com" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ryanrez44@gmail.com
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-xs text-gray-500">
              © 2025 CareMetrics. Built for Australian aged care facilities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;