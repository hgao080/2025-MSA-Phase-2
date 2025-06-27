import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation } from 'react-router';

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

	return (
		<div className='h-full'>
			<div className='min-h-full'>
				<Disclosure as='nav' className='bg-gray-800'>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<div className='flex h-16 items-center justify-between'>
							<div className='flex items-center'>
								<div className='shrink-0'>
									<Link to='/'>
										<img
											alt='Cobweb'
											src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
											className='size-8'
										/>
									</Link>
								</div>
								<div className='hidden md:block'>
									<div className='ml-10 flex items-baseline space-x-4'>
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												aria-current={
													location.pathname ===
													item.href
														? 'page'
														: undefined
												}
												className={classNames(
													location.pathname ===
														item.href
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>

							<div className='space-y-1 px-2 hidden md:block'>
								{userNavigation.map((item) => (
									<DisclosureButton
										key={item.name}
										as='a'
										href={item.href}
										className='block rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
										{item.name}
									</DisclosureButton>
								))}
							</div>

							<div className='-mr-2 flex md:hidden'>
								{/* Mobile menu button */}
								<DisclosureButton className='group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'>
									<span className='absolute -inset-0.5' />
									<span className='sr-only'>
										Open main menu
									</span>
									<Bars3Icon
										aria-hidden='true'
										className='block size-6 group-data-open:hidden'
									/>
									<XMarkIcon
										aria-hidden='true'
										className='hidden size-6 group-data-open:block'
									/>
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className='md:hidden'>
						<div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as='a'
									href={item.href}
									aria-current={
										location.pathname === item.href
											? 'page'
											: undefined
									}
									className={classNames(
										location.pathname === item.href
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}>
									{item.name}
								</DisclosureButton>
							))}
						</div>
						<div className='border-t border-gray-700 pt-4 pb-3'>
							<div className='mt-3 space-y-1 px-2'>
								{userNavigation.map((item) => (
									<DisclosureButton
										key={item.name}
										as='a'
										href={item.href}
										className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
										{item.name}
									</DisclosureButton>
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
