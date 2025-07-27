import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Calculator, Phone, Info, ChevronDown } from 'lucide-react';

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
  const [isCalculating, setIsCalculating] = useState(false);

  const targetMinutes = 215;
  const rnTargetMinutes = 44;
  const penaltyPerBedPerDay = 31.92;

  const calculateCompliance = () => {
    const bedCount = parseInt(beds) || 0;
    const residentCount = parseInt(residents) || bedCount;
    const rnWeeklyHours = parseFloat(rnHours) || 0;
    const enWeeklyHours = parseFloat(enHours) || 0;
    const pcwWeeklyHours = parseFloat(pcwHours) || 0;
    
    const totalWeeklyHours = rnWeeklyHours + enWeeklyHours + pcwWeeklyHours;
    const dailyCareMinutes = (totalWeeklyHours * 60) / 7;
    const careMinutesPerResident = residentCount > 0 ? dailyCareMinutes / residentCount : 0;
    
    const rnDailyMinutes = (rnWeeklyHours * 60) / 7;
    const rnMinutesPerResident = residentCount > 0 ? rnDailyMinutes / residentCount : 0;
    
    const totalCompliancePercentage = Math.round((careMinutesPerResident / targetMinutes) * 100);
    const rnCompliancePercentage = Math.round((rnMinutesPerResident / rnTargetMinutes) * 100);
    
    const totalShortfall = Math.max(0, targetMinutes - careMinutesPerResident);
    const rnShortfall = Math.max(0, rnTargetMinutes - rnMinutesPerResident);
    
    const dailyPenalty = bedCount * penaltyPerBedPerDay;
    const annualPenalty = dailyPenalty * 365;
    
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

  const handleCalculate = async () => {
    if (beds && (rnHours || enHours || pcwHours)) {
      setIsCalculating(true);
      // Simulate calculation time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowResults(true);
      setIsCalculating(false);
    }
  };

  const getStatusColor = () => {
    if (results.isCompliant) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (results.totalCompliancePercentage >= 90 && results.rnCompliancePercentage >= 90) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getStatusIcon = () => {
    if (results.isCompliant) return <CheckCircle className="w-8 h-8 text-emerald-600" />;
    if (results.totalCompliancePercentage >= 90 && results.rnCompliancePercentage >= 90) return <AlertTriangle className="w-8 h-8 text-amber-600" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  const getStatusMessage = () => {
    if (results.isCompliant) return "Fully Compliant";
    if (results.totalCompliancePercentage >= 90 && results.rnCompliancePercentage >= 90) return "Almost Compliant";
    return "Non-Compliant Risk";
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
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Care Minutes Compliance Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Check your estimated compliance for planning purposes only
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">This tool is for internal planning use only and does not replace official GPMS reporting.</p>
              <p>No data is stored. Results are estimates based on standard care minutes calculation methods.</p>
            </div>
          </div>
        </div>

        {/* How This Works - Collapsible Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-8">
          <details className="group">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">How This Works</h3>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200" />
            </summary>
            
            <div className="px-6 pb-6 border-t border-slate-100">
              <div className="pt-6 space-y-6">
                <div className="prose prose-sm text-slate-700 max-w-none">
                  <p><strong>Care minutes</strong> are the total hours staff spend directly caring for residents.</p>
                  <p><strong>The government</strong> sets minimum staffing levels based on resident needs.</p>
                  <p><strong>This calculator</strong> helps you estimate if your weekly staffing meets those targets.</p>
                </div>
                
                {/* Calculation Steps Grid */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                      <h4 className="font-semibold text-slate-900">Calculate Total Weekly Hours</h4>
                    </div>
                    <p className="text-sm text-slate-600 ml-9">Add RN + EN + PCW worked hours (excluding leave/training)</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                      <h4 className="font-semibold text-slate-900">Convert to Daily Minutes</h4>
                    </div>
                    <p className="text-sm text-slate-600 ml-9">(Weekly hours × 60 minutes) ÷ 7 days</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                      <h4 className="font-semibold text-slate-900">Calculate Per Resident</h4>
                    </div>
                    <p className="text-sm text-slate-600 ml-9">Daily minutes ÷ Average daily residents</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                      <h4 className="font-semibold text-slate-900">Compare to Targets</h4>
                    </div>
                    <p className="text-sm text-slate-600 ml-9">215 total minutes, 44 RN minutes per resident per day</p>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Input Form */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 mb-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Headers */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-slate-900">Facility Information</h3>
                </div>
                <p className="text-sm text-slate-600 ml-5">Basic facility details for calculation</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-slate-900">Weekly Staff Hours</h3>
                </div>
                <p className="text-sm text-slate-600 ml-5">Worked hours only (excluding leave/training)</p>
              </div>
            </div>

            {/* Input Fields Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Facility Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Number of Operational Beds
                  </label>
                  <input
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full h-14 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Average Daily Residents
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      Optional
                    </span>
                  </label>
                  <input
                    type="number"
                    value={residents}
                    onChange={(e) => setResidents(e.target.value)}
                    placeholder={beds ? `Defaults to ${beds} if not specified` : "e.g. 47"}
                    className="w-full h-14 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base"
                  />
                </div>
                
                {/* Spacer for alignment */}
                <div className="h-14 lg:block hidden"></div>
              </div>

              {/* Right Column - Weekly Staff Hours */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Registered Nurse (RN)
                    <span className="ml-2 text-xs text-slate-500 font-normal">HRS/WK</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={rnHours}
                    onChange={(e) => setRnHours(e.target.value)}
                    placeholder="e.g. 168"
                    className="w-full h-14 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Enrolled Nurse (EN)
                    <span className="ml-2 text-xs text-slate-500 font-normal">HRS/WK</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={enHours}
                    onChange={(e) => setEnHours(e.target.value)}
                    placeholder="e.g. 84"
                    className="w-full h-14 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Personal Care Worker (PCW/AIN)
                    <span className="ml-2 text-xs text-slate-500 font-normal">HRS/WK</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={pcwHours}
                    onChange={(e) => setPcwHours(e.target.value)}
                    placeholder="e.g. 420"
                    className="w-full h-14 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={handleCalculate}
              disabled={!beds || (!rnHours && !enHours && !pcwHours) || isCalculating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 text-base disabled:cursor-not-allowed shadow-sm"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Check Compliance
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && beds && (rnHours || enHours || pcwHours) && (
          <div className="space-y-8">
            {/* Status Card */}
            <div className={`p-8 rounded-xl border-2 shadow-sm ${getStatusColor()}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {getStatusIcon()}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-3">{getStatusMessage()}</h2>
                  <div className="space-y-2">
                    <p className="text-lg">
                      <span className="font-medium">Total Care:</span> {results.careMinutesPerResident} minutes/resident/day 
                      <span className="ml-2 text-sm">({results.totalCompliancePercentage}% of 215 required)</span>
                    </p>
                    <p className="text-lg">
                      <span className="font-medium">RN Care:</span> {results.rnMinutesPerResident} minutes/resident/day 
                      <span className="ml-2 text-sm">({results.rnCompliancePercentage}% of 44 required)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Cards Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-slate-600 mb-2">Current Performance</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">{results.careMinutesPerResident}</div>
                <div className="text-sm text-slate-500">minutes per resident per day</div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-slate-600 mb-2">Compliance Target</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">215</div>
                <div className="text-sm text-slate-500">minutes per resident per day</div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-slate-600 mb-2">Compliance Status</h3>
                <div className={`text-3xl font-bold mb-1 ${
                  results.isTotalCompliant ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {results.totalCompliancePercentage}%
                </div>
                <div className="text-sm text-slate-500">of target achieved</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current Performance */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 shadow-sm h-fit">
                <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Current Performance</h3>
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-600 mb-2">Total weekly hours</div>
                    <div className="text-4xl font-bold text-slate-900 mb-1">{results.totalWeeklyHours}</div>
                    <div className="text-sm text-slate-500">hours</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-600 mb-2">Care minutes/resident/day</div>
                    <div className="text-4xl font-bold text-slate-900 mb-1">{results.careMinutesPerResident}</div>
                    <div className="text-sm text-slate-500">minutes</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-600 mb-2">RN minutes/resident/day</div>
                    <div className="text-4xl font-bold text-slate-900 mb-1">{results.rnMinutesPerResident}</div>
                    <div className="text-sm text-slate-500">minutes</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-600 mb-2">Residents</div>
                    <div className="text-4xl font-bold text-slate-900">{results.residentCount}</div>
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
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {results.totalCompliancePercentage}%
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-700 mb-2">RN compliance</div>
                    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-4xl font-bold ${
                      results.isRnCompliant
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {results.rnCompliancePercentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shortfall Analysis */}
            {!results.isCompliant && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-6">Gap Analysis & Penalty Risk</h3>
                
                {results.totalShortfall > 0 && (
                  <div className="mb-6 p-4 sm:p-6 bg-white rounded-lg border border-red-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="font-medium text-slate-900">Total Care Shortfall:</span>
                      <span className="text-red-700 font-bold text-lg">{results.totalShortfall} minutes/resident/day</span>
                    </div>
                    <div className="text-sm text-slate-600 mt-2">
                      Need {Math.ceil((results.totalShortfall * results.residentCount * 7) / 60)} more weekly hours across all staff
                    </div>
                  </div>
                )}

                {results.rnShortfall > 0 && (
                  <div className="mb-6 p-4 sm:p-6 bg-white rounded-lg border border-red-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="font-medium text-slate-900">RN Care Shortfall:</span>
                      <span className="text-red-700 font-bold text-lg">{results.rnShortfall} minutes/resident/day</span>
                    </div>
                    <div className="text-sm text-slate-600 mt-2">
                      Need {Math.ceil((results.rnShortfall * results.residentCount * 7) / 60)} more weekly RN hours
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-6">
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-red-200">
                    <div className="text-2xl sm:text-3xl font-bold text-red-700 mb-1">
                      ${results.annualPenalty.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Annual penalty risk</div>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-red-200">
                    <div className="text-2xl sm:text-3xl font-bold text-red-700 mb-1">
                      ${Math.round(results.dailyPenalty).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Daily penalty risk</div>
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
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-900 mb-3">Congratulations!</h3>
                <p className="text-emerald-800">
                  Your facility is meeting both the total care minutes (215) and RN care minutes (44) requirements.
                </p>
              </div>
            )}

            {/* Lead Capture Form */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Help Us Build What You Need Most
              </h3>
              <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
                Share your biggest challenge so we can prioritize features that matter to you.
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      placeholder="Facility name *"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <select
                      value={biggestPainPoint}
                      onChange={(e) => setBiggestPainPoint(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
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
                    
                    <div className="text-left">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Any specific challenges or features you'd like to see? (Optional)
                      </label>
                      <textarea
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about your specific situation..."
                        rows="3"
                        value={additionalFeedback}
                        onChange={(e) => setAdditionalFeedback(e.target.value)}
                      />
                    </div>
                    
                    <button
                      onClick={handleSubmitLead}
                      disabled={!email || !contactName || !facilityName || !biggestPainPoint}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      Share Feedback & Get Updates
                    </button>
                  </div>
                )
              ) : (
                <div className="max-w-md mx-auto">
                  <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-emerald-900 mb-2">Thank You!</h4>
                  <p className="text-emerald-800">
                    Your feedback helps us prioritize which features to build next.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Legal Disclaimers */}
        <div className="mt-12 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Important Disclaimers
          </h3>
          <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
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
      </div>
    </div>
  );
}

export default CalculatorComponent;