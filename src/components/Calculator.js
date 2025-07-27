import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle, Info, Clock, Users } from 'lucide-react';

function SimplifiedHealthcareCalculator() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Form state
  const [beds, setBeds] = useState('');
  const [residents, setResidents] = useState('');
  const [rnHours, setRnHours] = useState('');
  const [enHours, setEnHours] = useState('');
  const [pcwHours, setPcwHours] = useState('');

  // Calculate compliance
  const totalWeeklyHours = (parseFloat(rnHours) || 0) + (parseFloat(enHours) || 0) + (parseFloat(pcwHours) || 0);
  const residentCount = parseInt(residents) || parseInt(beds) || 0;
  const dailyCareMinutes = (totalWeeklyHours * 60) / 7;
  const careMinutesPerResident = residentCount > 0 ? dailyCareMinutes / residentCount : 0;
  const compliancePercentage = (careMinutesPerResident / 215) * 100;
  
  // RN-specific calculation
  const rnDailyMinutes = ((parseFloat(rnHours) || 0) * 60) / 7;
  const rnMinutesPerResident = residentCount > 0 ? rnDailyMinutes / residentCount : 0;
  const rnCompliancePercentage = (rnMinutesPerResident / 44) * 100;
  
  // Overall compliance status
  const isCompliant = compliancePercentage >= 100 && rnCompliancePercentage >= 100;
  const isAtRisk = (compliancePercentage >= 90 && compliancePercentage < 100) || 
                   (rnCompliancePercentage >= 90 && rnCompliancePercentage < 100);

  const getComplianceStatus = () => {
    if (isCompliant) {
      return {
        status: 'Compliant',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: CheckCircle
      };
    } else if (isAtRisk) {
      return {
        status: 'At Risk',
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: AlertTriangle
      };
    } else {
      return {
        status: 'Non-Compliant',
        color: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: XCircle
      };
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsCalculating(false);
    setShowResults(true);
  };

  const compliance = getComplianceStatus();
  const StatusIcon = compliance.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Care Minutes Compliance Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check your estimated compliance for planning purposes
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                <strong>Planning Tool Only:</strong> This tool is for internal planning use only and does not replace official GPMS reporting. No data is stored.
              </p>
            </div>
          </div>
        </div>

        {/* How This Works */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-medium text-gray-900">How This Works</h2>
            {showHowItWorks ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {showHowItWorks && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="pt-4 space-y-3 text-sm text-gray-700">
                <p>• <strong>Care minutes</strong> are the total hours staff spend directly caring for residents.</p>
                <p>• <strong>The government</strong> sets minimum staffing levels based on resident needs.</p>
                <p>• <strong>This calculator</strong> helps you estimate if your weekly staffing meets those targets.</p>
                <p className="text-xs text-gray-500 mt-4">
                  <strong>Target:</strong> 215 total care minutes per resident per day (including 44 minutes from registered nurses)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Facility Information Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Facility Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Operational Beds
                </label>
                <input
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Daily Residents
                  <span className="text-xs text-gray-500 ml-2">(optional)</span>
                </label>
                <input
                  type="number"
                  value={residents}
                  onChange={(e) => setResidents(e.target.value)}
                  placeholder={beds ? `Defaults to ${beds}` : "e.g. 115"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to use bed count</p>
              </div>
            </div>
          </div>

          {/* Weekly Staff Hours Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Staff Hours</h3>
            <p className="text-sm text-gray-600 mb-4">Enter worked hours only (excluding leave, training, admin)</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registered Nurse (RN) Hours
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={rnHours}
                  onChange={(e) => setRnHours(e.target.value)}
                  placeholder="e.g. 336"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enrolled Nurse (EN) Hours
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={enHours}
                  onChange={(e) => setEnHours(e.target.value)}
                  placeholder="e.g. 168"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Care Worker (PCW) Hours
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={pcwHours}
                  onChange={(e) => setPcwHours(e.target.value)}
                  placeholder="e.g. 840"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleCalculate}
            disabled={!beds || (!rnHours && !enHours && !pcwHours) || isCalculating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-3 mx-auto disabled:cursor-not-allowed min-w-[200px]"
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

        {/* Results Panel */}
        {showResults && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Compliance Results</h3>
            
            {/* Compliance Status */}
            <div className={`rounded-lg border ${compliance.border} ${compliance.bg} p-4 mb-6`}>
              <div className="flex items-center space-x-3">
                <StatusIcon className={`w-6 h-6 ${compliance.color}`} />
                <div>
                  <h4 className={`text-lg font-semibold ${compliance.color}`}>
                    {compliance.status}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Current staffing levels {isCompliant ? 'meet' : isAtRisk ? 'are close to' : 'do not meet'} compliance targets
                  </p>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              {/* Care Minutes Target */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <h5 className="text-sm font-medium text-gray-700">Target</h5>
                </div>
                <p className="text-2xl font-bold text-gray-900">215</p>
                <p className="text-xs text-gray-500">minutes per resident per day</p>
              </div>

              {/* Your Weekly Total */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <h5 className="text-sm font-medium text-gray-700">Your Current</h5>
                </div>
                <p className="text-2xl font-bold text-gray-900">{careMinutesPerResident.toFixed(1)}</p>
                <p className="text-xs text-gray-500">minutes per resident per day</p>
              </div>

              {/* Compliance Percentage */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="w-4 h-4 text-gray-500" />
                  <h5 className="text-sm font-medium text-gray-700">Compliance Rate</h5>
                </div>
                <p className={`text-2xl font-bold ${compliance.color}`}>
                  {Math.round(compliancePercentage)}%
                </p>
                <p className="text-xs text-gray-500">of target requirement</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to Target</span>
                <span>{Math.round(compliancePercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isCompliant ? 'bg-emerald-500' : isAtRisk ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(compliancePercentage, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="border-t border-gray-200 pt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Breakdown</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total weekly hours:</span>
                  <span className="font-medium">{totalWeeklyHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RN compliance:</span>
                  <span className={`font-medium ${rnCompliancePercentage >= 100 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {Math.round(rnCompliancePercentage)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average residents:</span>
                  <span className="font-medium">{residentCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RN minutes/day:</span>
                  <span className="font-medium">{rnMinutesPerResident.toFixed(1)}/44</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimplifiedHealthcareCalculator;