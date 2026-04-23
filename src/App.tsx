import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChatBot } from './components/ChatBot';
import { FeedbackSection } from './components/FeedbackSection';
import {
  Menu, X, Monitor, ShoppingCart, Layout, RefreshCw,
  Zap, IndianRupee, Smartphone, Search, CheckCircle2,
  MessageCircle, ArrowRight, Mail, Phone, MapPin, Instagram, MessageSquare, ChevronDown, MousePointerClick
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay * 1000}
    data-aos-offset="50"
    className={className}
  >
    {children}
  </div>
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Work', href: '/our-work' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden flex flex-col relative w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <img src="/logo.svg" alt="S-Web Hub Logo" className="w-10 h-10 rounded-lg shadow-md group-hover:scale-110 transition-transform" />
              <span className="font-bold text-2xl tracking-tight text-slate-900">
                S-Web <span className="text-blue-600">Hub</span>
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`text-base font-semibold transition-colors ${
                    (location.pathname === '/' && link.href === '/') ||
                    (location.pathname === '/' && location.hash === link.href.replace('/', '')) || 
                    (location.pathname === link.href && link.href !== '/')
                      ? 'text-blue-600' 
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Menu button (Visible on mobile) */}
            <div className="flex items-center md:hidden">
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
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    {link.name}
                  </Link>
                ))}
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
                <img src="/logo.svg" alt="S-Web Hub Logo" className="w-8 h-8 rounded-md" />
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
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link to="/our-work" className="hover:text-blue-400 transition-colors">Our Work</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} S-Web Hub. All rights reserved.</p>
            <p className="mt-2 md:mt-0 text-sm">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
      
      {/* Mobile Floating Call Button */}
      <a
        href="tel:+918305500767"
        className="fixed bottom-4 left-4 sm:hidden w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-transform hover:scale-110 z-50"
        aria-label="Call us"
      >
        <Phone size={28} />
      </a>

      {/* AI Chat Bot */}
      <ChatBot />
    </div>
  );
}

export function AppHome() {
  const navigate = useNavigate();

  const handleBuyPlanMessage = async (planName: string, priceAmount: number) => {
    navigate(`/contact?service=${encodeURIComponent(planName)}&message=${encodeURIComponent(`Hi, I am interested in purchasing the ${planName} Plan (₹${priceAmount}). Please provide more details.`)}`);
  };

  const handleBookDemo = () => {
    navigate(`/contact?service=${encodeURIComponent('Custom Requirement')}&message=${encodeURIComponent('Hi S-Web Hub team, I would like to book a free demo to see how your services can help my business.')}`);
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
            >
              Get Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Website</span> Online in 24 Hours
            </motion.h1>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Fast, affordable, and stunning web design and website development tailored for startups and local businesses. Elevate your presence on the web today.
            </motion.p>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#pricing" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                View Pricing <ArrowRight size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#benefits" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm flex items-center justify-center">
                Benefits
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#feedback" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm flex items-center justify-center">
                Feedback
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <FadeIn className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose S-Web Hub?</h2>
            <p className="text-lg text-slate-300 mb-12 leading-relaxed">
              We understand the challenges of small businesses in India. That's why we've streamlined our process to deliver high-quality websites quickly and affordably.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mb-12">
              {[
                { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed to keep visitors engaged.' },
                { icon: IndianRupee, title: 'Highly Affordable', desc: 'Premium quality that fits your budget.' },
                { icon: Smartphone, title: 'Mobile-Friendly', desc: 'Looks perfect on all devices and screens.' },
                { icon: Search, title: 'SEO Optimized', desc: 'Built to help you rank higher on Google.' },
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
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
            
            <div className="flex justify-center mt-10">
              <button
                onClick={handleBookDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 group w-full sm:w-auto"
              >
                <Monitor className="group-hover:scale-110 transition-transform" />
                Book a Free Demo
              </button>
            </div>
          </FadeIn>
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
                  {['Single Page Website', 'Mobile Responsive', 'Contact Form', 'WhatsApp Integration', 'Basic SEO Setup', 'Free Chatbot for 24x7 Interaction'].map((feature, i) => (
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
                <Link to="/our-work" className="block text-center text-blue-600 font-semibold mt-4 hover:underline text-sm">
                  View Example Website
                </Link>
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
                  {['Up to 5 Pages', 'Premium Design', 'Mobile Responsive', 'Advanced SEO Setup', 'Social Media Integration', '1 Month Free Support', 'Free Chatbot for 24x7 Interaction'].map((feature, i) => (
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
                <Link to="/our-work" className="block text-center text-blue-200 font-semibold mt-4 hover:text-white hover:underline text-sm">
                  View Example Website
                </Link>
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
                  {['Up to 15 Pages', 'Custom Animations', 'Admin Dashboard', 'Content Management', 'Advanced Analytics', '3 Months Free Support', 'Free Chatbot for 24x7 Interaction'].map((feature, i) => (
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
                <Link to="/our-work" className="block text-center text-blue-600 font-semibold mt-4 hover:underline text-sm">
                  View Example Website
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      <FeedbackSection />
    </>
  );
}
