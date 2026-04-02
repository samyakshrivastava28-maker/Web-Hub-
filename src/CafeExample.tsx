import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';

export default function CafeExample() {
  const [booked, setBooked] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/90 backdrop-blur-md text-stone-50 py-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-wider uppercase">
            <Coffee className="text-amber-500" />
            <span>The Daily Roast</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
            <a href="#menu" className="hover:text-amber-500 transition-colors">Menu</a>
            <a href="#visit" className="hover:text-amber-500 transition-colors">Visit Us</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-stone-900">
          <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif"
          >
            Crafted with <span className="text-amber-500">Passion</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-200 mb-8"
          >
            Your neighborhood spot for artisanal coffee and fresh pastries.
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            href="#menu" 
            className="inline-block bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-8 py-4 rounded-full transition-colors"
          >
            View Our Menu
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Our Story</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-8"></div>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            Founded in 2018, The Daily Roast started with a simple mission: to bring exceptional, ethically sourced coffee to our neighborhood. We believe that a great cup of coffee can transform your day, and we're dedicated to perfecting that craft every single morning.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            Our pastries are baked fresh in-house daily, using traditional recipes and the finest local ingredients. Whether you're grabbing a quick espresso on your way to work or settling in for a lazy Sunday brunch, we're here to make you feel right at home.
          </p>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Menu Highlights</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Coffee className="text-amber-500"/> Coffee</h3>
              <div className="space-y-6">
                {[
                  { name: 'Espresso', price: '₹120', desc: 'Rich and bold single shot.' },
                  { name: 'Cappuccino', price: '₹180', desc: 'Espresso with steamed milk and thick foam.' },
                  { name: 'Pour Over', price: '₹200', desc: 'Hand-brewed single origin coffee.' },
                ].map((item, i) => (
                  <div key={i} className="border-b border-stone-200 pb-4">
                    <div className="flex justify-between font-bold text-lg mb-1">
                      <span>{item.name}</span>
                      <span className="text-amber-600">{item.price}</span>
                    </div>
                    <p className="text-stone-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Coffee className="text-amber-500"/> Pastries</h3>
              <div className="space-y-6">
                {[
                  { name: 'Butter Croissant', price: '₹150', desc: 'Flaky, buttery, and baked fresh daily.' },
                  { name: 'Blueberry Muffin', price: '₹140', desc: 'Loaded with fresh blueberries.' },
                  { name: 'Chocolate Babka', price: '₹190', desc: 'Swirled with rich dark chocolate.' },
                ].map((item, i) => (
                  <div key={i} className="border-b border-stone-200 pb-4">
                    <div className="flex justify-between font-bold text-lg mb-1">
                      <span>{item.name}</span>
                      <span className="text-amber-600">{item.price}</span>
                    </div>
                    <p className="text-stone-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section id="visit" className="py-20 bg-stone-900 text-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <MapPin className="text-amber-500 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-stone-400">123 Cafe Street<br/>Bandra West, Mumbai 400050</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <Clock className="text-amber-500 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Hours</h3>
              <p className="text-stone-400">Mon - Fri: 7am - 8pm<br/>Sat - Sun: 8am - 9pm</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <Phone className="text-amber-500 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <p className="text-stone-400">+91 98765 43210<br/>hello@dailyroast.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section id="book" className="py-20 bg-stone-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Reserve a Table</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
          </div>
          {booked ? (
            <div className="bg-green-100 border border-green-200 text-green-800 p-8 rounded-xl text-center shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Table Reserved!</h3>
              <p>We look forward to seeing you. A confirmation has been sent to your email.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setBooked(true); }} className="bg-white p-8 rounded-xl shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Guests</label>
                  <select className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3-4 People</option>
                    <option>5+ People</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Email</label>
                <input required type="email" placeholder="john@example.com" className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-4 rounded-lg transition-colors">
                Confirm Reservation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-500 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} The Daily Roast. All rights reserved.</p>
        <p className="text-sm mt-2">Built by <a href="/" className="text-amber-500 hover:underline">S-Web Hub</a> (Starter Plan Example)</p>
      </footer>
    </div>
  );
}
