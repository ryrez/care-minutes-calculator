import React, { useState } from 'react';
import { Stethoscope, Shield, CheckCircle, Clock, Users, AlertTriangle, FileText, Activity, TrendingUp, Brain, Target } from 'lucide-react';

function ProfessionalLandingPage({ onNavigateToCalculator }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Send email signup using Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '312285e3-d3ad-4d63-af4e-b5069068cb30',
          name: 'Landing Page Signup',
          email: email,
          subject: 'ComplianceIQ Landing Page Email Signup',
          message: `
🛡️ NEW EMAIL SIGNUP - COMPLIANCEIQ

📧 EMAIL: ${email}
📅 TIME: ${new Date().toLocaleString()}
🌐 SOURCE: Landing Page Hero Section
🖥️ BROWSER: ${navigator.userAgent.split(')')[0]})

This user signed up for updates about ComplianceIQ from the landing page.
          `,
          from_name: 'ComplianceIQ Landing Page'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        // Still show success for better UX
        setIsSubmitted(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // Still show success for better UX
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Professional Healthcare Header */}
      <header className="bg-white border-b-2" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
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
              <div>
                <div className="text-2xl font-bold" style={{ color: '#059669' }}>ComplianceIQ</div>
                <div className="text-sm font-medium text-center" style={{ color: '#34D399', opacity: 0.8 }}>
                  Care more. Calculate less.
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
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F2937' }}>
              Care Minutes Compliance Calculator
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-4xl mx-auto" style={{ color: '#374151', lineHeight: '1.5' }}>
              Aged care compliance doesn't have to be complicated. Facility managers deserve tools that work as hard as they do. We built ComplianceIQ to give you instant clarity on compliance status, so you can focus on delivering exceptional resident care.
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

      {/* Clinical Process Section */}
      <section className="py-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#059669' }}>
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#1F2937' }}>
              Professional Compliance Assessment
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#374151' }}>
              Translate your current staffing allocation into compliance metrics using official QFR methodology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: '#059669' }}>
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#1F2937' }}>
                    Input Current Staffing
                  </h3>
                  <p style={{ color: '#374151', lineHeight: '1.6' }}>
                    Enter operational bed count and weekly direct care hours by classification (RN, EN, PCW). 
                    Use existing roster data you already track.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: '#7BA05B' }}>
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#1F2937' }}>
                    Instant Analysis
                  </h3>
                  <p style={{ color: '#374151', lineHeight: '1.6' }}>
                    Receive immediate compliance status with exact care minutes per resident per day. 
                    Clear visual indicators show compliance level.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: '#D4A574' }}>
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#1F2937' }}>
                    Actionable Recommendations
                  </h3>
                  <p style={{ color: '#374151', lineHeight: '1.6' }}>
                    If non-compliant, receive specific guidance on additional hours needed 
                    and potential financial impact of current status.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#22C55E20' }}>
                  <CheckCircle className="w-6 h-6" style={{ color: '#22C55E' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1F2937' }}>
                  Example Analysis
                </h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  100-bed facility compliance assessment
                </p>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                  <span style={{ color: '#6B7280' }}>Operational Beds:</span>
                  <span className="font-medium" style={{ color: '#1F2937' }}>100</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                  <span style={{ color: '#6B7280' }}>RN Hours/Week:</span>
                  <span className="font-medium" style={{ color: '#1F2937' }}>420</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                  <span style={{ color: '#6B7280' }}>EN + PCW Hours/Week:</span>
                  <span className="font-medium" style={{ color: '#1F2937' }}>1,260</span>
                </div>
                <div className="flex justify-between items-center py-3 mt-4" style={{ backgroundColor: '#F0FDF4', borderRadius: '8px', padding: '12px' }}>
                  <span className="font-medium" style={{ color: '#166534' }}>Care Minutes/Resident/Day:</span>
                  <span className="text-xl font-bold" style={{ color: '#166534' }}>221.8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: '#166534' }}>Compliance Status:</span>
                  <span className="font-bold" style={{ color: '#166534' }}>103.2% ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Impact Assessment */}
      <section className="py-16 bg-white">
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

      {/* Development Roadmap */}
      <section className="py-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#7BA05B20' }}>
                <Users className="w-8 h-8" style={{ color: '#7BA05B' }} />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1F2937' }}>
              User-Driven Development
            </h2>
            <p className="text-xl" style={{ color: '#374151' }}>
              Features prioritized based on aged care professional feedback and requests
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border" style={{ borderColor: '#059669', backgroundColor: '#05966910' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#059669' }}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#059669' }}>Trend Analysis</h3>
                <p className="mb-4" style={{ color: '#059669', fontSize: '14px' }}>
                  Weekly compliance tracking to identify patterns before issues arise
                </p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{
                  backgroundColor: '#059669',
                  color: 'white'
                }}>
                  Most Requested
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border" style={{ borderColor: '#7BA05B', backgroundColor: '#7BA05B10' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#7BA05B' }}>
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#7BA05B' }}>Alert System</h3>
                <p className="mb-4" style={{ color: '#7BA05B', fontSize: '14px' }}>
                  Automatic notifications when compliance drops below threshold
                </p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{
                  backgroundColor: '#7BA05B',
                  color: 'white'
                }}>
                  Frequently Requested
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border" style={{ borderColor: '#D4A574', backgroundColor: '#D4A57410' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#D4A574' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#D4A574' }}>Report Export</h3>
                <p className="mb-4" style={{ color: '#D4A574', fontSize: '14px' }}>
                  Professional compliance documentation for audits
                </p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{
                  backgroundColor: '#D4A574',
                  color: 'white'
                }}>
                  Often Requested
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border-2" style={{ borderColor: '#22C55E', backgroundColor: '#F0FDF4' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#22C55E' }}>
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#22C55E' }}>Your Input</h3>
                <p className="mb-4" style={{ color: '#22C55E', fontSize: '14px' }}>
                  Features developed based on community feedback and demand
                </p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{
                  backgroundColor: '#22C55E',
                  color: 'white'
                }}>
                  You Decide
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="mb-4" style={{ color: '#6B7280' }}>
              Development priorities determined by user feedback frequency and clinical need
            </p>
            <button 
              onClick={onNavigateToCalculator}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: '#059669' }}
            >
              Try Calculator & Share Feedback
            </button>
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
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
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
              <div>
                <div className="text-3xl font-bold" style={{ color: '#059669' }}>ComplianceIQ</div>
                <div className="text-base font-medium text-center" style={{ color: '#34D399', opacity: 0.8 }}>
                  Care more. Calculate less.
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

export default ProfessionalLandingPage;