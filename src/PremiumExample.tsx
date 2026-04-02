import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, PieChart, Users, ShieldCheck, 
  Globe, ArrowRight, LayoutDashboard, Settings, 
  Bell, Search, ChevronDown, Activity, LogOut
} from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export function PremiumLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/premium' || location.pathname === '/premium/';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/premium" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-blue-900">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <span>ApexCorp</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link to="/premium" className={`hover:text-blue-600 transition-colors ${isHome ? 'text-blue-600' : ''}`}>Home</Link>
            <Link to="/premium/contact" className={`hover:text-blue-600 transition-colors ${location.pathname.includes('/contact') ? 'text-blue-600' : ''}`}>Contact</Link>
            <Link to="/premium/dashboard" className="text-blue-600 flex items-center gap-1 transition-colors">Client Portal <ChevronDown size={16}/></Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/premium/dashboard" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
            <Link to="/premium/contact" className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <Outlet />
      </div>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
              <Globe size={24} className="text-blue-500" />
              <span>ApexCorp</span>
            </div>
            <p className="text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} ApexCorp Enterprise Solutions. All rights reserved.
            </p>
            <p className="text-sm">
              Built by <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">S-Web Hub</Link> (Premium Plan Example)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PremiumHome() {
  return (
    <>
      {/* Hero Section with Dashboard Mockup */}
      <section className="pt-12 pb-20 lg:pt-28 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6">
                <ShieldCheck size={16} /> Enterprise Grade Security
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Global operations, <br/>
                <span className="text-blue-600">unified platform.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                ApexCorp provides industry-leading management solutions for Fortune 500 companies. Streamline your workflow with our advanced analytics and custom dashboards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/premium/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2">
                  Request Demo <ArrowRight size={20} />
                </Link>
                <Link to="/premium/dashboard" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-lg transition-all flex items-center justify-center">
                  View Live Dashboard
                </Link>
              </div>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl transform rotate-3 scale-105 opacity-10 blur-lg"></div>
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative z-10">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <LayoutDashboard size={20} className="text-slate-400" />
                    <span className="font-semibold text-slate-700">Executive Overview</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Search size={18} className="text-slate-400" />
                    <Bell size={18} className="text-slate-400" />
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">JD</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Revenue</p>
                      <p className="text-2xl font-bold text-slate-900">$2.4M</p>
                      <p className="text-xs text-emerald-600 font-medium mt-1">+14.5% vs last month</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Active Users</p>
                      <p className="text-2xl font-bold text-slate-900">84.2K</p>
                      <p className="text-xs text-emerald-600 font-medium mt-1">+5.2% vs last month</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">System Health</p>
                      <p className="text-2xl font-bold text-slate-900">99.9%</p>
                      <p className="text-xs text-slate-400 font-medium mt-1">All systems operational</p>
                    </div>
                  </div>
                  <div className="h-48 bg-slate-50 rounded-xl border border-slate-100 flex items-end justify-between p-4 gap-2">
                    {[40, 70, 45, 90, 65, 85, 120, 95, 110, 80, 130, 100].map((height, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${height}px` }} transition={{ duration: 1, delay: 0.5 + (i * 0.05) }} className="w-full bg-blue-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer"></motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Enterprise Features - Bento Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Advanced Capabilities</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our premium tier includes custom development, advanced analytics, and a fully featured admin portal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Custom Analytics Engine</h3>
              <p className="text-slate-600 mb-6 max-w-md">Track exactly what matters to your business with bespoke reporting dashboards and real-time data visualization.</p>
              <img src="https://picsum.photos/seed/analytics/800/400" alt="Analytics" className="rounded-xl shadow-sm border border-slate-200 w-full object-cover h-48" referrerPolicy="no-referrer" />
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-slate-800 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <Settings size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Content Management</h3>
                <p className="text-slate-400">A fully custom CMS tailored to your organizational structure. Update content across 15+ pages instantly.</p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-800">
                <Link to="/premium/dashboard" className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-2">
                  Explore CMS <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-blue-600 text-white rounded-3xl p-8 shadow-xl shadow-blue-600/20">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Role-Based Access</h3>
              <p className="text-blue-100">Granular permissions for your entire team. Control who sees what with enterprise-grade security.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="md:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Activity size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Custom Animations & Branding</h3>
                <p className="text-slate-600">Stand out from the competition with bespoke micro-interactions and a pixel-perfect translation of your brand identity.</p>
              </div>
              <div className="w-full md:w-1/2 h-48 bg-slate-200 rounded-xl overflow-hidden relative">
                <img src="https://picsum.photos/seed/branding/600/400" alt="Branding" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export function PremiumDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-2 font-bold text-xl border-b border-slate-800">
          <Globe size={24} className="text-blue-500" />
          <span>ApexCorp</span>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-lg font-medium transition-colors">
            <BarChart3 size={20} /> Analytics
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-lg font-medium transition-colors">
            <Users size={20} /> Customers
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-lg font-medium transition-colors">
            <Settings size={20} /> Settings
          </a>
        </div>
        <div className="p-4 border-t border-slate-800">
          <Link to="/premium" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <LogOut size={20} /> Back to Site
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <Bell size={24} className="text-slate-400 cursor-pointer hover:text-slate-600" />
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
              JD
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 font-medium mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-slate-900">$124,500</p>
              <p className="text-emerald-500 text-sm font-medium mt-2">+14.5% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 font-medium mb-2">Active Users</h3>
              <p className="text-3xl font-bold text-slate-900">8,234</p>
              <p className="text-emerald-500 text-sm font-medium mt-2">+5.2% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 font-medium mb-2">Conversion Rate</h3>
              <p className="text-3xl font-bold text-slate-900">3.8%</p>
              <p className="text-rose-500 text-sm font-medium mt-2">-0.4% from last month</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Overview</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 70, 45, 90, 65, 85, 120, 95, 110, 80, 130, 100].map((height, i) => (
                <div key={i} className="w-full bg-blue-100 rounded-t-md relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">Transaction ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">#TRX-{8000 + item}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">Customer {item}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">${(Math.random() * 500).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function PremiumContact() {
  const [submitted, setSubmitted] = useState(false);
  
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Enterprise Sales</h1>
        <p className="text-lg text-slate-600">Get a custom quote for your organization's needs.</p>
      </div>
      
      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-2">Request Received</h3>
          <p>An enterprise account executive will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
              <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
              <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
            <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
            <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors">
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
}
