import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, Mail, Phone, Instagram } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const location = useLocation();

  const [initialService, setInitialService] = useState('');
  const [initialMessage, setInitialMessage] = useState('');

  useEffect(() => {
    // Parse query parameters
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    const messageParam = params.get('message');
    
    if (serviceParam) setInitialService(serviceParam);
    if (messageParam) setInitialMessage(messageParam);
  }, [location]);

  const openWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    const phoneNumber = "918305500767";
    
    // Check if user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodedText}`, '_blank');
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`, '_blank');
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
      console.warn("Bot detected.");
      return;
    }
    
    const sanitize = (str: string) => str.replace(/[<>]/g, '');
    
    const name = sanitize(formData.get('name') as string || '');
    const phone = sanitize(formData.get('phone') as string || '');
    const service = sanitize(formData.get('service') as string || '');
    const message = sanitize(formData.get('message') as string || '');

    try {
      await addDoc(collection(db, 'inquiries'), {
        type: 'contact_form',
        name,
        phone,
        service,
        message,
        createdAt: new Date().toISOString(),
      });
      
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
    <div className="pt-24 min-h-screen bg-slate-50">
      <section id="contact" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="p-10 md:p-16 bg-blue-600 text-white flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">Contact Us</h1>
                  <p className="text-blue-100 text-lg mb-10">
                    Ready to get started? Fill out the form or reach out to us directly on WhatsApp. We'll get back to you within 2 hours.
                  </p>
                  
                  <div className="space-y-6 mb-12">
                    <a 
                      href="tel:+918305500767" 
                      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm">Call us</p>
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
              <div className="p-10 md:p-16 bg-white">
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
                        defaultValue={initialService || "Starter Plan (₹2,499)"}
                        key={initialService}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="Starter Plan (₹2,499)">Starter Plan (₹2,499)</option>
                        <option value="Growth Plan (₹4,999)">Growth Plan (₹4,999)</option>
                        <option value="Premium Plan (₹9,999)">Premium Plan (₹9,999)</option>
                        <option value="Custom Requirement">Custom Requirement</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        rows={4}
                        required
                        defaultValue={initialMessage}
                        key={initialMessage + "msg"}
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
    </div>
  );
}
