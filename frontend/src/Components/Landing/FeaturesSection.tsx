import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';

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

export default function FeaturesSection() {
  return (
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
  );
}
