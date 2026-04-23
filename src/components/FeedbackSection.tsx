import React, { useState } from 'react';
import { Star, MessageCircle, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function FeedbackSection() {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = (method: 'whatsapp' | 'email') => {
    if (!name || !message) {
      alert("Please fill out your name and feedback.");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
        if (method === 'whatsapp') {
          const text = `Hi S-Web Hub! I wanted to leave some feedback.%0A%0A*Name:* ${name}%0A*Rating:* ${rating}/5 Stars%0A*Feedback:* ${message}`;
          window.open(`https://wa.me/918305500767?text=${text}`, '_blank');
        } else {
          const subject = encodeURIComponent(`Feedback from ${name}`);
          const body = encodeURIComponent(`Hi S-Web Hub!\n\nI wanted to leave some feedback.\n\nRating: ${rating}/5 Stars\n\nFeedback:\n${message}`);
          window.location.href = `mailto:webhub2811@gmail.com?subject=${subject}&body=${body}`;
        }
        
        setName('');
        setMessage('');
        setRating(5);
        setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="feedback" className="py-20 bg-white relative overflow-hidden text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">We Value Your Feedback</h2>
          <p className="text-lg text-slate-600">Help us improve by sharing your experience with S-Web Hub.</p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xl"
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">How would you rate our services?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="feedback-name" className="block text-sm font-semibold mb-2 text-slate-700">Your Name / Business Name</label>
              <input
                type="text"
                id="feedback-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="feedback-message" className="block text-sm font-semibold mb-2 text-slate-700">Your Feedback</label>
              <textarea
                id="feedback-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white resize-none text-slate-900"
                placeholder="Tell us what you liked or how we can improve..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => submitFeedback('whatsapp')}
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                <MessageCircle size={20} />
                Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => submitFeedback('email')}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                <Mail size={20} />
                Send via Email
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
