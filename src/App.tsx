import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChatBot } from './components/ChatBot';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  Menu, X, Monitor, ShoppingCart, Layout, RefreshCw,
  Zap, IndianRupee, Smartphone, Search, CheckCircle2,
  MessageCircle, ArrowRight, Mail, Phone, MapPin, Instagram, MessageSquare, ChevronDown
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center text-left font-semibold text-slate-900 focus:outline-none"
      >
        <span className="pr-4">{question}</span>
        <ChevronDown className={`transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      {isOpen && (
        <div className="mt-4 text-slate-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Benefits', href: '/#benefits' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Portfolio', href: '/#portfolio' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                S
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">
                S-Web <span className="text-blue-600">Hub</span>
              </span>
            </Link>
            
            {/* Desktop Nav - Hidden, using hamburger for all screens */}
            <div className="hidden items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-medium transition-colors ${
                    (location.pathname === '/' && link.href === '/') || location.hash === link.href.replace('/', '')
                      ? 'text-blue-600' 
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a href="/#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get Started
              </a>
            </div>

            {/* Menu button (Visible on all screens) */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-blue-600 focus:outline-none p-2"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Nav (Visible on all screens when open) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-b border-slate-200 shadow-lg absolute w-full overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center mt-4 bg-blue-600 text-white px-4 py-3 rounded-md text-sm font-medium"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <span className="font-bold text-xl text-white">
                  S-Web <span className="text-blue-500">Hub</span>
                </span>
              </div>
              <p className="max-w-md mb-6">
                Empowering small businesses in India with affordable, fast, and stunning websites. Get online in 24 hours.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/webhub2811/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/#services" className="hover:text-blue-400 transition-colors">Services</a></li>
                <li><a href="/#pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="/#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
                <li><a href="/#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} S-Web Hub. All rights reserved.</p>
            <p className="mt-2 md:mt-0 text-sm">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
      
      {/* AI Chat Bot */}
      <ChatBot />
    </div>
  );
}

export function AppHome() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const openWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    const phoneNumber = "918305500767";
    
    // Check if user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use native app URI for mobile
      window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodedText}`, '_blank');
    } else {
      // Use WhatsApp Web for desktop to avoid download prompts
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`, '_blank');
    }
  };

  const handleBuyPlanMessage = async (planName: string, priceAmount: number) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Pre-fill the service dropdown
      const serviceSelect = document.getElementById('service') as HTMLSelectElement;
      if (serviceSelect) {
        const options = Array.from(serviceSelect.options);
        const match = options.find(opt => opt.text.includes(planName));
        if (match) {
          serviceSelect.value = match.value;
        }
      }
      
      // Pre-fill the message textarea and focus it
      const messageInput = document.getElementById('message') as HTMLTextAreaElement;
      if (messageInput) {
        messageInput.value = `Hi, I am interested in purchasing the ${planName} Plan (₹${priceAmount}). Please provide more details.`;
        setTimeout(() => messageInput.focus(), 500);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const now = Date.now();
    // Rate limit: 1 submission per 30 seconds
    if (now - lastSubmitTime < 30000) {
      alert("Please wait a moment before submitting another inquiry.");
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    
    // Honeypot check for bots
    const botcheck = formData.get('botcheck');
    if (botcheck) {
      // Silently reject if the honeypot field is filled
      console.warn("Bot detected.");
      return;
    }
    
    // Basic input sanitization (removing potentially dangerous characters)
    const sanitize = (str: string) => str.replace(/[<>]/g, '');
    
    const name = sanitize(formData.get('name') as string || '');
    const phone = sanitize(formData.get('phone') as string || '');
    const service = sanitize(formData.get('service') as string || '');
    const message = sanitize(formData.get('message') as string || '');

    try {
      // Save to database
      await addDoc(collection(db, 'inquiries'), {
        type: 'contact_form',
        name,
        phone,
        service,
        message,
        createdAt: new Date().toISOString(),
      });
      
      // Send to WhatsApp
      const text = `Hello S-Web Hub!\n\nNew Inquiry from Website:\nName: ${name}\nPhone: ${phone}\nInterested In: ${service}\n\nMessage:\n${message}`;
      openWhatsApp(text);
      
      setLastSubmitTime(now);
      setFormStatus('submitted');
      setTimeout(() => setFormStatus('idle'), 3000);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Error saving inquiry:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6 border border-blue-200"
            >
              🚀 Empowering Indian Small Businesses
            </motion.span>
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
            >
              Get Your Business Online in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">24 Hours</span>
            </motion.h1>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Fast, affordable, and stunning websites tailored for startups and local businesses. Start your digital journey today.
            </motion.p>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#pricing" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                View Pricing <ArrowRight size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#portfolio" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm flex items-center justify-center">
                See Our Work
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to establish a powerful online presence.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
            {[
              { icon: Monitor, title: 'Website Design', desc: 'Custom, responsive websites tailored to your brand identity.' },
              { icon: RefreshCw, title: 'Redesign', desc: 'Give your old, outdated website a modern and fresh look.' },
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8 }} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose S-Web Hub?</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We understand the challenges of small businesses in India. That's why we've streamlined our process to deliver high-quality websites quickly and affordably.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed to keep visitors engaged.' },
                  { icon: IndianRupee, title: 'Highly Affordable', desc: 'Premium quality that fits your budget.' },
                  { icon: Smartphone, title: 'Mobile-Friendly', desc: 'Looks perfect on all devices and screens.' },
                  { icon: Search, title: 'SEO Optimized', desc: 'Built to help you rank higher on Google.' },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                      <benefit.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-slate-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img 
                  src="https://picsum.photos/seed/workspace/800/600" 
                  alt="Modern workspace" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">No hidden fees. Choose the perfect plan for your business needs.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -8 }} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                <p className="text-slate-500 text-sm mb-6">Perfect for small local businesses.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">₹2,499</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Single Page Website', 'Mobile Responsive', 'Contact Form', 'WhatsApp Integration', 'Basic SEO Setup'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleBuyPlanMessage('Starter', 2499)}
                  className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-3 rounded-xl transition-colors"
                >
                  Buy Starter Plan
                </button>
              </motion.div>
            </FadeIn>

            {/* Growth Plan */}
            <FadeIn delay={0.2}>
              <motion.div whileHover={{ y: -8 }} className="bg-blue-600 rounded-3xl p-8 border border-blue-500 shadow-2xl shadow-blue-600/20 transform md:-translate-y-4 hover:-translate-y-6 transition-all h-full flex flex-col relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-300 text-blue-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                <p className="text-blue-100 text-sm mb-6">Ideal for growing companies.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">₹4,999</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Up to 5 Pages', 'Premium Design', 'Mobile Responsive', 'Advanced SEO Setup', 'Social Media Integration', '1 Month Free Support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <CheckCircle2 size={20} className="text-blue-300 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleBuyPlanMessage('Growth', 4999)}
                  className="w-full block text-center bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 rounded-xl transition-colors shadow-md"
                >
                  Buy Growth Plan
                </button>
              </motion.div>
            </FadeIn>

            {/* Premium Plan */}
            <FadeIn delay={0.3}>
              <motion.div whileHover={{ y: -8 }} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Premium</h3>
                <p className="text-slate-500 text-sm mb-6">For established businesses needing more.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">₹9,999</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Up to 15 Pages', 'Custom Animations', 'Admin Dashboard', 'Content Management', 'Advanced Analytics', '3 Months Free Support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleBuyPlanMessage('Premium', 9999)}
                  className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-3 rounded-xl transition-colors"
                >
                  Buy Premium Plan
                </button>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Projects</h2>
              <p className="text-lg text-slate-600 max-w-2xl">Take a look at some of the stunning websites we've built for our clients.</p>
            </div>
            <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
              Start Your Project <ArrowRight size={20} />
            </a>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600&h=450', title: 'Local Cafe Single Page', category: 'Starter Plan Example', link: '/cafe' },
              { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=450', title: 'Tech Startup Website', category: 'Growth Plan Example', link: '/tech' },
              { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=450', title: 'Corporate Portal', category: 'Premium Plan Example', link: '/premium' },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="group rounded-2xl overflow-hidden cursor-pointer block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-blue-400 font-medium text-sm mb-1">{item.category}</span>
                      <h3 className="text-white font-bold text-xl">{item.title}</h3>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Got questions? We've got answers.</p>
          </FadeIn>
          <FadeIn delay={0.1} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <FAQItem 
              question="How much does a website cost?" 
              answer="Our pricing is highly affordable for small businesses in India. Our Starter plan begins at just ₹2,499, which includes a single-page responsive website. We also have Growth (₹4,999) and Premium (₹9,999) plans for more advanced needs." 
            />
            <FAQItem 
              question="How long does it take to build a website?" 
              answer="We pride ourselves on speed! For our Starter and Growth plans, we can typically get your website designed, built, and live in about 48 hours. For our Premium plan, it takes about 5 to 7 days after receiving your content and requirements." 
            />
            <FAQItem 
              question="Where are you located?" 
              answer="We are proudly based in Chhattisgarh, India, but we work with clients all over the country to help them establish a strong online presence." 
            />
            <FAQItem 
              question="Do I need to pay for hosting and domain separately?" 
              answer="Our plans cover the design and development of your website. We can guide you on the best and most affordable hosting and domain providers, and we'll handle the technical setup for you completely free of charge!" 
            />
            <FAQItem 
              question="Will my website work on mobile phones?" 
              answer="Absolutely! Every website we build is 100% mobile-responsive, meaning it will look perfect and function smoothly on smartphones, tablets, and desktop computers." 
            />
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="p-10 md:p-16 bg-blue-600 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
                  <p className="text-blue-100 text-lg mb-10">
                    Fill out the form or reach out to us directly on WhatsApp. We'll get back to you within 2 hours.
                  </p>
                  
                  <div className="space-y-6 mb-12">
                    <a 
                      href="sms:+918305500767" 
                      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm">Text us</p>
                        <p className="font-semibold text-lg">+91 83055 00767</p>
                      </div>
                    </a>
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=webhub2811@gmail.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm">Email us</p>
                        <p className="font-semibold text-lg">webhub2811@gmail.com</p>
                      </div>
                    </a>
                    <a 
                      href="https://www.instagram.com/webhub2811/?hl=en" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Instagram size={24} />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm">Follow us</p>
                        <p className="font-semibold text-lg">@webhub2811</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div>
                  <motion.a 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    href="https://wa.me/918305500767?text=Hi%20S-Web%20Hub,%20I%20need%20a%20website!" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg"
                  >
                    <MessageCircle size={24} />
                    Chat on WhatsApp
                  </motion.a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-10 md:p-16 bg-slate-50">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h3>
                
                {formStatus === 'submitted' ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl flex items-center gap-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                    <div>
                      <h4 className="font-bold text-lg">Message Sent!</h4>
                      <p>We'll get back to you shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Interested In</label>
                      <select 
                        id="service" 
                        name="service"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option>Starter Plan (₹2,499)</option>
                        <option>Growth Plan (₹4,999)</option>
                        <option>Premium Plan (₹9,999)</option>
                        <option>Custom Requirement</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white resize-none"
                        placeholder="Tell us about your business..."
                      ></textarea>
                    </div>
                    
                    {/* Honeypot field - hidden from real users, bots will fill it */}
                    <input 
                      type="text" 
                      name="botcheck" 
                      className="hidden" 
                      style={{ display: 'none' }} 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />

                    <button 
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors shadow-md"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
