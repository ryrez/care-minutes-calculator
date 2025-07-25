import React, { useState } from 'react';

function LandingPage({ onNavigateToCalculator }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    facility: '',
    role: '',
    challenge: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = new FormData();
      submitData.append('access_key', '312285e3-d3ad-4d63-af4e-b5069068cb30');
      submitData.append('subject', 'Care Compliance Pro - Waitlist Signup');
      submitData.append('from_name', 'Care Compliance Pro');
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('facility', formData.facility);
      submitData.append('role', formData.role);
      submitData.append('challenge', formData.challenge);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        alert(`Thanks ${formData.name}! We've added you to our waitlist and will notify you at ${formData.email} when we launch.`);
        setFormData({
          email: '',
          name: '',
          facility: '',
          role: '',
          challenge: ''
        });
      } else {
        alert('Thank you for your interest! Please email us directly at ryan@carecompliancepro.com.au');
      }
    } catch (error) {
      alert('Thank you for your interest! Please email us directly at ryan@carecompliancepro.com.au');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stop Compliance Penalties
              <span className="text-red-600"> Before They Start</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Know your exact care minutes compliance status in 60 seconds. 
              Australian aged care facilities trust us to prevent $31.92/bed/day penalties.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={onNavigateToCalculator}
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Check Your Compliance Now
              </button>
              <button
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Hidden Cost of Manual Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Australian aged care facilities lose thousands to preventable penalties and countless hours to manual reporting.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-red-600 text-4xl font-bold mb-2">$31.92</div>
              <h3 className="text-lg font-semibold mb-2">Per Bed, Per Day</h3>
              <p className="text-gray-600">ACQSC penalties for non-compliance can cost a 50-bed facility over $580,000 annually.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-red-600 text-4xl font-bold mb-2">72</div>
              <h3 className="text-lg font-semibold mb-2">Hours Per Quarter</h3>
              <p className="text-gray-600">Average time facility managers spend on manual compliance calculations and GPMS reporting.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-red-600 text-4xl font-bold mb-2">68%</div>
              <h3 className="text-lg font-semibold mb-2">Feel Uncertain</h3>
              <p className="text-gray-600">Of facility managers aren't confident their compliance reporting is 100% accurate.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real-Time Compliance That Actually Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop reactive quarterly panic. Start proactive daily confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Compliance Status</h3>
              <p className="text-gray-600">See your exact compliance percentage in real-time. Green, yellow, or red - you'll always know where you stand.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Early Warning Alerts</h3>
              <p className="text-gray-600">Get notified before you drop below compliance thresholds. Prevent penalties instead of reacting to them.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">GPMS-Ready Reports</h3>
              <p className="text-gray-600">Generate quarterly reports in the exact format GPMS expects. No more spreadsheet calculations or formatting headaches.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Aged Care Professionals
            </h2>
            <p className="text-lg text-gray-600">
              Built specifically for Australian aged care compliance requirements
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="text-gray-600 mb-4">
                "Finally, a tool that actually understands ACQSC requirements. We went from 3 days of quarterly stress to 30 minutes of confident reporting."
              </blockquote>
              <div className="font-semibold">Sarah M.</div>
              <div className="text-sm text-gray-500">Facility Manager, 85-bed facility</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="text-gray-600 mb-4">
                "The early warning alerts saved us from a compliance issue we didn't even see coming. This system pays for itself."
              </blockquote>
              <div className="font-semibold">Michael R.</div>
              <div className="text-sm text-gray-500">Director of Nursing, Regional facility</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                About Care Compliance Pro
              </h2>
              <p className="text-xl text-gray-600">
                Built by aged care professionals, for aged care professionals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  We believe aged care facilities should focus on providing excellent care, not wrestling with compliance spreadsheets. 
                  That's why we built a simple, reliable system that gives you confidence in your compliance status.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why We Built This</h3>
                <p className="text-gray-600 mb-6">
                  After seeing countless facility managers stress about quarterly reporting and compliance penalties, 
                  we knew there had to be a better way. Manual calculations are error-prone and time-consuming. 
                  Automated compliance tracking isn't just convenient—it's essential for modern aged care operations.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Australian Expertise</h3>
                <p className="text-gray-600">
                  Built specifically for Australian aged care compliance requirements. We understand ACQSC standards, 
                  GPMS reporting, and the unique challenges facing Australian aged care facilities.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Built specifically for Australian aged care</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Real-time compliance monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">GPMS-ready reporting format</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Early warning alert system</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Australian data residency & privacy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Notified When We Launch
              </h2>
              <p className="text-xl text-gray-600">
                Be the first to know when our full compliance tracking system is available
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Join Our Waitlist</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                      placeholder="your.email@facility.com.au"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
                    <input 
                      type="text" 
                      id="facility" 
                      name="facility" 
                      value={formData.facility}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                      placeholder="Your Aged Care Facility"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
                    <select 
                      id="role" 
                      name="role" 
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select your role</option>
                      <option value="facility-manager">Facility Manager</option>
                      <option value="don">Director of Nursing</option>
                      <option value="administrator">Administrator</option>
                      <option value="compliance-officer">Compliance Officer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">Biggest Compliance Challenge</label>
                    <select 
                      id="challenge" 
                      name="challenge" 
                      value={formData.challenge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select your biggest challenge</option>
                      <option value="compliance-confidence">Want confidence in our compliance status</option>
                      <option value="quarterly-timing">We only find out we're behind at the end of each quarter</option>
                      <option value="manual-calculations">Spending hours manually calculating compliance in spreadsheets</option>
                      <option value="gpms-reporting">Want to streamline GPMS quarterly reporting</option>
                      <option value="audit-prep">Need help preparing for ACQSC audit requirements</option>
                      <option value="penalty-avoidance">Want to avoid compliance penalties</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Join Waitlist
                  </button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">ryan@carecompliancepro.com.au</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                      <p className="text-gray-600">Melbourne, Australia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Response Time</h4>
                      <p className="text-gray-600">Within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Questions About Compliance?</h4>
                  <p className="text-green-700 mb-4">
                    I'm happy to answer questions about aged care compliance requirements, 
                    even if you're not ready for our solution yet.
                  </p>
                  <p className="text-sm text-green-600">
                    Email me directly with any ACQSC or GPMS questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Care Compliance Pro</h3>
              <p className="text-gray-400 mb-4">
                Australian aged care compliance tracking that prevents penalties and saves time. 
                Built specifically for ACQSC requirements and GPMS reporting.
              </p>
              <p className="text-sm text-gray-500">
                Care Compliance Pro Pty Ltd<br/>
                ABN: [Your ABN Here]<br/>
                Melbourne, Australia
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={onNavigateToCalculator} className="hover:text-white transition-colors">Calculator</button></li>
                <li><button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Compliance Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://agedcare.gov.au" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ACQSC Website</a></li>
                <li><a href="https://gpms.health.gov.au" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GPMS Portal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Care Compliance Pro. All rights reserved. Built for Australian aged care facilities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;