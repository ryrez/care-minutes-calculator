import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Calculator, HelpCircle, Users, Clock, TrendingUp, AlertCircle, Info } from 'lucide-react';

function ModernHealthcareDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [beds, setBeds] = useState('');
  const [residents, setResidents] = useState('');
  const [rnHours, setRnHours] = useState('');
  const [enHours, setEnHours] = useState('');
  const [pcwHours, setPcwHours] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Calculate compliance
  const totalWeeklyHours = (parseFloat(rnHours) || 0) + (parseFloat(enHours) || 0) + (parseFloat(pcwHours) || 0);
  const dailyCareMinutes = (totalWeeklyHours * 60) / 7;
  const residentCount = parseInt(residents) || parseInt(beds) || 0;
  const careMinutesPerResident = residentCount > 0 ? dailyCareMinutes / residentCount : 0;
  const compliancePercentage = (careMinutesPerResident / 215) * 100;
  const rnMinutesPerResident = residentCount > 0 ? ((parseFloat(rnHours) || 0) * 60) / (7 * residentCount) : 0;
  const rnCompliancePercentage = (rnMinutesPerResident / 44) * 100;

  const getRiskLevel = () => {
    if (compliancePercentage >= 100 && rnCompliancePercentage >= 100) {
      return { level: 'Low Risk', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle };
    } else if (compliancePercentage >= 90 || rnCompliancePercentage >= 90) {
      return { level: 'Medium Risk', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle };
    } else {
      return { level: 'High Risk', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle };
    }
  };

  const risk = getRiskLevel();
  const RiskIcon = risk.icon;

  const Tooltip = ({ children, content }) => (
    <div className="group relative inline-flex items-center">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
      </div>
    </div>
  );

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Care Minutes Analytics</h1>
                <p className="text-sm text-slate-600">Compliance monitoring & workforce planning</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-600">Real-time QFR Compliance</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'calculation', label: 'Calculate Compliance', icon: Calculator },
              { id: 'analytics', label: 'Analytics', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-slate-600 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Dashboard Analytics Cards - Always Visible */}
        {(showResults && totalWeeklyHours > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Compliance Status Card */}
            <div className={`bg-white rounded-xl border ${risk.border} p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${risk.bg} rounded-lg flex items-center justify-center`}>
                    <RiskIcon className={`w-5 h-5 ${risk.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-600">Compliance Status</h3>
                    <p className={`text-lg font-semibold ${risk.color}`}>{risk.level}</p>
                  </div>
                </div>
                <Tooltip content="Overall compliance assessment based on care minutes targets">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                </Tooltip>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Total Compliance</span>
                  <span className="text-sm font-medium text-slate-900">{Math.round(compliancePercentage)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${compliancePercentage >= 100 ? 'bg-emerald-500' : compliancePercentage >= 90 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(compliancePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Care Minutes Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-600">Care Minutes</h3>
                    <p className="text-lg font-semibold text-slate-900">{careMinutesPerResident.toFixed(1)}/215</p>
                  </div>
                </div>
                <Tooltip content="Current vs target care minutes per resident per day">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                </Tooltip>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Care</span>
                  <span className="text-slate-900 font-medium">{careMinutesPerResident.toFixed(1)} min/day</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">RN Care</span>
                  <span className="text-slate-900 font-medium">{rnMinutesPerResident.toFixed(1)} min/day</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Target</span>
                  <span className="text-slate-900 font-medium">215 min/day</span>
                </div>
              </div>
            </div>

            {/* Workforce Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-600">Workforce</h3>
                    <p className="text-lg font-semibold text-slate-900">{totalWeeklyHours}h/week</p>
                  </div>
                </div>
                <Tooltip content="Total weekly workforce hours across all care categories">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                </Tooltip>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">RN Hours</span>
                  <span className="text-slate-900 font-medium">{rnHours || 0}h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">EN Hours</span>
                  <span className="text-slate-900 font-medium">{enHours || 0}h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">PCW Hours</span>
                  <span className="text-slate-900 font-medium">{pcwHours || 0}h</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Active Beds', value: beds || '0', icon: '🏥', change: null },
                { label: 'Current Residents', value: residents || beds || '0', icon: '👥', change: null },
                { label: 'Weekly Hours', value: totalWeeklyHours || '0', icon: '⏰', change: null },
                { label: 'Compliance Rate', value: `${Math.round(compliancePercentage) || 0}%`, icon: '📊', change: compliancePercentage >= 100 ? '+5%' : '-2%' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                      {stat.change && (
                        <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                          {stat.change} vs last month
                        </p>
                      )}
                    </div>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl p-8 text-white">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-2">Care Minutes Compliance Dashboard</h2>
                <p className="text-slate-200 mb-6">
                  Monitor your facility's compliance status in real-time. Enter your workforce data to get instant compliance calculations and risk assessments.
                </p>
                <button 
                  onClick={() => setActiveTab('calculation')}
                  className="bg-white text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Start Compliance Check
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculation' && (
          <div className="space-y-6">
            
            {/* Input Form */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Facility & Workforce Data</h2>
                <p className="text-sm text-slate-600 mt-1">Enter your current operational data for compliance calculation</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Facility Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Facility Information</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                          <span>Number of Operational Beds</span>
                          <Tooltip content="Total beds available for resident occupancy">
                            <HelpCircle className="w-4 h-4 text-slate-400" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          value={beds}
                          onChange={(e) => setBeds(e.target.value)}
                          placeholder="e.g. 120"
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                          <span>Average Daily Residents</span>
                          <Tooltip content="Average number of residents per day (optional - defaults to bed count)">
                            <HelpCircle className="w-4 h-4 text-slate-400" />
                          </Tooltip>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Optional</span>
                        </label>
                        <input
                          type="number"
                          value={residents}
                          onChange={(e) => setResidents(e.target.value)}
                          placeholder={beds || "e.g. 115"}
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Workforce Data */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Weekly Workforce Hours</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                          <span>Registered Nurse (RN) Hours</span>
                          <Tooltip content="Weekly worked hours for registered nurses (excluding leave/training)">
                            <HelpCircle className="w-4 h-4 text-slate-400" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={rnHours}
                          onChange={(e) => setRnHours(e.target.value)}
                          placeholder="e.g. 336"
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                          <span>Enrolled Nurse (EN) Hours</span>
                          <Tooltip content="Weekly worked hours for enrolled nurses (excluding leave/training)">
                            <HelpCircle className="w-4 h-4 text-slate-400" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={enHours}
                          onChange={(e) => setEnHours(e.target.value)}
                          placeholder="e.g. 168"
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                          <span>Personal Care Worker (PCW) Hours</span>
                          <Tooltip content="Weekly worked hours for personal care workers (excluding leave/training)">
                            <HelpCircle className="w-4 h-4 text-slate-400" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={pcwHours}
                          onChange={(e) => setPcwHours(e.target.value)}
                          placeholder="e.g. 840"
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* QFR Compliance Note */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">QFR Compliance Note</h4>
                      <p className="text-sm text-blue-800">
                        Enter only "worked hours" (excluding leave, training, admin time). This matches what you report in your Quarterly Financial Report (QFR).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="mt-6">
                  <button
                    onClick={handleCalculate}
                    disabled={!beds || (!rnHours && !enHours && !pcwHours)}
                    className="w-full bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-3 disabled:cursor-not-allowed"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate Compliance Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Advanced Analytics</h3>
              <p className="text-slate-600 mb-4">
                Detailed workforce analytics, trend analysis, and compliance forecasting will be available in the full platform.
              </p>
              <button className="bg-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors">
                Coming Soon
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModernHealthcareDashboard;