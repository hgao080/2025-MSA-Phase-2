import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    content: "Cobweb helped me find amazing teammates for my final year project. We're still collaborating today!",
    author: "Sarah L.",
    role: "Computer Science Student",
    avatar: "SL"
  },
  {
    content: "I posted my API project idea and had a full team of skilled developers within 48 hours.",
    author: "Michael T.",
    role: "Software Engineering Student",
    avatar: "MT"
  },
  {
    content: "Found my hackathon team through Cobweb. We won first place!",
    author: "Priya K.",
    role: "Data Science Student",
    avatar: "PK"
  },
  {
    content: "The quality of developers I connected with through Cobweb exceeded my expectations.",
    author: "James W.",
    role: "Full Stack Developer Student",
    avatar: "JW"
  }
];

export default function TestimonialsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-indigo-50 dark:to-indigo-950/20 py-24 sm:py-32">
      <div className="mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-semibold text-indigo-600 dark:text-indigo-400 text-base leading-8">Testimonials</h2>
          <p className="mt-2 font-bold text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl tracking-tight">
            Hear from our community
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto mt-16 sm:mt-20 lg:mt-24 max-w-2xl lg:max-w-4xl"
        >
          <div className="relative bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl rounded-3xl ring-1 ring-gray-900/10 dark:ring-gray-100/10 overflow-hidden transition-shadow duration-300">
            <div className="isolate relative flex flex-col justify-between gap-y-6 px-6 sm:px-12 py-12 sm:py-16">
              <div className="relative">
                <motion.div 
                  key={selectedTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <blockquote className="font-semibold text-gray-900 dark:text-gray-100 text-xl sm:text-2xl leading-8 sm:leading-9">
                    <p>"{testimonials[selectedTestimonial].content}"</p>
                  </blockquote>
                  <div className="flex items-center gap-x-4 mt-8">
                    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-12 h-12 font-bold text-white text-lg">
                      {testimonials[selectedTestimonial].avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonials[selectedTestimonial].author}</div>
                      <div className="text-gray-600 dark:text-gray-400">{testimonials[selectedTestimonial].role}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex justify-center gap-x-4 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTestimonial(idx)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${selectedTestimonial === idx ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'}`}
                    aria-label={`Testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
