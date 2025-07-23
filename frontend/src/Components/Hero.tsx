import { motion } from 'framer-motion';
import NetworkVisualization from './NetworkVisualization';

export default function Hero() {
  return (
      <div className="relative overflow-hidden">
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
            <NetworkVisualization />
          </div>
        </div>
      </div>
  );
}
