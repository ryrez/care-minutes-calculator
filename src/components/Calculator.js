import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Calculator, Phone, Info, ChevronDown, TrendingUp, Users, Clock, Target, HelpCircle, Bell, BellOff } from 'lucide-react';

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
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [userRole, setUserRole] = useState('manager'); // manager, nurse, admin
  const [alertsEnabled, setAlertsEnabled] = useState(true);

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

  const getComplianceStatus = () => {
    if (results.isCompliant) return { level: 'success', color: 'emerald', message: 'Fully Compliant', icon: CheckCircle };
    if (results.totalCompliancePercentage >= 90 && results.rnCompliancePercentage >= 90) 
      return { level: 'warning', color: 'amber', message: 'Almost Compliant', icon: AlertTriangle };
    return { level: 'critical', color: 'red', message: 'Non-Compliant Risk', icon: XCircle };
  };

  const status = getComplianceStatus();

  const Tooltip = ({ content, children, id }) => (
    <div className="relative inline-block">
      <button
        className="text-slate-400 hover:text-slate-600 transition-colors"
        onMouseEnter={() => setActiveTooltip(id)}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => setActiveTooltip(activeTooltip === id ? null : id)}
      >
        {children}
      </button>
      {activeTooltip === id && (
        <div className="absolute z-10 w-64 p-3 text-sm bg-slate-900 text-white rounded-lg shadow-lg -top-2 left-6 transform">
          <div className="absolute -left-1 top-3 w-2 h-2 bg-slate-900 rotate-45"></div>
          {content}
        </div>
      )}
    </div>
  );

  const DecisionSupportAlert = ({ type, message, action }) => {
    if (!alertsEnabled) return null;
    
    const alertStyles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-amber-50 border-amber-200 text-amber-800',
      success: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    };

    return (
      <div className={`border rounded-lg p-4 mb-4 ${alertStyles[type]}`}>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
            {action && (
              <button className="text-xs underline mt-1 hover:no-underline">
                {action}
              </button>
            )}
          </div>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-slate-50">
      {/* Role-based Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-slate-900">Care Minutes Calculator</h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Planning Tool
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Alert Toggle */}
              <button
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {alertsEnabled ? (
                  <Bell className="w-5 h-5 text-slate-600" />
                ) : (
                  <BellOff className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {/* Role Selector */}
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="manager">Facility Manager</option>
                <option value="nurse">Nursing Staff</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Mobile-Friendly Dashboard Cards */}
        {showResults && (
          <div className="mb-8">
            {/* Primary Status Card - Mobile First */}
            <div className={`p-6 rounded-xl border-2 shadow-sm mb-6 bg-${status.color}-50 border-${status.color}-200`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <status.icon className={`w-8 h-8 text-${status.color}-600 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <h2 className={`text-2xl sm:text-3xl font-bold text-${status.color}-900 mb-2`}>
                    {status.message}
                  </h2>
                  <div className="space-y-1">
                    <p className={`text-${status.color}-800`}>
                      <span className="font-medium">Total:</span> {results.careMinutesPerResident} min/day 
                      <span className="ml-2 text-sm">({results.totalCompliancePercentage}% of target)</span>
                    </p>
                    <p className={`text-${status.color}-800`}>
                      <span className="font-medium">RN:</span> {results.rnMinutesPerResident} min/day 
                      <span className="ml-2 text-sm">({results.rnCompliancePercentage}% of target)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Self-Service Analytics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Residents</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{results.residentCount}</div>
                <div className="text-xs text-slate-500 mt-1">Current occupancy</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-slate-700">Total Hours</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{results.totalWeeklyHours}</div>
                <div className="text-xs text-slate-500 mt-1">Per week</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-slate-700">Care Minutes</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{results.careMinutesPerResident}</div>
                <div className="text-xs text-slate-500 mt-1">Per resident/day</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className={`w-5 h-5 ${results.isCompliant ? 'text-emerald-600' : 'text-red-600'}`} />
                  <span className="text-sm font-medium text-slate-700">Status</span>
                </div>
                <div className={`text-2xl font-bold ${results.isCompliant ? 'text-emerald-600' : 'text-red-600'}`}>
                  {results.totalCompliancePercentage}%
                </div>
                <div className="text-xs text-slate-500 mt-1">Compliance rate</div>
              </div>
            </div>
          </div>
        )}

        {/* Embedded Decision Support - Context-aware alerts */}
        {beds && !showResults && (
          <DecisionSupportAlert
            type="info"
            message={`For ${beds} beds, you'll typically need 400-500 total care hours per week to meet compliance targets.`}
            action="See calculation methodology"
          />
        )}

        {showResults && !results.isCompliant && (
          <DecisionSupportAlert
            type="warning"
            message={`You need ${Math.ceil((results.totalShortfall * results.residentCount * 7) / 60)} more weekly hours to reach compliance. Consider increasing ${results.rnShortfall > 0 ? 'RN' : 'total'} staffing.`}
            action="View staffing recommendations"
          />
        )}

        {/* Clean Visual Hierarchy - Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Simplified Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Calculate Compliance</h3>
              <Tooltip content="Enter your current staffing hours to check compliance with care minutes requirements" id="main-help">
                <HelpCircle className="w-5 h-5" />
              </Tooltip>
            </div>
          </div>

          <div className="p-6">
            {/* Facility Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h4 className="font-medium text-slate-900">Facility Information</h4>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Operational Beds
                    <Tooltip content="Total number of beds available for resident occupancy" id="beds-help">
                      <HelpCircle className="w-4 h-4 ml-1 inline" />
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Daily Residents
                    <span className="ml-2 text-xs text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    value={residents}
                    onChange={(e) => setResidents(e.target.value)}
                    placeholder={beds ? `Defaults to ${beds}` : "e.g. 47"}
                    className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Staff Hours - Mobile Optimized */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                <h4 className="font-medium text-slate-900">Weekly Staff Hours</h4>
                <Tooltip content="Enter worked hours only (excluding leave, training, admin time)" id="hours-help">
                  <HelpCircle className="w-4 h-4" />
                </Tooltip>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Registered Nurse (RN)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={rnHours}
                    onChange={(e) => setRnHours(e.target.value)}
                    placeholder="e.g. 168"
                    className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Enrolled Nurse (EN)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={enHours}
                    onChange={(e) => setEnHours(e.target.value)}
                    placeholder="e.g. 84"
                    className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Personal Care Worker (PCW/AIN)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={pcwHours}
                    onChange={(e) => setPcwHours(e.target.value)}
                    placeholder="e.g. 420"
                    className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Calculate Button - Mobile Optimized */}
            <button
              onClick={handleCalculate}
              disabled={!beds || (!rnHours && !enHours && !pcwHours) || isCalculating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 disabled:cursor-not-allowed shadow-sm"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Calculating Compliance...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Check Compliance Status
                </>
              )}
            </button>
          </div>
        </div>

        {/* Self-Service Analytics - Detailed Results */}
        {showResults && (
          <div className="mt-8 space-y-6">
            {/* Contextual Insights */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Insights & Recommendations</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Current Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Total Care Minutes</span>
                      <span className="font-semibold">{results.careMinutesPerResident}/day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">RN Care Minutes</span>
                      <span className="font-semibold">{results.rnMinutesPerResident}/day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Weekly Hours</span>
                      <span className="font-semibold">{results.totalWeeklyHours}hrs</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Compliance Targets</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-700">Total Target</span>
                      <span className="font-semibold text-blue-900">215 min/day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-700">RN Target</span>
                      <span className="font-semibold text-blue-900">44 min/day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-700">Compliance Rate</span>
                      <span className={`font-semibold ${results.isCompliant ? 'text-emerald-600' : 'text-red-600'}`}>
                        {results.totalCompliancePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gap Analysis with Decision Support */}
            {!results.isCompliant && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Gap Analysis & Action Items</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-red-800 mb-3">Staffing Shortfall</h4>
                    {results.totalShortfall > 0 && (
                      <div className="bg-white p-4 rounded-lg border border-red-200 mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Total Care Gap</span>
                          <span className="font-semibold text-red-700">{results.totalShortfall} min/day</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Need {Math.ceil((results.totalShortfall * results.residentCount * 7) / 60)} more weekly hours
                        </p>
                      </div>
                    )}
                    
                    {results.rnShortfall > 0 && (
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">RN Care Gap</span>
                          <span className="font-semibold text-red-700">{results.rnShortfall} min/day</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Need {Math.ceil((results.rnShortfall * results.residentCount * 7) / 60)} more RN hours weekly
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-red-800 mb-3">Financial Risk</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <div className="text-xl font-bold text-red-700">${Math.round(results.dailyPenalty).toLocaleString()}</div>
                        <div className="text-xs text-slate-600">Daily penalty risk</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <div className="text-xl font-bold text-red-700">${results.annualPenalty.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">Annual penalty risk</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {results.isCompliant && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-emerald-900">Compliance Achieved!</h3>
                </div>
                <p className="text-emerald-800">
                  Your facility meets both total care minutes (215) and RN care minutes (44) requirements. 
                  Continue monitoring to maintain compliance.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Feedback Section - Enhanced for Mobile */}
        {showResults && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Help Shape Our Roadmap
              </h3>
              <p className="text-blue-800 text-sm">
                Your feedback drives our development priorities
              </p>
            </div>
            
            {!isSubmitted ? (
              !showEmailForm ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Share Your Feedback
                  </button>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
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
                      Additional feedback (Optional)
                    </label>
                    <textarea
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about your specific challenges..."
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
                    Submit Feedback
                  </button>
                </div>
              )
            ) : (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-emerald-900 mb-2">Thank You!</h4>
                <p className="text-emerald-800 text-sm">
                  Your feedback helps us build features that matter most to aged care providers.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Legal Disclaimers */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-slate-900">Important Disclaimers</h3>
          </div>
          
          <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
            <p>
              <strong>This calculator is for estimation purposes only</strong> and does not constitute legal, financial, or compliance advice.
            </p>
            
            <ul className="space-y-2 ml-4 list-disc">
              <li>Results are estimates based on standard care minutes calculation methods</li>
              <li>Actual compliance determinations are made solely by ACQSC using your QFR data</li>
              <li>Calculations assume standard workforce allocation and exclude leave/training time</li>
              <li>Regulations and penalty rates are subject to change</li>
              <li>Not responsible for compliance decisions based on this tool</li>
            </ul>
            
            <p>
              <strong>Professional advice recommended:</strong> Consult your compliance officer, legal advisor, or aged care consultant for official guidance on care minutes compliance.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Last updated: July 2025 | Based on current Australian aged care regulations</p>
        </div>
      </div>
    </div>
  );