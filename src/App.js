import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Calculator, Phone } from 'lucide-react';

function App() {
  const [beds, setBeds] = useState('');
  const [currentMinutes, setCurrentMinutes] = useState('');
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [phone, setPhone] = useState('');
  const [biggestPainPoint, setBiggestPainPoint] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const targetMinutes = 215;
  const penaltyPerBedPerDay = 31.92;

  const calculatePenalty = () => {
    const bedCount = parseInt(beds) || 0;
    const current = parseInt(currentMinutes) || 0;
    
    const shortfall = Math.max(0, targetMinutes - current);
    const dailyPenalty = bedCount * penaltyPerBedPerDay;
    const annualPenalty = dailyPenalty * 365;
    const compliancePercentage = Math.round((current / targetMinutes) * 100);
    
    return {
      bedCount,
      current,
      shortfall,
      dailyPenalty,
      annualPenalty,
      compliancePercentage,
      isCompliant: current >= targetMinutes
    };
  };

  const results = calculatePenalty();

  const handleCalculate = () => {
    if (beds && currentMinutes) {
      setShowResults(true);
    }
  };

  const getStatusColor = () => {
    if (results.isCompliant) return 'text-green-600 bg-green-50 border-green-200';
    if (results.compliancePercentage >= 90) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusIcon = () => {
    if (results.isCompliant) return <CheckCircle className="w-8 h-8 text-green-600" />;
    if (results.compliancePercentage >= 90) return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  const getStatusMessage = () => {
    if (results.isCompliant) return "✅ You're Compliant!";
    if (results.compliancePercentage >= 90) return "⚠️ Almost Compliant";
    return "🚨 Non-Compliant Risk";
  };

  const handleSubmitLead = async () => {
    if (email && contactName && facilityName && biggestPainPoint) {
      try {
        const formData = new FormData();
        formData.append('access_key', '312285e3-d3ad-4d63-af4e-b5069068cb30');
        formData.append('subject', 'New Care Minutes Calculator Lead');
        formData.append('from_name', 'Care Minutes Calculator');
        formData.append('name', contactName);
        formData.append('email', email);
        formData.append('facility', facilityName);
        formData.append('phone', phone || 'Not provided');
        formData.append('pain_point', biggestPainPoint);
        formData.append('penalty_calculation', `${results.bedCount} beds, ${results.current} current minutes, $${results.annualPenalty.toLocaleString()} annual risk`);
        formData.append('compliance_percentage', `${results.compliancePercentage}%`);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          alert(`Thanks ${contactName}! We've added you to our priority list and will notify you at ${email} when our compliance solution launches.`);
          setEmail('');
          setContactName('');
          setFacilityName('');
          setPhone('');
          setBiggestPainPoint('');
          setShowEmailForm(false);
        } else {
          alert('Thank you for your interest! Please email us directly at ryanrezel@gmail.com');
        }
      } catch (error) {
        alert('Thank you for your interest! Please email us directly at ryanrezel@gmail.com');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Care Minutes Penalty Calculator
        </h1>
        <p className="text-gray-600">
          Calculate your potential ACQSC compliance penalties in 30 seconds
        </p>
      </div>

      {/* Calculator Inputs */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Beds
            </label>
            <input
              type="number"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              placeholder="e.g. 50"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Care Minutes/Day
            </label>
            <input
              type="number"
              value={currentMinutes}
              onChange={(e) => setCurrentMinutes(e.target.value)}
              placeholder="e.g. 180"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Minutes/Day
            </label>
            <input
              type="number"
              value={targetMinutes}
              disabled
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!beds || !currentMinutes}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Penalty Risk
        </button>
      </div>

      {/* Results */}
      {showResults && beds && currentMinutes && (
        <div className="space-y-6">
          {/* Status Card */}
          <div className={`p-6 rounded-lg border-2 ${getStatusColor()}`}>
            <div className="flex items-center gap-4 mb-4">
              {getStatusIcon()}
              <div>
                <h2 className="text-2xl font-bold">{getStatusMessage()}</h2>
                <p className="text-lg">{results.compliancePercentage}% of required care minutes</p>
              </div>
            </div>
          </div>

          {/* Penalty Breakdown */}
          {!results.isCompliant && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-800 mb-4">Potential Compliance Penalties</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border">
                  <div className="text-2xl font-bold text-red-600">
                    ${results.annualPenalty.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Annual penalty risk</div>
                </div>
                <div className="bg-white p-4 rounded border">
                  <div className="text-2xl font-bold text-red-600">
                    ${Math.round(results.dailyPenalty).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Daily penalty risk</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-100 rounded text-sm text-red-800">
                <strong>You're short {results.shortfall} minutes per resident per day.</strong> This calculation is based on the official $31.92 per bed per day funding reduction for non-compliance.
              </div>
            </div>
          )}

          {/* Success Message */}
          {results.isCompliant && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-800 mb-2">Congratulations!</h3>
              <p className="text-green-700">
                Your facility is meeting the required 215 minutes of care per resident per day.
              </p>
            </div>
          )}

          {/* Lead Capture */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-blue-800 mb-2">
              Get Notified About Our Compliance Solution
            </h3>
            <p className="text-blue-700 mb-4">
              We're developing a comprehensive care minutes compliance tracking system.
            </p>
            
            {!showEmailForm ? (
              <button
                onClick={() => setShowEmailForm(true)}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2 mx-auto"
              >
                <Phone className="w-4 h-4" />
                Get Early Access
              </button>
            ) : (
              <div className="max-w-md mx-auto space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  placeholder="Facility name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <select
                  value={biggestPainPoint}
                  onChange={(e) => setBiggestPainPoint(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="">What's your biggest care minutes frustration?</option>
                  <option value="constant-worry-compliance">I constantly worry we might be non-compliant without knowing</option>
                  <option value="last-minute-panic">We only find out we're behind at the end of each quarter</option>
                  <option value="manual-spreadsheet-hell">Spending hours manually calculating compliance in spreadsheets</option>
                  <option value="gpms-reporting-nightmare">GPMS quarterly reporting takes days and I'm never confident it's right</option>
                  <option value="acqsc-audit-fear">Living in fear of an ACQSC audit because our records are messy</option>
                  <option value="penalty-risk-stress">Losing sleep over potential $31.92/bed/day penalties</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleSubmitLead}
                  disabled={!email || !contactName || !facilityName || !biggestPainPoint}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Join Priority List
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This calculator provides estimates based on current aged care compliance requirements.</p>
      </div>
    </div>
  );
}

export default App;
