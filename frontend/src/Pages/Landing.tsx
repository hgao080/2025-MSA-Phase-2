import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';

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
  const [animatedStats, setAnimatedStats] = useState(stats.map(stat => ({ ...stat, currentValue: 0 })));
  const statsRef = useRef(null);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Animate stats when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1500;
          const frameDuration = 1000 / 60;
          const totalFrames = duration / frameDuration;
          let frame = 0;
          
          const timer = setInterval(() => {
            frame++;
            const progress = Math.min(frame / totalFrames, 1);
            
            setAnimatedStats(stats.map(stat => {
              const value = Math.floor(progress * stat.value);
              return { ...stat, currentValue: value };
            }));
            
            if (frame === totalFrames) {
              clearInterval(timer);
            }
          }, frameDuration);
          
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-slate-50 dark:from-gray-900 to-indigo-50 dark:to-indigo-950">
      {/* Hero Section */}
      <div className="relative lg:min-h-[85vh] overflow-hidden">
        {/* Background Elements */}
        <div className="-z-10 absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.100),transparent)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.900),transparent)]"></div>
          <div className="top-0 sm:top-[calc(50%-30rem)] left-1/3 sm:left-[calc(50%-30rem)] -z-10 absolute blur-3xl transform-gpu -translate-x-1/2" aria-hidden="true">
            <div className="bg-gradient-to-tr from-[#ff80b5] to-[#6366f1] opacity-20 w-[72.1875rem] aspect-[1155/678]" 
                 style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="lg:flex lg:items-center mx-auto mt-0 px-6 lg:px-8 lg:py-40 pt-16 pb-24 sm:pb-32 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:flex-shrink-0 mx-auto lg:mx-0 lg:pt-8 lg:max-w-xl max-w-2xl"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 font-bold text-gray-900 dark:text-gray-100 text-4xl sm:text-6xl tracking-tight"
            >
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="block bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 pb-2 text-transparent"
              >
                Weave your web.
              </motion.span> 
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Connect, Collaborate, Create
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-8"
            >
              Cobweb is where student developers find their perfect teammates, form productive teams, 
              and build amazing web projects together. From coursework to hackathons to passion projects — 
              weave your perfect development network.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-x-6 mt-10"
            >
              <a
                href="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-sm hover:shadow-indigo-500/50 hover:shadow-lg px-4 py-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 font-semibold text-white text-sm transition-all hover:translate-y-[-2px] duration-200 ease-in-out"
              >
                Get started
              </a>
              <a href="/projects" className="group flex items-center font-semibold text-gray-900 dark:text-gray-100 text-sm leading-6">
                Browse Projects 
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </motion.div>
          <div className="flex lg:flex-none justify-center mx-auto mt-16 sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 xl:ml-32 lg:max-w-none max-w-2xl">
            {/* Network Visualization */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex-none bg-white/10 dark:bg-gray-800/10 shadow-xl hover:shadow-2xl backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl ring-1 ring-gray-900/10 dark:ring-gray-100/10 w-[450px] sm:max-w-none max-w-xl h-[350px] overflow-hidden transition-shadow duration-300"
            >
              {/* Grid Pattern */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(79, 70, 229, 0.1)" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
              </svg>

              {/* Network Nodes */}
              <motion.svg 
                className="absolute inset-0 w-full h-full" 
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {/* Central node */}
                <motion.circle 
                  cx="225" cy="175" r="15" fill="url(#gradient-central)" 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                
                {/* Main developer nodes */}
                {[
                  { cx: 110, cy: 110, r: 12, delay: 0.7 },    // Frontend Dev (top-left, lowered)
                  { cx: 340, cy: 120, r: 12, delay: 0.8 },    // Backend Dev (top-right, lowered)
                  { cx: 320, cy: 270, r: 12, delay: 0.9 },   // Designer (bottom-right)
                  { cx: 80, cy: 230, r: 12, delay: 1.0 },    // Fullstack (bottom-left)
                ].map((node, index) => (
                  <motion.circle 
                    key={index}
                    cx={node.cx} cy={node.cy} r={node.r} 
                    fill={`url(#gradient-${(index % 4) + 1})`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: node.delay }}
                  />
                ))}
                
                {/* Connection lines - You to different developers */}
                {[
                  { x1: 225, y1: 175, x2: 110, y2: 110, delay: 1.3 },   // To Frontend
                  { x1: 225, y1: 175, x2: 340, y2: 120, delay: 1.4 },   // To Backend
                  { x1: 225, y1: 175, x2: 320, y2: 270, delay: 1.5 },  // To Designer
                  { x1: 225, y1: 175, x2: 80, y2: 230, delay: 1.6 },   // To Fullstack
                ].map((line, index) => (
                  <motion.line 
                    key={index}
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="url(#line-gradient)" strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 0.8, delay: line.delay }}
                  />
                ))}
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient-central" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#7e22ce" />
                  </linearGradient>
                  <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                  <linearGradient id="gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </motion.svg>
              
              {/* Node labels - Developer Roles */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="top-[175px] left-[225px] absolute -translate-x-1/2 -translate-y-1/2 transform"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg px-4 py-2 border-2 border-white dark:border-gray-300 rounded-full font-semibold text-white text-sm">You</div>
              </motion.div>
              
              {/* Node labels - Main Developer Roles */}
              {[
                { top: '100px', left: '110px', text: "Frontend Dev", color: "from-blue-500 to-blue-600", delay: 1.2 },
                { top: '110px', left: '340px', text: "Backend Dev", color: "from-green-500 to-green-600", delay: 1.3 },
                { top: '280px', left: '320px', text: "Designer", color: "from-purple-500 to-purple-600", delay: 1.4 },
                { top: '240px', left: '80px', text: "Fullstack", color: "from-orange-500 to-orange-600", delay: 1.5 },
              ].map((label, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: label.delay, type: "spring", stiffness: 200 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transform"
                  style={{ top: label.top, left: label.left }}
                >
                  <div className={`bg-gradient-to-r ${label.color} text-white px-3 py-1 rounded-full text-xs font-medium shadow-md border border-white/20 dark:border-gray-300/20 hover:scale-105 transition-transform duration-200`}>
                    {label.text}
                  </div>
                </motion.div>
              ))}

              {/* Network Stats Overlay */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="top-4 left-4 absolute bg-white/95 dark:bg-gray-800/95 shadow-lg backdrop-blur-sm p-3 rounded-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse"></div>
                  <span className="font-medium text-gray-700 dark:text-gray-200 text-xs">6 developers online</span>
                </div>
              </motion.div>

              {/* Skills Showcase */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="top-4 right-4 absolute bg-white/95 dark:bg-gray-800/95 shadow-lg backdrop-blur-sm p-3 rounded-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5"
              >
                <div className="mb-2 font-medium text-gray-700 dark:text-gray-200 text-xs">Popular Skills</div>
                <div className="flex flex-wrap gap-1">
                  {['React', 'Node.js', 'Figma'].map((skill) => (
                    <span key={skill} className="bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full font-medium text-indigo-700 dark:text-indigo-300 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="py-24 sm:py-32">
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
              {animatedStats.map((stat, index) => (
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
                    {stat.currentValue}+
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
