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
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        formData.append('additional_feedback', additionalFeedback || 'Not provided');
        formData.append('staffing_data', `${results.bedCount} beds, ${results.residentCount} residents, ${results.totalWeeklyHours} total weekly hours`);
        formData.append('compliance_results', `${results.careMinutesPerResident} total mins/resident (${results.totalCompliancePercentage}%), ${results.rnMinutesPerResident} RN mins/resident (${results.rnCompliancePercentage}%)`);
        formData.append('penalty_risk', `$${results.annualPenalty.toLocaleString()} annual risk`);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          setIsSubmitted(true);
          // Clear form after submission
          setEmail('');
          setContactName('');
          setFacilityName('');
          setPhone('');
          setBiggestPainPoint('');
          setAdditionalFeedback('');
        } else {
          alert('Thank you for your interest! Please email us directly at ryanrezel@gmail.com');
        }
      } catch (error) {
        alert('Thank you for your interest! Please email us directly at ryanrezel@gmail.com');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Care Minutes Compliance Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Convert your weekly roster into care minutes compliance status in 30 seconds
          </p>
        </div>

        {/* Calculator Inputs */}
        <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* Facility Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Facility Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Number of Operational Beds
                </label>
                <input
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Average Daily Residents <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="number"
                  value={residents}
                  onChange={(e) => setResidents(e.target.value)}
                  placeholder={beds ? `Defaults to ${beds} if not specified` : "e.g. 47"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Weekly Staff Hours */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Staff Hours (Worked Hours Only)</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Registered Nurse (RN) Hours/Week
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={rnHours}
                  onChange={(e) => setRnHours(e.target.value)}
                  placeholder="e.g. 168"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enrolled Nurse (EN) Hours/Week
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={enHours}
                  onChange={(e) => setEnHours(e.target.value)}
                  placeholder="e.g. 84"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Personal Care Worker (PCW/AIN) Hours/Week
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={pcwHours}
                  onChange={(e) => setPcwHours(e.target.value)}
                  placeholder="e.g. 420"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Enter only "worked hours" (excluding leave, training, admin time). This matches what you report in your Quarterly Financial Report (QFR).
            </p>
          </div>

          <button
            onClick={handleCalculate}
            disabled={!beds || (!rnHours && !enHours && !pcwHours)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-3 text-base disabled:cursor-not-allowed"
          >
            <Calculator className="w-5 h-5" />
            Calculate Compliance Status
          </button>
        </div>

        {/* Results */}
        {showResults && beds && (rnHours || enHours || pcwHours) && (
          <div className="space-y-8">
            {/* Status Card */}
            <div className={`p-6 sm:p-8 rounded-xl border-2 shadow-sm ${getStatusColor()}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {getStatusIcon()}
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">{getStatusMessage()}</h2>
                  <div className="text-sm sm:text-base space-y-1 sm:space-y-2">
                    <p>Total: <span className="font-semibold">{results.careMinutesPerResident} minutes/resident/day</span> ({results.totalCompliancePercentage}% of 215 required)</p>
                    <p>RN Care: <span className="font-semibold">{results.rnMinutesPerResident} minutes/resident/day</span> ({results.rnCompliancePercentage}% of 44 required)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current Performance */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">Current Performance</h3>
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">Total weekly hours</div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{results.totalWeeklyHours}</div>
                    <div className="text-sm text-gray-500">hours</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">Care minutes/resident/day</div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{results.careMinutesPerResident}</div>
                    <div className="text-sm text-gray-500">minutes</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">RN minutes/resident/day</div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{results.rnMinutesPerResident}</div>
                    <div className="text-sm text-gray-500">minutes</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">Residents</div>
                    <div className="text-4xl font-bold text-gray-900">{results.residentCount}</div>
                  </div>
                </div>
              </div>

              {/* Compliance Targets */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 shadow-sm h-fit">
                <h3 className="text-xl font-bold text-blue-900 mb-8 text-center">Compliance Targets</h3>
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-700 mb-2">Total required</div>
                    <div className="text-4xl font-bold text-blue-900 mb-1">215</div>
                    <div className="text-sm text-blue-600">minutes/resident/day</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-700 mb-2">RN required</div>
                    <div className="text-4xl font-bold text-blue-900 mb-1">44</div>
                    <div className="text-sm text-blue-600">minutes/resident/day</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-700 mb-2">Total compliance</div>
                    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-4xl font-bold ${
                      results.isTotalCompliant 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {results.totalCompliancePercentage}%
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-700 mb-2">RN compliance</div>
                    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-4xl font-bold ${
                      results.isRnCompliant 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {results.rnCompliancePercentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How This Calculation Works */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">📊 How This Calculation Works</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                
                <div className="mt-6 space-y-4 text-sm text-gray-700 leading-relaxed">
                  <p className="font-medium text-gray-900">Our calculator uses the exact same method required for QFR reporting:</p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Step 1: Total Weekly Hours</h4>
                      <p>RN + EN + PCW hours (worked hours only, excluding leave/training)</p>
                      <div className="bg-white p-3 rounded border font-mono text-xs">
                        {results.totalWeeklyHours} hours/week
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Step 2: Convert to Daily Minutes</h4>
                      <p>(Weekly hours × 60 minutes) ÷ 7 days</p>
                      <div className="bg-white p-3 rounded border font-mono text-xs">
                        ({results.totalWeeklyHours} × 60) ÷ 7 = {Math.round((results.totalWeeklyHours * 60) / 7)} mins/day
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Step 3: Calculate Per Resident</h4>
                      <p>Daily minutes ÷ Average daily residents</p>
                      <div className="bg-white p-3 rounded border font-mono text-xs">
                        {Math.round((results.totalWeeklyHours * 60) / 7)} ÷ {results.residentCount} = {results.careMinutesPerResident} mins/resident/day
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Step 4: Compare to Targets</h4>
                      <p>215 total minutes, 44 RN minutes per resident per day</p>
                      <div className="bg-white p-3 rounded border font-mono text-xs">
                        {results.careMinutesPerResident} ÷ 215 = {results.totalCompliancePercentage}% compliance
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-900 font-medium">Official Formula:</p>
                    <p className="text-blue-800 font-mono text-xs mt-1">
                      Total care minutes ÷ Occupied bed days = Minutes per resident per day
                    </p>
                    <p className="text-blue-700 text-xs mt-2">
                      Source: Department of Health QFR Reporting Guidelines
                    </p>
                  </div>
                </div>
              </details>
            </div>

            {/* Shortfall Analysis */}
            {!results.isCompliant && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-6">Gap Analysis & Penalty Risk</h3>
                
                {results.totalShortfall > 0 && (
                  <div className="mb-6 p-4 sm:p-6 bg-white rounded-lg border border-red-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="font-medium text-gray-900">Total Care Shortfall:</span>
                      <span className="text-red-700 font-bold text-lg">{results.totalShortfall} minutes/resident/day</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Need {Math.ceil((results.totalShortfall * results.residentCount * 7) / 60)} more weekly hours across all staff
                    </div>
                  </div>
                )}

                {results.rnShortfall > 0 && (
                  <div className="mb-6 p-4 sm:p-6 bg-white rounded-lg border border-red-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="font-medium text-gray-900">RN Care Shortfall:</span>
                      <span className="text-red-700 font-bold text-lg">{results.rnShortfall} minutes/resident/day</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Need {Math.ceil((results.rnShortfall * results.residentCount * 7) / 60)} more weekly RN hours
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-6">
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-red-200">
                    <div className="text-2xl sm:text-3xl font-bold text-red-700 mb-1">
                      ${results.annualPenalty.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Annual penalty risk</div>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-red-200">
                    <div className="text-2xl sm:text-3xl font-bold text-red-700 mb-1">
                      ${Math.round(results.dailyPenalty).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Daily penalty risk</div>
                  </div>
                </div>
                
                <div className="p-4 bg-red-100 rounded-lg">
                  <p className="text-sm text-red-900">
                    <strong>Risk:</strong> From April 2026, non-compliant metropolitan facilities may face funding reductions of up to $31.92 per bed per day.
                  </p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {results.isCompliant && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3">Congratulations!</h3>
                <p className="text-green-800">
                  Your facility is meeting both the total care minutes (215) and RN care minutes (44) requirements.
                </p>
              </div>
            )}

            {/* Lead Capture */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8 shadow-sm text-center">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                Help Us Build What You Need Most
              </h3>
              <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
                Our development roadmap is driven by user feedback. Tell us your biggest challenge so we can prioritize features that matter to you.
              </p>
              
              {!isSubmitted ? (
                !showEmailForm ? (
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-3 mx-auto"
                  >
                    <Phone className="w-5 h-5" />
                    Share Feedback & Get Updates
                  </button>
                ) : (
                  <div className="max-w-lg mx-auto space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      placeholder="Facility name *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <select
                      value={biggestPainPoint}
                      onChange={(e) => setBiggestPainPoint(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="">What's your biggest care minutes challenge? *</option>
                      <option value="roster-to-compliance">Converting weekly rosters into compliance metrics</option>
                      <option value="real-time-tracking">Tracking compliance in real-time, not just quarterly</option>
                      <option value="manual-calculations">Manual spreadsheet calculations taking too much time</option>
                      <option value="gpms-qfr-reporting">Streamlining QFR/GPMS reporting processes</option>
                      <option value="audit-preparation">Preparing evidence for ACQSC audits</option>
                      <option value="penalty-avoidance">Avoiding compliance penalties and funding cuts</option>
                      <option value="staff-planning">Planning how many staff hours needed for compliance</option>
                      <option value="other">Other (please tell us what you need most)</option>
                    </select>
                    
                    {/* Additional Feedback Field */}
                    <div className="text-left">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Any specific challenges or features you'd like to see? (Optional)
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about your specific situation, challenges, or what would help you most..."
                        rows="3"
                        value={additionalFeedback}
                        onChange={(e) => setAdditionalFeedback(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Your feedback helps us prioritize which features to build next
                      </p>
                    </div>
                    
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <button
                      onClick={handleSubmitLead}
                      disabled={!email || !contactName || !facilityName || !biggestPainPoint}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      Share Feedback & Get Updates
                    </button>
                    <p className="text-xs text-blue-700">
                      * Required fields. We'll use this to understand your needs and keep you updated on relevant features.
                    </p>
                  </div>
                )
              ) : (
                <div className="max-w-md mx-auto">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-green-900 mb-2">Thank You!</h4>
                  <p className="text-green-800 mb-4">
                    Your feedback has been received. We'll prioritize features based on demand and keep you updated on developments.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                    <Phone className="w-4 h-4" />
                    <span>We may reach out to learn more about your specific needs</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Legal Disclaimers */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Important Disclaimers
          </h3>
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p><strong>This calculator is for estimation purposes only</strong> and does not constitute legal, financial, or compliance advice.</p>
            <ul className="space-y-2 ml-4">
              <li>• Results are estimates based on standard care minutes calculation methods</li>
              <li>• Actual compliance determinations are made solely by ACQSC using your QFR data</li>
              <li>• Calculations assume standard workforce allocation and exclude leave/training time</li>
              <li>• Regulations and penalty rates are subject to change</li>
              <li>• Not responsible for compliance decisions based on this tool</li>
            </ul>
            <p><strong>Professional advice recommended:</strong> Consult your compliance officer, legal advisor, or aged care consultant for official guidance on care minutes compliance.</p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Last updated: July 2025 | Based on current Australian aged care regulations and QFR reporting requirements</p>
        </div>
      </div>
    </div>
  );
}

export default CalculatorComponent; 