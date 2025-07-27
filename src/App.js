import React, { useState } from 'react';
import { Stethoscope, Shield, CheckCircle, Clock, Users, AlertTriangle, FileText, Activity, TrendingUp, Brain, Target } from 'lucide-react';

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'calculator'

  const navigateToCalculator = () => {
    setCurrentView('calculator');
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="App">
      {currentView === 'landing' && (
        <ProfessionalLandingPage onNavigateToCalculator={navigateToCalculator} />
      )}
      {currentView === 'calculator' && (
        <HealthcareComplianceCalculator onNavigateToLanding={navigateToLanding} />
      )}
    </div>
  );
}

// Professional Landing Page Component
function ProfessionalLandingPage({ onNavigateToCalculator }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Professional Healthcare Header */}
      <header className="bg-white border-b-2" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#059669' }}>ComplianceIQ</div>
                  <div className="text-sm font-medium" style={{ color: '#34D399', opacity: 0.8 }}>
                    Care more. Calculate less.
                  </div>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <button 
                onClick={onNavigateToCalculator}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ color: '#6B7280' }}
              >
                Analytics Dashboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Clinical Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center" style={{ position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F2937' }}>
              Care Minutes Compliance Calculator
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-4xl mx-auto" style={{ color: '#374151', lineHeight: '1.5' }}>
              Aged care facilities are under attack by bureaucratic complexity. Managers spend sleepless nights wondering if they're compliant. We believe facility managers should focus on caring for residents, not calculating penalties. That's why we built ComplianceIQ.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button 
                onClick={onNavigateToCalculator}
                className="px-8 py-4 rounded-lg text-lg font-semibold text-white transition-colors shadow-lg"
                style={{ backgroundColor: '#059669' }}
              >
                Start Your Compliance Check
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm" style={{ color: '#6B7280' }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: '#22C55E' }} />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: '#22C55E' }} />
                <span>QFR calculation methodology</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#22C55E' }} />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Risk Assessment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
                <AlertTriangle className="w-8 h-8" style={{ color: '#EF4444' }} />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#1F2937' }}>
              Compliance Status Assessment
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#374151' }}>
              Current industry compliance data and regulatory timeline
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border-2" style={{ borderColor: '#E5E7EB' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#EF444420' }}>
                  <Target className="w-6 h-6" style={{ color: '#EF4444' }} />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#EF4444' }}>37.4%</div>
                <p className="font-medium mb-2" style={{ color: '#1F2937' }}>Facilities Meeting Targets</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>Government Q2 2024-25 Report</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border-2" style={{ borderColor: '#E5E7EB' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F59E0B20' }}>
                  <Clock className="w-6 h-6" style={{ color: '#F59E0B' }} />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#F59E0B' }}>April 2026</div>
                <p className="font-medium mb-2" style={{ color: '#1F2937' }}>Penalty Implementation</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>Funding reductions commence</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border-2" style={{ borderColor: '#E5E7EB' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#7BA05B20' }}>
                  <FileText className="w-6 h-6" style={{ color: '#7BA05B' }} />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#7BA05B' }}>215</div>
                <p className="font-medium mb-2" style={{ color: '#1F2937' }}>Required Care Minutes</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>Per resident per day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Impact Assessment */}
      <section className="py-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EF444420' }}>
                <TrendingUp className="w-8 h-8" style={{ color: '#EF4444' }} />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#1F2937' }}>
              Financial Impact Analysis
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#374151' }}>
              Understanding the financial consequences of non-compliance
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border-2 max-w-3xl mx-auto" style={{ borderColor: '#EF4444' }}>
            <div className="grid md:grid-cols-2 gap-8 text-center mb-8">
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#EF4444' }}>$31.92*</div>
                <p className="font-medium" style={{ color: '#1F2937' }}>per bed, per day penalty</p>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Current published rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#EF4444' }}>$1.16M*</div>
                <p className="font-medium" style={{ color: '#1F2937' }}>annual risk (100-bed facility)</p>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Potential funding reduction</p>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={onNavigateToCalculator}
                className="px-8 py-3 rounded-lg font-semibold text-white transition-colors shadow-lg"
                style={{ backgroundColor: '#059669' }}
              >
                Check Your Facility Now
              </button>
            </div>
            
            <p className="text-xs text-center mt-4" style={{ color: '#6B7280' }}>
              *Based on current published penalty rates. Actual penalties may vary. 
              For planning purposes only - consult compliance officers for official guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Professional CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#1F2937' }}>
            Professional Compliance Assessment
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#374151' }}>
            Access immediate compliance analysis using the same calculation methodology as official QFR submissions
          </p>
          <button 
            onClick={onNavigateToCalculator}
            className="px-8 py-4 rounded-lg text-lg font-semibold text-white transition-colors shadow-lg"
            style={{ backgroundColor: '#059669' }}
          >
            Start Your Compliance Check
          </button>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-white border-t-2" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: '#059669' }}>ComplianceIQ</div>
                  <div className="text-base font-medium" style={{ color: '#34D399', opacity: 0.8 }}>
                    Care more. Calculate less.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Clinical Disclaimers */}
          <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: '#FFFBEB', border: '1px solid #F59E0B' }}>
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#F59E0B' }} />
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#92400E' }}>
                  Professional Disclaimers
                </h3>
                <div className="space-y-3 text-sm" style={{ color: '#92400E', lineHeight: '1.5' }}>
                  <p>
                    <strong>Planning Tool Only:</strong> This calculator provides estimates for planning purposes. 
                    Results do not constitute official compliance advice or guarantee regulatory outcomes.
                  </p>
                  <p>
                    <strong>Professional Guidance:</strong> Always consult your compliance officer, legal advisor, 
                    and official ACQSC guidance for definitive compliance requirements.
                  </p>
                  <p>
                    <strong>Data Privacy:</strong> All calculations performed in your browser. 
                    Facility data is not transmitted or stored externally.
                  </p>
                  <p>
                    <strong>Government Independence:</strong> ComplianceIQ operates independently of ACQSC, 
                    Department of Health, and government agencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center border-t pt-8" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
            <p>&copy; 2025 Ryan Rezel trading as ComplianceIQ. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Professional healthcare compliance tools. Made in Melbourne, Australia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Healthcare Compliance Calculator Component
