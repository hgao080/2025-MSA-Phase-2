import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useAuthStore } from '../Stores/AuthStore';
import { 
  EyeIcon, 
  EyeSlashIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// Custom Cobweb Logo Component
const CobwebLogo = ({ className = "h-12 w-auto" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 120 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Web icon - interconnected nodes */}
    <g transform="translate(2, 8)">
      {/* Connection lines */}
      <path 
        d="M12 12 L20 8 M12 12 L20 16 M12 12 L4 8 M12 12 L4 16 M20 8 L28 12 M20 16 L28 12" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5" 
        strokeOpacity="0.6"
      />
      {/* Nodes */}
      <circle cx="12" cy="12" r="3" fill="url(#logoGradient)" />
      <circle cx="4" cy="8" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="4" cy="16" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="20" cy="8" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="20" cy="16" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="28" cy="12" r="2.5" fill="url(#logoGradient)" opacity="0.9" />
    </g>
    
    {/* Text "Cobweb" */}
    <text 
      x="42" 
      y="25" 
      className="fill-current font-bold text-lg" 
      style={{ fill: 'url(#logoTextGradient)' }}
    >
      Cobweb
    </text>
    
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#7e22ce" />
      </linearGradient>
      <linearGradient id="logoTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1f2937" />
        <stop offset="100%" stopColor="#4b5563" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Register() {
	const navigate = useNavigate();
	const { user, register, isLoading } = useAuthStore();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confPassword, setConfPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfPassword, setShowConfPassword] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (user !== null) {
			navigate('/projects');
			return;
		}
	}, [user, navigate]);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (password !== confPassword) {
			setError('Passwords do not match');
			return;
		}

		const req = {
			firstName,
			lastName,
			email,
			password,
		};

		try {
			await register(req);
			navigate('/login');
		} catch {
			setError('Registration failed. Please try again.');
		}
	};

	return (
		<div className="bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 min-h-screen">
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,theme(colors.purple.100),transparent)]"></div>
				<div className="top-0 left-0 absolute blur-3xl transform-gpu -translate-x-12 -translate-y-12" aria-hidden="true">
					<div className="bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] opacity-20 w-[72.1875rem] aspect-[1155/678]" 
						 style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
				</div>
			</div>

			<div className="relative flex flex-col flex-1 justify-center px-6 lg:px-8 py-12 min-h-screen">
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="sm:mx-auto sm:w-full sm:max-w-md"
				>
					{/* Logo */}
					<motion.div 
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="flex justify-center"
					>
						<CobwebLogo className="w-auto h-16" />
					</motion.div>

					{/* Welcome Message */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mt-8 text-center"
					>
						<h2 className="bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 font-bold text-transparent text-3xl tracking-tight">
							Join Cobweb
						</h2>
						<p className="mt-2 text-gray-600">
							Create your account to start collaborating
						</p>
					</motion.div>
				</motion.div>

				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="sm:mx-auto mt-10 sm:w-full sm:max-w-lg"
				>
					<div className="bg-white/80 shadow-xl backdrop-blur-sm px-8 py-10 border border-gray-200/60 rounded-2xl">
						<form className="space-y-6" onSubmit={handleRegister}>
							{error && (
								<motion.div 
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="bg-red-50 p-4 border border-red-200 rounded-xl"
								>
									<div className="flex items-center">
										<SparklesIcon className="mr-2 w-5 h-5 text-red-500" />
										<p className="text-red-600 text-sm">{error}</p>
									</div>
								</motion.div>
							)}

							{/* Name Fields */}
							<div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
								<div>
									<label htmlFor="firstName" className="block mb-2 font-medium text-gray-900 text-sm">
										First Name
									</label>
									<div className="relative">
										<input
											id="firstName"
											name="firstName"
											type="text"
											required
											className="block bg-white/50 dark:bg-gray-700/50 px-4 py-3 pl-10 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 w-full text-gray-900 dark:placeholder:text-gray-400 dark:text-gray-100 placeholder:text-gray-500 transition-all duration-200"
											placeholder="First name"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
										<UserIcon className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
									</div>
								</div>

								<div>
									<label htmlFor="lastName" className="block mb-2 font-medium text-gray-900 text-sm">
										Last Name
									</label>
									<div className="relative">
										<input
											id="lastName"
											name="lastName"
											type="text"
											required
											className="block bg-white/50 dark:bg-gray-700/50 px-4 py-3 pl-10 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 w-full text-gray-900 dark:placeholder:text-gray-400 dark:text-gray-100 placeholder:text-gray-500 transition-all duration-200"
											placeholder="Last name"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
										<UserIcon className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
									</div>
								</div>
							</div>

							{/* Email */}
							<div>
								<label htmlFor="email" className="block mb-2 font-medium text-gray-900 text-sm">
									Email address
								</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className="block bg-white/50 dark:bg-gray-700/50 px-4 py-3 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 w-full text-gray-900 dark:placeholder:text-gray-400 dark:text-gray-100 placeholder:text-gray-500 transition-all duration-200"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* Password */}
							<div>
								<label htmlFor="password" className="block mb-2 font-medium text-gray-900 text-sm">
									Password
								</label>
								<div className="relative">
									<input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										required
										autoComplete="new-password"
										className="block bg-white/50 dark:bg-gray-700/50 px-4 py-3 pr-12 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 w-full text-gray-900 dark:placeholder:text-gray-400 dark:text-gray-100 placeholder:text-gray-500 transition-all duration-200"
										placeholder="Create a password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="right-0 absolute inset-y-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
									>
										{showPassword ? (
											<EyeSlashIcon className="w-5 h-5" />
										) : (
											<EyeIcon className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div>
								<label htmlFor="confPassword" className="block mb-2 font-medium text-gray-900 text-sm">
									Confirm Password
								</label>
								<div className="relative">
									<input
										id="confPassword"
										name="confPassword"
										type={showConfPassword ? "text" : "password"}
										required
										autoComplete="new-password"
										className="block bg-white/50 dark:bg-gray-700/50 px-4 py-3 pr-12 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 w-full text-gray-900 dark:placeholder:text-gray-400 dark:text-gray-100 placeholder:text-gray-500 transition-all duration-200"
										placeholder="Confirm your password"
										value={confPassword}
										onChange={(e) => setConfPassword(e.target.value)}
									/>
									<button
										type="button"
										onClick={() => setShowConfPassword(!showConfPassword)}
										className="right-0 absolute inset-y-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
									>
										{showConfPassword ? (
											<EyeSlashIcon className="w-5 h-5" />
										) : (
											<EyeIcon className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type="submit"
								disabled={isLoading}
								className="flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 disabled:opacity-50 shadow-lg px-4 py-3 rounded-xl focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 w-full font-semibold text-white text-sm transition-all duration-200 disabled:cursor-not-allowed"
							>
								{isLoading ? (
									<>
										<motion.div 
											animate={{ rotate: 360 }}
											transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
											className="border-2 border-white/30 border-t-white rounded-full w-4 h-4"
										/>
										Creating account...
									</>
								) : (
									<>
										Create Account
										<ArrowRightIcon className="w-4 h-4" />
									</>
								)}
							</motion.button>
						</form>

						<div className="mt-8 text-center">
							<p className="text-gray-600 text-sm">
								Already have an account?{' '}
								<button
									onClick={() => navigate('/login')}
									className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
								>
									Sign in here
								</button>
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
