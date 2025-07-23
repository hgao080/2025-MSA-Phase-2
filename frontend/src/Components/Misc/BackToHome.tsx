import { useNavigate } from 'react-router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center gap-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 shadow-lg backdrop-blur-sm px-4 py-2 border border-gray-200/60 dark:border-gray-600/60 rounded-xl font-medium text-gray-700 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-300 text-sm transition-all duration-200"
    >
      <ArrowLeftIcon className="w-4 h-4" />
      Back to Home
    </button>
  );
}
