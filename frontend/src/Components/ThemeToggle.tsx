import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '../Stores/ThemeStore';

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? 180 : 0,
          scale: isDarkMode ? 0.8 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-5 h-5"
      >
        {isDarkMode ? (
          <SunIcon className="absolute inset-0 w-5 h-5 text-amber-500" />
        ) : (
          <MoonIcon className="absolute inset-0 w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        )}
      </motion.div>
      
      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-200/20 dark:from-indigo-500/20 to-orange-200/20 dark:to-purple-500/20 rounded-xl"
        animate={{ 
          opacity: isDarkMode ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