function HealthcareComplianceCalculator({ onNavigateToLanding }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [beds, setBeds] = useState('');
  const [residents, setResidents] = useState('');
  const [rnHours, setRnHours] = useState('');
  const [enHours, setEnHours] = useState('');
  const [pcwHours, setPcwHours] = useState('');
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [biggestPainPoint, setBiggestPainPoint] = useState('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const targetMinutes = 215;
  const rnTargetMinutes = 44;

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
    
    const isCompliant = careMinutesPerResident >= targetMinutes && rnMinutesPerResident >= rnTargetMinutes;
    
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
      isCompliant
    };
  };

  const results = calculateCompliance();

  const getComplianceStatus = () => {
    if (results.isCompliant) {
      return { status: 'COMPLIANT', color: '#22C55E', bgColor: '#F0FDF4', textColor: '#166534', icon: CheckCircle };
    } else if (results.totalCompliancePercentage >= 90) {
      return { status: 'AT RISK', color: '#F59E0B', bgColor: '#FFFBEB', textColor: '#D97706', icon: AlertTriangle };
    } else {
      return { status: 'NON-COMPLIANT', color: '#EF4444', bgColor: '#FEF2F2', textColor: '#DC2626', icon: XCircle };
    }
  };

  const complianceStatus = getComplianceStatus();

  const handleCalculate = async () => {
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowResults(true);
    setCurrentStep(4);
    setIsCalculating(false);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      handleCalculate();
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return beds;
    if (currentStep === 2) return true; // residents is optional
    if (currentStep === 3) return rnHours || enHours || pcwHours;
    return false;
  };

  const resetCalculator = () => {
    setBeds('');
    setResidents('');
    setRnHours('');
    setEnHours('');
    setPcwHours('');
    setCurrentStep(1);
    setShowResults(false);
    setShowFeedback(false);
  };

  const steps = [
    { number: 1, title: 'Facility Details', description: 'Operational capacity' },
    { number: 2, title: 'Resident Count', description: 'Daily occupancy' },
    { number: 3, title: 'Staff Hours', description: 'Weekly care hours' },
    { number: 4, title: 'Compliance Results', description: 'Analysis complete' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Professional Header */}
      <header className="bg-white border-b-2" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold" style={{ color: '#059669' }}>ComplianceIQ</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ 
                    backgroundColor: '#F0FDF4', 
                    color: '#059669',
                    border: '1px solid #BBF7D0'
                  }}>
                    Care more. Calculate less.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium rounded-full border" 
                    style={{ backgroundColor: '#F0FDF4', color: '#166534', borderColor: '#BBF7D0' }}>
                Care more. Calculate less.
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    currentStep >= step.number || showResults
                      ? 'text-white border-transparent'
                      : 'border-gray-300 text-gray-500'
                  }`} style={{
                    backgroundColor: currentStep >= step.number || showResults ? '#059669' : 'transparent'
                  }}>
                    {step.number}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium" style={{ color: '#1F2937' }}>{step.title}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5" style={{
                      backgroundColor: currentStep > step.number || showResults ? '#059669' : '#E5E7EB'
                    }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          {showResults ? (
            /* Results Display */
            <div className="p-8">
              {/* Primary Status */}
              <div className="text-center mb-8 p-6 rounded-xl border-2" style={{
                backgroundColor: complianceStatus.bgColor,
                borderColor: complianceStatus.color
              }}>
                <div className="flex items-center justify-center mb-4">
                  <complianceStatus.icon className="w-16 h-16" style={{ color: complianceStatus.color }} />
                </div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: complianceStatus.textColor }}>
                  {complianceStatus.status}
                </h2>
                <p className="text-lg" style={{ color: complianceStatus.textColor }}>
                  Care minutes compliance assessment complete
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#7BA05B20' }}>
                      <Activity className="w-5 h-5" style={{ color: '#7BA05B' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#1F2937' }}>Total Care Minutes</h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>Per resident per day</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>
                    {results.careMinutesPerResident}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: '#6B7280' }}>Target: 215 minutes</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      results.totalCompliancePercentage >= 100 ? 'bg-green-100 text-green-800' :
                      results.totalCompliancePercentage >= 90 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {results.totalCompliancePercentage}%
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4A57420' }}>
                      <Shield className="w-5 h-5" style={{ color: '#D4A574' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#1F2937' }}>RN Care Minutes</h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>Registered nurse care</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>
                    {results.rnMinutesPerResident}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: '#6B7280' }}>Target: 44 minutes</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      results.rnCompliancePercentage >= 100 ? 'bg-green-100 text-green-800' :
                      results.rnCompliancePercentage >= 90 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {results.rnCompliancePercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Recommendations */}
              {!results.isCompliant && (
                <div className="p-6 rounded-lg border-2 mb-8" style={{
                  backgroundColor: '#FEF2F2',
                  borderColor: '#EF4444'
                }}>
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 mt-1" style={{ color: '#EF4444' }} />
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#DC2626' }}>
                        Action Required
                      </h3>
                      <p className="mb-4" style={{ color: '#991B1B' }}>
                        Your facility may face funding reductions from April 2026. Immediate action is recommended.
                      </p>
                      <div className="space-y-2">
                        {results.totalShortfall > 0 && (
                          <p className="text-sm" style={{ color: '#991B1B' }}>
                            • <strong>Increase total care by {Math.ceil((results.totalShortfall * results.residentCount * 7) / 60)} hours per week</strong> to meet 215 minutes per resident per day
                          </p>
                        )}
                        {results.rnShortfall > 0 && (
                          <p className="text-sm" style={{ color: '#991B1B' }}>
                            • <strong>Increase RN care by {Math.ceil((results.rnShortfall * results.residentCount * 7) / 60)} hours per week</strong> to meet 44 minutes per resident per day
                          </p>
                        )}
                        <p className="text-sm mt-3 pt-3 border-t" style={{ color: '#7F1D1D', borderColor: '#FCA5A5' }}>
                          <strong>Potential annual penalty:</strong> Up to ${(results.bedCount * 31.92 * 365).toLocaleString()} for a {results.bedCount}-bed facility
                        </p>
                      </div>
                      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#FEFCE8', border: '1px solid #FDE047' }}>
                        <p className="text-xs" style={{ color: '#A16207' }}>
                          <strong>Disclaimer:</strong> These are planning estimates only. Actual compliance requirements may vary. 
                          Consult your compliance officer for official guidance and specific implementation strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetCalculator}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#059669',
                    color: '#059669'
                  }}
                >
                  Calculate Again
                </button>
                <button
                  onClick={() => setShowFeedback(true)}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors"
                  style={{ backgroundColor: '#7BA05B' }}
                >
                  Share Feedback
                </button>
              </div>
            </div>
          ) : (
            /* Input Steps */
            <div className="p-8">
              {/* Step 1: Facility Details */}
              {currentStep === 1 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5F7C20' }}>
                      <Users className="w-6 h-6" style={{ color: '#2C5F7C' }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: '#1F2937' }}>Facility Configuration</h2>
                      <p style={{ color: '#6B7280' }}>Enter your operational bed capacity</p>
                    </div>
                  </div>
                  
                  <div className="max-w-md">
                    <label className="block text-base font-medium mb-3" style={{ color: '#374151' }}>
                      Number of Operational Beds *
                    </label>
                    <input
                      type="number"
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      placeholder="e.g., 50"
                      className="w-full h-12 px-4 text-base rounded-lg border-2 transition-colors focus:outline-none"
                      style={{
                        backgroundColor: '#F9FAFB',
                        borderColor: beds ? '#059669' : '#D1D5DB',
                        color: '#1F2937'
                      }}
                    />
                    <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
                      Only count beds that are operational and available for residents
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Resident Count */}
              {currentStep === 2 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#7BA05B20' }}>
                      <Users className="w-6 h-6" style={{ color: '#7BA05B' }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: '#1F2937' }}>Resident Count</h2>
                      <p style={{ color: '#6B7280' }}>Average daily resident occupancy</p>
                    </div>
                  </div>
                  
                  <div className="max-w-md">
                    <label className="block text-base font-medium mb-3" style={{ color: '#374151' }}>
                      Average Daily Residents (Optional)
                    </label>
                    <input
                      type="number"
                      value={residents}
                      onChange={(e) => setResidents(e.target.value)}
                      placeholder={beds ? `Auto-calculated as ${beds}` : "e.g., 47"}
                      className="w-full h-12 px-4 text-base rounded-lg border-2 transition-colors focus:outline-none"
                      style={{
                        backgroundColor: '#F9FAFB',
                        borderColor: residents ? '#059669' : '#D1D5DB',
                        color: '#1F2937'
                      }}
                    />
                    <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
                      Leave blank to use bed count. Use actual occupancy for more accurate results.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Staff Hours */}
              {currentStep === 3 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4A57420' }}>
                      <Clock className="w-6 h-6" style={{ color: '#D4A574' }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: '#1F2937' }}>Staff Care Hours</h2>
                      <p style={{ color: '#6B7280' }}>Enter total weekly direct care hours</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-base font-medium mb-3" style={{ color: '#374151' }}>
                        Registered Nurses (RN) - Hours per week
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={rnHours}
                        onChange={(e) => setRnHours(e.target.value)}
                        placeholder="e.g., 168"
                        className="w-full h-12 px-4 text-base rounded-lg border-2 transition-colors focus:outline-none"
                        style={{
                          backgroundColor: '#F9FAFB',
                          borderColor: rnHours ? '#059669' : '#D1D5DB',
                          color: '#1F2937'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-base font-medium mb-3" style={{ color: '#374151' }}>
                        Enrolled Nurses (EN) - Hours per week
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={enHours}
                        onChange={(e) => setEnHours(e.target.value)}
                        placeholder="e.g., 84"
                        className="w-full h-12 px-4 text-base rounded-lg border-2 transition-colors focus:outline-none"
                        style={{
                          backgroundColor: '#F9FAFB',
                          borderColor: enHours ? '#059669' : '#D1D5DB',
                          color: '#1F2937'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-base font-medium mb-3" style={{ color: '#374151' }}>
                        Personal Care Workers (PCW) - Hours per week
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={pcwHours}
                        onChange={(e) => setPcwHours(e.target.value)}
                        placeholder="e.g., 420"
                        className="w-full h-12 px-4 text-base rounded-lg border-2 transition-colors focus:outline-none"
                        style={{
                          backgroundColor: '#F9FAFB',
                          borderColor: pcwHours ? '#059669' : '#D1D5DB',
                          color: '#1F2937'
                        }}
                      />
                    </div>
                    
                    <div className="p-4 rounded-lg border" style={{ backgroundColor: '#F0F9FF', borderColor: '#7DD3FC' }}>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 mt-0.5" style={{ color: '#0369A1' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#0369A1' }}>Important</p>
                          <p className="text-sm mt-1" style={{ color: '#075985' }}>
                            Enter direct care hours only. Exclude time for leave, training, administration, and non-care activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
                <div>
                  {currentStep > 1 && !showResults && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 rounded-lg font-semibold transition-colors border"
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#D1D5DB',
                        color: '#6B7280'
                      }}
                    >
                      Previous
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  {canProceed() && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#059669' }}>
                      <CheckCircle className="w-4 h-4" />
                      <span>Ready to continue</span>
                    </div>
                  )}
                  
                  <button
                    onClick={handleNext}
                    disabled={!canProceed() || isCalculating}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{ backgroundColor: '#059669' }}
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Calculating...
                      </>
                    ) : currentStep === 3 ? (
                      <>
                        <Activity className="w-4 h-4" />
                        Calculate Compliance
                      </>
                    ) : (
                      <>
                        Continue
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1F2937' }}>
                Share Your Feedback
              </h3>
              
              {!isSubmitted ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your name *"
                    className="w-full h-12 px-4 rounded-lg border-2"
                    style={{ borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address *"
                    className="w-full h-12 px-4 rounded-lg border-2"
                    style={{ borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }}
                  />
                  <input
                    type="text"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    placeholder="Facility name *"
                    className="w-full h-12 px-4 rounded-lg border-2"
                    style={{ borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }}
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
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowFeedback(false)}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold border"
                      style={{ borderColor: '#D1D5DB', color: '#6B7280' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsSubmitted(true)}
                      disabled={!email || !contactName || !facilityName || !biggestPainPoint}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold text-white disabled:opacity-50"
                      style={{ backgroundColor: '#059669' }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#22C55E' }} />
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#1F2937' }}>
                    Thank You!
                  </h4>
                  <p className="mb-4" style={{ color: '#6B7280' }}>
                    Your feedback helps us improve this tool for the aged care community.
                  </p>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="py-2 px-6 rounded-lg font-semibold text-white"
                                          style={{ backgroundColor: '#059669' }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="mt-8 bg-white rounded-xl border p-6" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F59E0B20' }}>
              <FileText className="w-6 h-6" style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#1F2937' }}>
                Calculation Methodology
              </h3>
              <div className="text-base space-y-3" style={{ color: '#374151', lineHeight: '1.6' }}>
                <p>
                  This calculator follows Australian Government care minutes requirements:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Total Care:</strong> 215 minutes per resident per day minimum</li>
                  <li>• <strong>RN Care:</strong> 44 minutes per resident per day minimum</li>
                  <li>• <strong>Calculation:</strong> (Weekly hours × 60) ÷ 7 days ÷ residents</li>
                  <li>• <strong>Compliance:</strong> Both targets must be met simultaneously</li>
                </ul>
                <p className="text-sm pt-2" style={{ color: '#6B7280' }}>
                  Based on Quality and Safety Commission guidelines effective from July 2024.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="mt-6 bg-white rounded-xl border p-6" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F59E0B20' }}>
              <AlertTriangle className="w-6 h-6" style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#1F2937' }}>
                Important Disclaimers
              </h3>
              <div className="text-sm space-y-2" style={{ color: '#374151', lineHeight: '1.5' }}>
                <p>
                  <strong>This calculator is for planning purposes only</strong> and does not constitute 
                  legal, financial, or compliance advice.
                </p>
                <ul className="space-y-1 ml-4 mt-2">
                  <li>• Results are estimates based on standard calculation methods</li>
                  <li>• Actual compliance determinations are made by ACQSC using QFR data</li>
                  <li>• Calculations assume direct care hours excluding leave and training</li>
                  <li>• Regulations and requirements may change</li>
                </ul>
                <p className="pt-2">
                  <strong>Professional advice recommended:</strong> Consult your compliance officer 
                  or aged care advisor for official guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing icons for compliance calculator
function XCircle({ className, style }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m15 9-6 6"></path>
      <path d="m9 9 6 6"></path>
    </svg>
  );
}

function ChevronRight({ className, style }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
    </svg>
  );
}

function AlertCircle({ className, style }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m15 9-6 6"></path>
      <path d="m9 9 6 6"></path>
    </svg>
  );
}

function Calculator({ className, style }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
      <line x1="8" x2="16" y1="6" y2="6"></line>
      <line x1="8" x2="16" y1="10" y2="10"></line>
      <line x1="8" x2="16" y1="14" y2="14"></line>
      <line x1="8" x2="16" y1="18" y2="18"></line>
    </svg>
  );
}

function Info({ className, style }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m15 9-6 6"></path>
      <path d="m9 9 6 6"></path>
    </svg>
  );
}

export default App;