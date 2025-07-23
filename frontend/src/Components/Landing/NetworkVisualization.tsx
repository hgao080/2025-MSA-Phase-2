import { motion } from 'framer-motion';

export default function NetworkVisualization() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex-none bg-white/10 dark:bg-gray-800/10 shadow-xl hover:shadow-2xl backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl ring-1 ring-gray-900/10 dark:ring-gray-100/10 w-[450px] sm:max-w-none max-w-xl h-[350px] overflow-hidden transition-shadow duration-300"
    >
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
  );
}
