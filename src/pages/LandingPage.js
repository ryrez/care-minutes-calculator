import React, { useState } from 'react';

function LandingPage({ onNavigateToCalculator }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // In production, integrate with your email service
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">ComplianceIQ</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={onNavigateToCalculator}
                className="text-gray-900 hover:text-blue-600 transition-colors"
              >
                Calculator
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Care Minutes Compliance Calculator
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Convert your weekly roster into care minutes compliance status in 30 seconds. 
              Know your compliance status before your next QFR submission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNavigateToCalculator}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Calculate Your Compliance Status - Free
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No signup required • Instant results • Based on official QFR calculations</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              The Compliance Crisis
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-red-600 mb-2">37.4%</div>
                <p className="text-gray-700">of aged care facilities are meeting care minutes targets</p>
                <p className="text-sm text-gray-500 mt-2">Source: Government Q2 2024-25 Report</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-red-600 mb-2">2026</div>
                <p className="text-gray-700">until funding cuts begin for non-compliant facilities</p>
                <p className="text-sm text-gray-500 mt-2">Starting April 2026</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-red-600 mb-2">27</div>
                <p className="text-gray-700">providers issued enforceable undertakings in January 2025</p>
                <p className="text-sm text-gray-500 mt-2">ACQSC enforcement action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Know Your Compliance Status Before Your Next QFR
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our calculator translates your weekly roster data into compliance metrics using the exact same method as official QFR reporting.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Input Your Current Roster</h3>
                  <p className="text-gray-600">Enter your weekly RN, EN, and PCW hours by category - data you already have</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Compliance Status</h3>
                  <p className="text-gray-600">Get your exact care minutes per resident per day and compliance percentage</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Gap Analysis</h3>
                  <p className="text-gray-600">See exactly how many more staff hours you need for full compliance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Calculation</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly RN Hours:</span>
                  <span className="font-medium">420 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly EN Hours:</span>
                  <span className="font-medium">280 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly PCW Hours:</span>
                  <span className="font-medium">980 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Daily Residents:</span>
                  <span className="font-medium">95 residents</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Care Minutes/Resident/Day:</span>
                  <span className="text-green-600">221.8 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Status:</span>
                  <span className="text-green-600 font-semibold">103.2% ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Financial Impact Calculator
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Understand the potential financial consequences of non-compliance
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">$31.92*</div>
                  <p className="text-gray-700">per bed, per day potential penalty</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">$1.2M*</div>
                  <p className="text-gray-700">annual risk for 100-bed facility</p>
                </div>
              </div>
              <div className="mt-8">
                <button 
                  onClick={onNavigateToCalculator}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Calculate Your Specific Risk - Free
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                *Based on current published penalty rates. Actual penalties may vary. 
                For planning purposes only - consult compliance officers for official guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Based on User Feedback
            </h2>
            <p className="text-xl text-gray-600">
              We're developing additional features based on what aged care providers have requested
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Trend Tracking</h3>
              <p className="text-blue-800 mb-4">Simple weekly compliance tracking to spot trends before they become problems</p>
              <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">User Requested</span>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Email Alerts</h3>
              <p className="text-blue-800 mb-4">Automatic notifications when compliance drops below your chosen threshold</p>
              <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">User Requested</span>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Export Tools</h3>
              <p className="text-blue-800 mb-4">Prepare compliance reports and documentation for regulatory submissions</p>
              <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">User Requested</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">215</div>
              <p className="text-gray-700">Required care minutes per resident per day</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">30s</div>
              <p className="text-gray-700">Time to calculate your compliance status</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Free</div>
              <p className="text-gray-700">No cost, no signup required</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to Check Your Compliance Status?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get instant visibility into your care minutes compliance using the same calculations as your QFR submission.
          </p>
          <button 
            onClick={onNavigateToCalculator}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Free Compliance Check
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-2xl font-bold text-white">ComplianceIQ</span>
          </div>
          
          {/* Important Disclaimers */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">⚠️ Important Disclaimers</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <strong>Compliance Tool Only:</strong> This calculator provides estimates based on your input data and should be used for planning purposes only. 
                Results are not guaranteed and do not constitute official compliance advice.
              </p>
              <p>
                <strong>Regulatory Guidance:</strong> Always consult your compliance officer, legal advisor, and official ACQSC guidance 
                for definitive compliance requirements and interpretation.
              </p>
              <p>
                <strong>Data Privacy:</strong> All calculations are performed in your browser. We do not store your facility data or compliance information.
              </p>
              <p>
                <strong>No Government Affiliation:</strong> ComplianceIQ is not affiliated with ACQSC, Department of Health, or any government agency. 
                This is an independent compliance planning tool.
              </p>
              <p>
                <strong>Penalty Information:</strong> Penalty calculations are based on current published rates and may change. 
                Actual enforcement and penalties may vary based on individual circumstances.
              </p>
            </div>
          </div>
          
          <div className="text-center text-gray-400 border-t border-gray-700 pt-8">
            <p>&copy; 2025 Ryan Rezel trading as ComplianceIQ. All rights reserved. Made in Melbourne, Australia.</p>
            <p className="mt-2 text-sm">
              Current functionality: Care minutes compliance calculator. 
              Additional features under development based on user feedback.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
