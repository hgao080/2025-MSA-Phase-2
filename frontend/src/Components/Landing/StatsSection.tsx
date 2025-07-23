import { motion } from 'framer-motion';

const stats = [
  { id: 1, name: 'Active projects', value: 200 },
  { id: 2, name: 'Developers connected', value: 500 },
  { id: 3, name: 'Universities represented', value: 25 },
];

export default function StatsSection() {
  return (
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
  );
}
