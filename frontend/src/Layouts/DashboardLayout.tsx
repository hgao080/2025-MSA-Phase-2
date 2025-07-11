import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../Stores/AuthStore';

// Custom Cobweb Logo Component (matching Header.tsx)
const CobwebLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
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
      <linearGradient id="logoTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#7e22ce" />
      </linearGradient>
    </defs>
  </svg>
);

const navigation = [
	{ name: 'Your Projects', href: '/dashboard/projects' },
	{
		name: 'Your Applications',
		href: '/dashboard/applications',
	},
	{ name: 'Your Profile', href: '/dashboard/profile' },
];
const userNavigation = [{ name: 'Log out', href: '#' }];

function classNames(...classes: (string | boolean | undefined)[]): string {
	return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { logout } = useAuthStore();

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<div className='h-full'>
			<div className='min-h-full'>
				<Disclosure as='nav' className='bg-white/80 shadow-sm backdrop-blur-md border-gray-200/50 border-b'>
					<div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
						<div className='flex justify-between items-center h-16'>
							<div className='flex items-center'>
								<div className='shrink-0'>
									<Link to='/' className="group -m-1.5 p-1.5">
										<span className="sr-only">Cobweb</span>
										<CobwebLogo className="w-auto h-10 group-hover:scale-105 transition-transform duration-200" />
									</Link>
								</div>
								<div className='hidden md:block'>
									<div className='flex items-baseline space-x-6 ml-10'>
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.href}
												aria-current={
													location.pathname ===
													item.href
														? 'page'
														: undefined
												}
												className={classNames(
													location.pathname ===
														item.href
														? 'relative text-indigo-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-purple-600'
														: 'relative text-gray-700 hover:text-indigo-600 group',
													'px-3 py-2 text-sm font-medium transition-colors duration-200'
												)}>
												{item.name}
												{location.pathname !== item.href && (
													<span className="bottom-0 left-0 absolute bg-gradient-to-r from-indigo-600 to-purple-600 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
												)}
											</Link>
										))}
									</div>
								</div>
							</div>

							<div className='hidden md:block'>
								{userNavigation.map((item) => (
									<button
										key={item.name}
										onClick={handleLogout}
										className='bg-gradient-to-r from-gray-100 hover:from-red-50 to-gray-200 hover:to-red-100 shadow-sm hover:shadow-md px-4 py-2 rounded-full font-semibold text-gray-700 hover:text-red-600 text-sm transition-all duration-300 hover:cursor-pointer'>
										{item.name}
									</button>
								))}
							</div>

							<div className='md:hidden flex -mr-2'>
								{/* Mobile menu button */}
								<DisclosureButton className='group inline-flex relative justify-center items-center bg-transparent hover:bg-gray-100/50 p-2 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-700 transition-colors duration-200'>
									<span className='absolute -inset-0.5' />
									<span className='sr-only'>
										Open main menu
									</span>
									<Bars3Icon
										aria-hidden='true'
										className='group-data-open:hidden block size-6'
									/>
									<XMarkIcon
										aria-hidden='true'
										className='hidden group-data-open:block size-6'
									/>
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className='md:hidden bg-white/95 backdrop-blur-md border-gray-200/30 border-t'>
						<div className='space-y-2 px-4 pt-4 pb-3'>
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									aria-current={
										location.pathname === item.href
											? 'page'
											: undefined
									}
									className={classNames(
										location.pathname === item.href
											? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-semibold'
											: 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600',
										'block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300'
									)}>
									{item.name}
								</Link>
							))}
						</div>
						<div className='pt-4 pb-3 border-gray-200/30 border-t'>
							<div className='px-4'>
								{userNavigation.map((item) => (
									<button
										key={item.name}
										onClick={handleLogout}
										className='block hover:bg-red-50 px-4 py-3 rounded-xl w-full font-medium text-red-600 text-left transition-all duration-300'>
										{item.name}
									</button>
								))}
							</div>
						</div>
					</DisclosurePanel>
				</Disclosure>

				<Outlet />
			</div>
		</div>
	);
}
