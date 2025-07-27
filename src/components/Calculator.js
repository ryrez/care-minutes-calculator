import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Calculator, Phone } from 'lucide-react';

function CalculatorComponent() {
  const [beds, setBeds] = useState('');
  const [residents, setResidents] = useState('');
  const [rnHours, setRnHours] = useState('');
  const [enHours, setEnHours] = useState('');
  const [pcwHours, setPcwHours] = useState('');
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [phone, setPhone] = useState('');
  const [biggestPainPoint, setBiggestPainPoint] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const targetMinutes = 215;
  const rnTargetMinutes = 44;
  const penaltyPerBedPerDay = 31.92;

  const calculateCompliance = () => {
    const bedCount = parseInt(beds) || 0;
    const residentCount = parseInt(residents) || bedCount; // Default to bed count if not specified
    const rnWeeklyHours = parseFloat(rnHours) || 0;
    const enWeeklyHours = parseFloat(enHours) || 0;
    const pcwWeeklyHours = parseFloat(pcwHours) || 0;
    
    // Calculate total care minutes per resident per day
    const totalWeeklyHours = rnWeeklyHours + enWeeklyHours + pcwWeeklyHours;
    const dailyCareMinutes = (totalWeeklyHours * 60) / 7; // Convert hours to minutes, then weekly to daily
    const careMinutesPerResident = residentCount > 0 ? dailyCareMinutes / residentCount : 0;
    
    // Calculate RN-specific minutes per resident per day
    const rnDailyMinutes = (rnWeeklyHours * 60) / 7;
    const rnMinutesPerResident = residentCount > 0 ? rnDailyMinutes / residentCount : 0;
    
    // Calculate compliance percentages
    const totalCompliancePercentage = Math.round((careMinutesPerResident / targetMinutes) * 100);
    const rnCompliancePercentage = Math.round((rnMinutesPerResident / rnTargetMinutes) * 100);
    
    // Calculate shortfalls
    const totalShortfall = Math.max(0, targetMinutes - careMinutesPerResident);
    const rnShortfall = Math.max(0, rnTargetMinutes - rnMinutesPerResident);
    
    // Calculate penalties (based on bed count, not residents)
    const dailyPenalty = bedCount * penaltyPerBedPerDay;
    const annualPenalty = dailyPenalty * 365;
    
    // Determine compliance status
    const isCompliant = careMinutesPerResident >= targetMinutes && rnMinutesPerResident >= rnTargetMinutes;
    const isRnCompliant = rnMinutesPerResident >= rnTargetMinutes;
    const isTotalCompliant = careMinutesPerResident >= targetMinutes;
    
    return {
      bedCount,
      residentCount,
      totalWeeklyHours,
      careMinutesPerResident: Math.round(careMinutesPerResident * 10) / 10,
      rnMinutesPerResident: Math.round(rnMinutesPerResident * 10) / 10,
      totalCompliancePercentage,
      rnCompliancePercentage,
      totalShortfall: Math.round(totalShortfall * 10) / 10,
      rnShortfall: Math.round(rnShortfall * 10) / 10,
      dailyPenalty,
      annualPenalty,
      isCompliant,
      isRnCompliant,
      isTotalCompliant
    };
  };

  const results = calculateCompliance();

  const handleCalculate = () => {
    if (beds && (rnHours || enHours || pcwHours)) {
      setShowResults(true);
    }
  };

  const getStatusColor = () => {
    if (results.isCompliant) return 'text-green-600 bg-green-50 border-green-200';
    if (results.totalCompliancePercentage >= 90 && results.rnCompliancePercentage >= 90) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusIcon = () => {
    if (results.isCompliant) return <CheckCircle className="w-8 h-8 text-green-600" />;
    if (results.totalCompliancePercentage >= 90 && results.rnCompliancePercentage >= 90) return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  const getStatusMessage = () => {
    if (results.isCompliant) return "✅ Fully Compliant!";
    if (results.totalCompliancePercentage >= 90 && results.rnCompliancePercentage >= 90) return "⚠️ Almost Compliant";
    return "🚨 Non-Compliant Risk";
  };

  const handleSubmitLead = async () => {
    if (email && contactName && facilityName && biggestPainPoint) {
      try {
        const formData = new FormData();
        formData.append('access_key', '312285e3-d3ad-4d63-af4e-b5069068cb30');
        formData.append('subject', 'New ComplianceIQ Calculator Lead');
        formData.append('from_name', 'ComplianceIQ Calculator');
        formData.append('name', contactName);
        formData.append('email', email);
        formData.append('facility', facilityName);
        formData.append('phone', phone || 'Not provided');
        formData.append('pain_point', biggestPainPoint);
        formData.append('staffing_data', `${results.bedCount} beds, ${results.residentCount} residents, ${results.totalWeeklyHours} total weekly hours`);
        formData.append('compliance_results', `${results.careMinutesPerResident} total mins/resident (${results.totalCompliancePercentage}%), ${results.rnMinutesPerResident} RN mins/resident (${results.rnCompliancePercentage}%)`);
        formData.append('penalty_risk', `$${results.annualPenalty.toLocaleString()} annual risk`);

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
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Care Minutes Compliance Calculator
        </h1>
        <p className="text-gray-600">
          Convert your weekly roster into care minutes compliance status in 30 seconds
        </p>
      </div>

      {/* Calculator Inputs */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Facility Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Facility Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Operational Beds
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
                Average Daily Residents <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="number"
                value={residents}
                onChange={(e) => setResidents(e.target.value)}
                placeholder={beds ? `Defaults to ${beds} if not specified` : "e.g. 47"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Weekly Staff Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Weekly Staff Hours (Worked Hours Only)</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registered Nurse (RN) Hours/Week
              </label>
              <input
                type="number"
                step="0.5"
                value={rnHours}
                onChange={(e) => setRnHours(e.target.value)}
                placeholder="e.g. 168"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enrolled Nurse (EN) Hours/Week
              </label>
              <input
                type="number"
                step="0.5"
                value={enHours}
                onChange={(e) => setEnHours(e.target.value)}
                placeholder="e.g. 84"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Care Worker (PCW/AIN) Hours/Week
              </label>
              <input
                type="number"
                step="0.5"
                value={pcwHours}
                onChange={(e) => setPcwHours(e.target.value)}
                placeholder="e.g. 420"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <strong>Note:</strong> Enter only "worked hours" (excluding leave, training, admin time). This matches what you report in your Quarterly Financial Report (QFR).
        </div>

        <button
          onClick={handleCalculate}
          disabled={!beds || (!rnHours && !enHours && !pcwHours)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Compliance Status
        </button>
      </div>

      {/* Results */}
      {showResults && beds && (rnHours || enHours || pcwHours) && (
        <div className="space-y-6">
          {/* Status Card */}
          <div className={`p-6 rounded-lg border-2 ${getStatusColor()}`}>
            <div className="flex items-center gap-4 mb-4">
              {getStatusIcon()}
              <div>
                <h2 className="text-2xl font-bold">{getStatusMessage()}</h2>
                <div className="text-sm space-y-1">
                  <p>Total: {results.careMinutesPerResident} minutes/resident/day ({results.totalCompliancePercentage}% of 215 required)</p>
                  <p>RN Care: {results.rnMinutesPerResident} minutes/resident/day ({results.rnCompliancePercentage}% of 44 required)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Performance */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Current Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total weekly hours:</span>
                  <span className="font-semibold">{results.totalWeeklyHours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Care minutes/resident/day:</span>
                  <span className="font-semibold">{results.careMinutesPerResident} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RN minutes/resident/day:</span>
                  <span className="font-semibold">{results.rnMinutesPerResident} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Residents:</span>
                  <span className="font-semibold">{results.residentCount}</span>
                </div>
              </div>
            </div>

            {/* Compliance Targets */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Compliance Targets</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Total required:</span>
                  <span className="font-semibold text-blue-800">215 minutes/resident/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">RN required:</span>
                  <span className="font-semibold text-blue-800">44 minutes/resident/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total compliance:</span>
                  <span className={`font-semibold ${results.isTotalCompliant ? 'text-green-600' : 'text-red-600'}`}>
                    {results.totalCompliancePercentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">RN compliance:</span>
                  <span className={`font-semibold ${results.isRnCompliant ? 'text-green-600' : 'text-red-600'}`}>
                    {results.rnCompliancePercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shortfall Analysis */}
          {!results.isCompliant && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-800 mb-4">Gap Analysis & Penalty Risk</h3>
              
              {results.totalShortfall > 0 && (
                <div className="mb-4 p-3 bg-white rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Care Shortfall:</span>
                    <span className="text-red-600 font-bold">{results.totalShortfall} minutes/resident/day</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Need {Math.ceil((results.totalShortfall * results.residentCount * 7) / 60)} more weekly hours across all staff
                  </div>
                </div>
              )}

              {results.rnShortfall > 0 && (
                <div className="mb-4 p-3 bg-white rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">RN Care Shortfall:</span>
                    <span className="text-red-600 font-bold">{results.rnShortfall} minutes/resident/day</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Need {Math.ceil((results.rnShortfall * results.residentCount * 7) / 60)} more weekly RN hours
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mt-4">
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
                <strong>Risk:</strong> From October 2025, non-compliant metropolitan facilities may face funding reductions of up to $31.92 per bed per day.
              </div>
            </div>
          )}

          {/* Success Message */}
          {results.isCompliant && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-800 mb-2">Congratulations!</h3>
              <p className="text-green-700">
                Your facility is meeting both the total care minutes (215) and RN care minutes (44) requirements.
              </p>
            </div>
          )}

          {/* Lead Capture */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-blue-800 mb-2">
              Want Real-Time Compliance Tracking?
            </h3>
            <p className="text-blue-700 mb-4">
              We're developing a comprehensive solution that automates this calculation with your roster data.
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
                  <option value="">What's your biggest care minutes challenge?</option>
                  <option value="roster-to-compliance">Converting weekly rosters into compliance metrics</option>
                  <option value="real-time-tracking">Tracking compliance in real-time, not just quarterly</option>
                  <option value="manual-calculations">Manual spreadsheet calculations taking too much time</option>
                  <option value="gpms-qfr-reporting">Streamlining QFR/GPMS reporting processes</option>
                  <option value="audit-preparation">Preparing evidence for ACQSC audits</option>
                  <option value="penalty-avoidance">Avoiding compliance penalties and funding cuts</option>
                  <option value="staff-planning">Planning how many staff hours needed for compliance</option>
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

      {/* Legal Disclaimers */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ Important Disclaimers</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>This calculator is for estimation purposes only</strong> and does not constitute legal, financial, or compliance advice.</p>
          <p>• Results are estimates based on standard care minutes calculation methods</p>
          <p>• Actual compliance determinations are made solely by ACQSC using your QFR data</p>
          <p>• Calculations assume standard workforce allocation and exclude leave/training time</p>
          <p>• Regulations and penalty rates are subject to change</p>
          <p>• Not responsible for compliance decisions based on this tool</p>
          <p><strong>Professional advice recommended:</strong> Consult your compliance officer, legal advisor, or aged care consultant for official guidance on care minutes compliance.</p>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        <p>Last updated: July 2025 | Based on current Australian aged care regulations and QFR reporting requirements</p>
      </div>
    </div>
  );
}

export default CalculatorComponent;