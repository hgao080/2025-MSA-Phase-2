import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../Stores/AuthStore';
import ThemeToggle from '../Components/Misc/ThemeToggle';
import CobwebLogo from '../Components/Misc/CobwebLogo';

const navigation = [
	{ name: 'Your Projects', href: '/dashboard/projects' },
	{
		name: 'Your Applications',
		href: '/dashboard/applications',
	},
	{ name: 'Your Messages', href: '/dashboard/messages' },
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
		<div className='dark:bg-gray-900 h-full'>
			<div className='min-h-full'>
				<Disclosure as='nav' className='bg-white/80 dark:bg-gray-900/80 shadow-sm backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 border-b'>
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
														? 'relative text-indigo-600 dark:text-indigo-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-purple-600 dark:after:from-indigo-400 dark:after:to-purple-400'
														: 'relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 group',
													'px-3 py-2 text-sm font-medium transition-colors duration-200'
												)}>
												{item.name}
												{location.pathname !== item.href && (
													<span className="bottom-0 left-0 absolute bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
												)}
											</Link>
										))}
									</div>
								</div>
							</div>

							<div className='hidden md:flex md:items-center md:space-x-4'>
								<ThemeToggle />
								{userNavigation.map((item) => (
									<button
										key={item.name}
										onClick={handleLogout}
										className='bg-gradient-to-r from-gray-100 hover:from-red-50 dark:from-gray-800 dark:hover:from-red-900/50 to-gray-200 hover:to-red-100 dark:hover:to-red-800/50 dark:to-gray-700 shadow-sm hover:shadow-md px-4 py-2 rounded-full font-semibold text-gray-700 hover:text-red-600 dark:hover:text-red-400 dark:text-gray-300 text-sm transition-all duration-300 hover:cursor-pointer'>
										{item.name}
									</button>
								))}
							</div>

							<div className='md:hidden flex items-center space-x-2 -mr-2'>
								<ThemeToggle className="mr-2" />
								{/* Mobile menu button */}
								<DisclosureButton className='group inline-flex relative justify-center items-center bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-2 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-200'>
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

					<DisclosurePanel className='md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-gray-200/30 dark:border-gray-700/30 border-t'>
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
											? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-400 font-semibold'
											: 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 hover:text-indigo-600 dark:hover:text-indigo-400',
										'block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300'
									)}>
									{item.name}
								</Link>
							))}
						</div>
						<div className='pt-4 pb-3 border-gray-200/30 dark:border-gray-700/30 border-t'>
							<div className='px-4'>
								{userNavigation.map((item) => (
									<button
										key={item.name}
										onClick={handleLogout}
										className='block hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-3 rounded-xl w-full font-medium text-red-600 dark:text-red-400 text-left transition-all duration-300'>
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
