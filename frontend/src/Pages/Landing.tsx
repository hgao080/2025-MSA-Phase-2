import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import Hero from '../Components/Hero';

const stats = [
  { id: 1, name: 'Active projects', value: 200 },
  { id: 2, name: 'Developers connected', value: 500 },
  { id: 3, name: 'Universities represented', value: 25 },
];

const features = [
  {
    name: 'Create Projects',
    description: 'Spin up a project, define roles needed, and attract the perfect collaborators.',
    icon: RocketLaunchIcon,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Showcase Skills',
    description: 'Build your developer profile to highlight your expertise and connect with like-minded peers.',
    icon: SparklesIcon,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Apply & Connect',
    description: 'Browse open projects and apply with a single click. Skip the awkward intros.',
    icon: UserGroupIcon,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Learn & Grow',
    description: 'Gain real-world experience working in teams while building your portfolio.',
    icon: CommandLineIcon,
    color: 'from-amber-500 to-amber-600',
  },
];

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

export default function Landing() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-slate-50 dark:from-gray-900 to-indigo-50 dark:to-indigo-950">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto lg:max-w-none max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-bold text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl tracking-tight">
                Trusted by students across universities
              </h2>
              <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-8">
                Join a growing community of student developers building their portfolios together.
              </p>
            </motion.div>
            
            <div className="gap-0.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 rounded-2xl overflow-hidden text-center">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col bg-white/5 hover:bg-indigo-50 dark:bg-gray-800/5 dark:hover:bg-indigo-950/30 backdrop-blur-sm p-8 transition-colors duration-300"
                >
                  <dt className="font-medium text-gray-600 dark:text-gray-400 text-base leading-7">{stat.name}</dt>
                  <dd className="order-first bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-transparent text-3xl tracking-tight group-hover:scale-110 transition-transform duration-300">
                    {stat.value}+
                  </dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-semibold text-indigo-600 text-base leading-7">Connect Faster</h2>
            <p className="mt-2 font-bold text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl tracking-tight">
              Everything you need to build your developer network
            </p>
            <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-8">
              Cobweb streamlines the process of finding the perfect collaborators for your projects and helps you join teams that match your skills and interests.
            </p>
          </motion.div>
        </div>
        <div className="relative pt-16">
          <div className="mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="group relative bg-white dark:bg-gray-800 shadow-sm hover:shadow-md p-6 rounded-2xl ring-1 ring-gray-900/10 dark:ring-gray-100/10 transition-all hover:-translate-y-1 duration-300"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:group-hover:text-indigo-400 dark:text-gray-100 group-hover:text-indigo-600 text-lg leading-8 transition-colors duration-300">{feature.name}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-base leading-7">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
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
              <div className="isolate relative flex flex-col justify-between gap-y-6 px-6 sm:px-12 py-12 sm:py-16">            <div className="relative">
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

      {/* CTA Section */}
      <div className="isolate relative">
        <div className="mx-auto px-6 lg:px-8 py-24 sm:py-32 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 shadow-2xl hover:shadow-2xl hover:shadow-indigo-500/20 px-6 sm:px-16 py-16 rounded-3xl overflow-hidden transition-shadow duration-300">
              <h2 className="mx-auto max-w-2xl font-bold text-white text-3xl sm:text-4xl tracking-tight">
                Ready to find your next collaborators?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-indigo-100 text-lg leading-8">
                Join Cobweb today and start connecting with other student developers who share your passion for building amazing web applications.
              </p>
              
              <div className="flex justify-center items-center gap-x-6 mt-10">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/register"
                  className="bg-white hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-indigo-950/30 shadow-sm px-3.5 py-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 font-semibold text-indigo-600 dark:text-indigo-400 text-sm transition-all duration-300"
                >
                  Create account
                </motion.a>
                <a href="/projects" className="group font-semibold text-white text-sm">
                  Browse projects <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1 duration-300">→</span>
                </a>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">© 2025 Cobweb. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
