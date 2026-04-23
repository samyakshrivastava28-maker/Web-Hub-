import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

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

export function OurWorkPage() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="pt-24 min-h-screen">
      <section id="portfolio" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Our Work</h1>
              <p className="text-lg text-slate-600 max-w-2xl">Take a look at some of the stunning websites we've built for our clients.</p>
            </div>
            <Link to="/contact" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 border border-blue-200 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors">
              Start Your Project <ArrowRight size={20} />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'example-starter', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600&h=450', title: 'The Grand Dhaba', category: 'Starter Plan Example', link: 'https://example-granddhaba.netlify.app/' },
              { id: 'example-growth', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600&h=450', title: 'Wellness Gym', category: 'Growth Plan Example', link: 'https://example-wellnessgym.netlify.app/' },
              { id: 'example-premium', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600&h=450', title: 'S Jewellry', category: 'Premium Plan Example', link: 'https://example-sjewelers.netlify.app/' },
              { id: 'example-restaurant', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600&h=450', title: 'Fine Dining Restaurant', category: 'Restaurant Website Example', link: 'https://example-masalaandco.netlify.app/' },
              { id: 'example-clinic', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600&h=450', title: 'HealthFirst Clinic', category: 'Doctor Clinic Example', link: 'https://example-aura-clinic.netlify.app/' },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <a id={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="group rounded-2xl overflow-hidden cursor-pointer block border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold text-sm border border-slate-700 shadow-lg z-10">
                      {item.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg z-10 flex items-center gap-1 animate-pulse">
                      Tap it <MousePointerClick size={14} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-xl">{item.title}</h3>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
