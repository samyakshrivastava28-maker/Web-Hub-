import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Zap, Shield, Cpu, Globe, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export function TechLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/tech' || location.pathname === '/tech/';

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/tech" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Cpu size={20} className="text-white" />
            </div>
            <span>NexusAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/tech" className={`hover:text-white transition-colors ${isHome ? 'text-white' : ''}`}>Home</Link>
            <Link to="/tech/about" className={`hover:text-white transition-colors ${location.pathname.includes('/about') ? 'text-white' : ''}`}>About Us</Link>
            <Link to="/tech/contact" className={`hover:text-white transition-colors ${location.pathname.includes('/contact') ? 'text-white' : ''}`}>Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</a>
            <Link to="/tech/contact" className="bg-white text-slate-950 hover:bg-slate-200 text-sm font-bold px-5 py-2.5 rounded-full transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="pt-20">
        <Outlet />
      </div>

      <footer className="bg-slate-950 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Cpu size={24} className="text-indigo-500" />
            <span>NexusAI</span>
          </div>
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} NexusAI Inc. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built by <Link to="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">S-Web Hub</Link> (Growth Plan Example)
          </p>
        </div>
      </footer>
    </div>
  );
}

export function TechHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-28 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
            NexusAI 2.0 is now live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            Build faster with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Intelligent APIs
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            Empower your development team with state-of-the-art machine learning models. Integrate powerful AI capabilities into your apps in minutes, not months.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/tech/contact" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              Start Building Free <ArrowRight size={20} />
            </Link>
            <Link to="/tech/about" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center">
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our platform provides enterprise-grade infrastructure out of the box so you can focus on building your product.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="text-amber-400" />, title: 'Lightning Fast', desc: 'Global edge network ensures sub-50ms latency for all API requests.' },
              { icon: <Shield className="text-emerald-400" />, title: 'Enterprise Security', desc: 'SOC2 compliant, end-to-end encryption, and automated threat detection.' },
              { icon: <Code className="text-blue-400" />, title: 'Developer First', desc: 'Intuitive SDKs for React, Node, Python, and Go. Excellent documentation.' },
              { icon: <Globe className="text-indigo-400" />, title: 'Global Scale', desc: 'Deploy across 35+ regions worldwide with a single click.' },
              { icon: <BarChart className="text-pink-400" />, title: 'Real-time Analytics', desc: 'Monitor usage, latency, and errors with our built-in dashboard.' },
              { icon: <Cpu className="text-purple-400" />, title: 'Custom Models', desc: 'Fine-tune our base models on your own proprietary data.' },
            ].map((feature, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function TechAbout() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-8 text-center"
      >
        About NexusAI
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="text-xl text-slate-400 max-w-3xl mx-auto text-center mb-16"
      >
        We are a team of researchers and engineers dedicated to making artificial intelligence accessible to developers worldwide.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <img src={`https://picsum.photos/seed/team${i}/200/200`} alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" referrerPolicy="no-referrer" />
            <h3 className="text-xl font-bold">Jane Doe {i}</h3>
            <p className="text-indigo-400 mb-4">Co-Founder & Engineer</p>
            <p className="text-slate-400 text-sm">Former AI researcher with a passion for scalable systems and developer tools.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechContact() {
  const [sent, setSent] = useState(false);
  
  return (
    <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
      >
        Contact Sales
      </motion.h1>
      
      {sent ? (
        <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
          <p>Our team will get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
              <input required type="text" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
              <input required type="text" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Work Email</label>
            <input required type="email" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">How can we help?</label>
            <textarea required rows={4} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
