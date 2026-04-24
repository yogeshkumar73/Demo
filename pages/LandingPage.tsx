
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, BarChart, Globe, Users, Award } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-400 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
              Empowering 1M+ Investors Worldwide
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Wealth Management <span className="text-blue-600">Reimagined.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Experience zero-commission trading, real-time analytics, and AI-powered insights. Join FinDoc Prime and start building your financial future today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="mt-20 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative">
             <img 
               src="https://picsum.photos/id/2/1200/600" 
               alt="Platform Preview" 
               className="w-full h-auto"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose FinDoc Prime?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We provide the tools, security, and data you need to succeed in today's fast-moving markets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-600" size={32} />}
              title="Secure Assets"
              description="Your funds are protected by multi-layer encryption and biometric security standards."
            />
            <FeatureCard 
              icon={<Zap className="text-blue-600" size={32} />}
              title="Instant Execution"
              description="Proprietary low-latency trading infrastructure ensures your orders fill at the best price."
            />
            <FeatureCard 
              icon={<BarChart className="text-blue-600" size={32} />}
              title="Smart Analytics"
              description="Deep-dive into your portfolio with advanced visualization and AI performance tracking."
            />
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-blue-600 mb-2">$50B+</p>
              <p className="text-slate-500 font-medium">Assets Managed</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-blue-600 mb-2">2M+</p>
              <p className="text-slate-500 font-medium">Global Users</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-blue-600 mb-2">99.9%</p>
              <p className="text-slate-500 font-medium">Uptime Guarantee</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-blue-600 mb-2">24/7</p>
              <p className="text-slate-500 font-medium">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold tracking-tight">FinDoc Prime</span>
            </div>
            <div className="flex gap-8 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-slate-500 text-sm">© 2024 FinDoc Prime Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
    <div className="mb-6 p-3 bg-blue-50 w-fit rounded-xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
