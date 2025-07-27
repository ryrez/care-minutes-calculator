import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Calculator, Phone, Info, ChevronDown, Users, Clock, Target, TrendingUp, Shield, FileText, Brain, Activity } from 'lucide-react';

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
      await new Promise(resolve => setTimeout(resolve, 1200));
      setShowResults(true);
      setIsCalculating(false);
    }
  };

  const getRiskLevel = () => {
    if (results.isCompliant) return { level: 'LOW', color: 'emerald', icon: Shield };
    if (results.totalCompliancePercentage >= 90) return { level: 'MEDIUM', color: 'amber', icon: AlertTriangle };
    return { level: 'HIGH', color: 'red', icon: XCircle };
  };

  const risk = getRiskLevel();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Care Minutes Analytics
              </h1>
              <p className="text-slate-600 mt-1">Real-time compliance monitoring for aged care facilities</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                Planning Tool
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Live Calculator</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview Cards - Inspired by Health Catalyst */}
        {showResults && (
          <div className="mb-8">
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              {/* Primary Compliance KPI */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${risk.color}-100`}>
                      <Target className={`w-6 h-6 text-${risk.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Compliance Status</h3>
                      <p className="text-sm text-slate-600">Current care minutes performance</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold bg-${risk.color}-100 text-${risk.color}-700`}>
                    {risk.level} RISK
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {results.totalCompliancePercentage}%
                    </div>
                    <div className="text-sm text-slate-600">Total Care Compliance</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full bg-${risk.color}-500`}
                        style={{ width: `${Math.min(results.totalCompliancePercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {results.rnCompliancePercentage}%
                    </div>
                    <div className="text-sm text-slate-600">RN Care Compliance</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full bg-${results.isRnCompliant ? 'emerald' : 'red'}-500`}
                        style={{ width: `${Math.min(results.rnCompliancePercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics - Inspired by Power BI tiles */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Care Minutes</h4>
                    <p className="text-xs text-slate-600">Per resident/day</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {results.careMinutesPerResident}
                </div>
                <div className="text-sm text-slate-600">
                  Target: 215 minutes
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Workforce</h4>
                    <p className="text-xs text-slate-600">Total weekly hours</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {results.totalWeeklyHours}
                </div>
                <div className="text-sm text-slate-600">
                  {results.residentCount} residents
                </div>
              </div>
            </div>

            {/* Risk Assessment - Inspired by Jvion's empathy-focused design */}
            {!results.isCompliant && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-900 mb-2">Compliance Risk Detected</h3>
                    <p className="text-red-800 mb-4">Your facility may face funding reductions starting April 2026. Take action now to avoid penalties.</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="text-2xl font-bold text-red-700 mb-1">
                          ${results.annualPenalty.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600">Annual funding risk</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="text-2xl font-bold text-red-700 mb-1">
                          {Math.ceil((results.totalShortfall * results.residentCount * 7) / 60)}
                        </div>
                        <div className="text-sm text-slate-600">Additional hours needed/week</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Input Dashboard - Inspired by Tableau's drag-and-drop design */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
          {/* Dashboard Header */}
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Compliance Calculator</h2>
                  <p className="text-sm text-slate-600">Enter your facility data to assess compliance status</p>
                </div>
              </div>
              
              {/* Smart Recommendation - Inspired by Qlik Sense */}
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Smart Analysis</span>
              </div>
            </div>
          </div>

          {/* Input Grid - Inspired by Microsoft Power BI's tile system */}
          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Facility Configuration Panel */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Facility Configuration</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Operational Beds
                    </label>
                    <input
                      type="number"
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      placeholder="50"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-900 placeholder-slate-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Average Daily Residents
                      <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">Optional</span>
                    </label>
                    <input
                      type="number"
                      value={residents}
                      onChange={(e) => setResidents(e.target.value)}
                      placeholder={beds ? `Auto: ${beds}` : "47"}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-900 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Workforce Analytics Panel */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Workforce Analytics</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Registered Nurses (RN)
                      <span className="ml-2 text-xs text-slate-500">hours/week</span>
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={rnHours}
                      onChange={(e) => setRnHours(e.target.value)}
                      placeholder="168"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-900 placeholder-slate-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Enrolled Nurses (EN)
                      <span className="ml-2 text-xs text-slate-500">hours/week</span>
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={enHours}
                      onChange={(e) => setEnHours(e.target.value)}
                      placeholder="84"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-900 placeholder-slate-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Personal Care Workers
                      <span className="ml-2 text-xs text-slate-500">hours/week</span>
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={pcwHours}
                      onChange={(e) => setPcwHours(e.target.value)}
                      placeholder="420"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-900 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-slate-600">Enter worked hours only (excluding leave, training, admin time)</span>
                </div>
                
                {/* Live Validation Indicator */}
                {beds && (rnHours || enHours || pcwHours) && (
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Ready to calculate
                  </div>
                )}
              </div>
              
              <button
                onClick={handleCalculate}
                disabled={!beds || (!rnHours && !enHours && !pcwHours) || isCalculating}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 text-base disabled:cursor-not-allowed shadow-lg"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing Compliance...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Run Compliance Analysis
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Methodology - Inspired by Health Catalyst's clinical design */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
          <details className="group">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-colors border-b border-slate-200 group-open:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">QFR Calculation Methodology</h3>
                  <p className="text-sm text-slate-600">How we calculate care minutes compliance</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200" />
            </summary>
            
            <div className="p-6 bg-slate-50">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Sum Weekly Hours</h4>
                  <p className="text-sm text-slate-600">RN + EN + PCW worked hours</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-emerald-600 font-bold text-sm">2</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Convert to Daily</h4>
                  <p className="text-sm text-slate-600">(Hours × 60) ÷ 7 days</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Per Resident</h4>
                  <p className="text-sm text-slate-600">Minutes ÷ residents</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-orange-600 font-bold text-sm">4</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Compare Targets</h4>
                  <p className="text-sm text-slate-600">215 total, 44 RN minutes</p>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Feedback Collection - Inspired by Clarify Health's personalization */}
        {showResults && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Help Shape Our Analytics Platform
              </h3>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                Your insights drive our development roadmap. Share your biggest challenge to influence our next features.
              </p>
              
              {!isSubmitted ? (
                !showEmailForm ? (
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-3 mx-auto shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Share Your Insights
                  </button>
                ) : (
                  <div className="max-w-lg mx-auto space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address *"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      placeholder="Facility name *"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <select
                      value={biggestPainPoint}
                      onChange={(e) => setBiggestPainPoint(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                        className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about your specific situation..."
                        rows="3"
                        value={additionalFeedback}
                        onChange={(e) => setAdditionalFeedback(e.target.value)}
                      />
                    </div>
                    
                    <button
                      onClick={handleSubmitLead}
                      disabled={!email || !contactName || !facilityName || !biggestPainPoint}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed shadow-lg"
                    >
                      Share Your Insights
                    </button>
                  </div>
                )
              ) : (
                <div className="max-w-md mx-auto">
                  <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-emerald-900 mb-2">Thank You!</h4>
                  <p className="text-emerald-800">
                    Your insights help us build the analytics platform aged care needs.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Legal Disclaimers - Inspired by clinical trust standards */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Important Disclaimers</h3>
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

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Last updated: July 2025 | Based on current Australian aged care regulations and QFR reporting requirements</p>
        </div>
      </div>
    </div>
  );
}

export default CalculatorComponent;