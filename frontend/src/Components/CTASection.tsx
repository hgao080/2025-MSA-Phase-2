import { motion } from 'framer-motion';

export default function CTASection() {
  return (
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
        </motion.div>
      </div>
    </div>
  );
}
