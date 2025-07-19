'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../Stores/AuthStore'
import { Link } from 'react-router'
import ThemeToggle from './ThemeToggle'
import CobwebLogo from './CobwebLogo'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="top-0 z-50 absolute inset-x-0">
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 border-b"></div>
      
      <nav aria-label="Global" className="relative flex justify-between items-center mx-auto p-6 lg:px-8 max-w-7xl">
        <div className="flex lg:flex-1">
          <Link to="/" className="group -m-1.5 p-1.5">
            <span className="sr-only">Cobweb</span>
            <CobwebLogo className="w-auto h-10 group-hover:scale-105 transition-transform duration-200" />
          </Link>
        </div>
        
        <div className="lg:hidden flex">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex justify-center items-center hover:bg-gray-100/50 dark:hover:bg-gray-800/50 -m-2.5 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 transition-colors duration-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          <a 
            href="/" 
            className="group relative font-semibold text-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-gray-300 text-sm transition-colors duration-200"
          >
            Home
            <span className="bottom-0 left-0 absolute bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
          </a>
          <a 
            href="/projects" 
            className="group relative font-semibold text-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-gray-300 text-sm transition-colors duration-200"
          >
            Projects
            <span className="bottom-0 left-0 absolute bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
          </a>
        </PopoverGroup>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <ThemeToggle />
          {user !== null ? (
            <>
              <Link 
                to="/dashboard/projects" 
                className='group relative font-medium text-gray-700 hover:text-indigo-600 text-sm transition-colors duration-200'
              >
                Dashboard
                <span className="bottom-0 left-0 absolute bg-gradient-to-r from-indigo-600 to-purple-600 w-0 group-hover:w-full h-0.5 transition-all duration-300"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-gray-100 hover:from-red-50 to-gray-200 hover:to-red-100 shadow-sm hover:shadow-md px-4 py-2 rounded-full font-semibold text-gray-700 hover:text-red-600 text-sm transition-all duration-300 hover:cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <a 
              href="/login" 
              className="bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-full font-semibold text-white text-sm hover:scale-105 transition-all duration-300"
            >
              Log in
              <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="z-50 fixed inset-0 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="right-0 z-50 fixed inset-y-0 bg-white/95 dark:bg-gray-800/95 sm:shadow-2xl backdrop-blur-md px-6 py-6 sm:ring-1 sm:ring-gray-200/50 dark:sm:ring-gray-700/50 w-full sm:max-w-sm overflow-y-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Cobweb</span>
              <CobwebLogo className="w-auto h-8" />
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:bg-gray-100/50 dark:hover:bg-gray-700/50 -m-2.5 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 transition-colors duration-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-200/30 dark:divide-gray-700/30">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="block hover:bg-gradient-to-r hover:from-indigo-50 dark:hover:from-indigo-900/20 hover:to-purple-50 dark:hover:to-purple-900/20 -mx-3 px-4 py-3 rounded-xl font-semibold text-gray-900 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-gray-100 text-base transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/projects"
                  className="block hover:bg-gradient-to-r hover:from-indigo-50 dark:hover:from-indigo-900/20 hover:to-purple-50 dark:hover:to-purple-900/20 -mx-3 px-4 py-3 rounded-xl font-semibold text-gray-900 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-gray-100 text-base transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
              </div>
              <div className="py-6">
                {user !== null ? (
                  <>
                    <div className="block hover:bg-gradient-to-r hover:from-indigo-50 dark:hover:from-indigo-900/20 hover:to-purple-50 dark:hover:to-purple-900/20 -mx-3 px-4 py-3 rounded-xl font-semibold text-gray-900 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-gray-100 text-base transition-all duration-300">
                      <Link 
                        to="/dashboard/projects" 
                        className="block w-full text-left"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block hover:bg-red-50 dark:hover:bg-red-900/20 -mx-3 px-4 py-3 rounded-xl w-full font-semibold text-red-600 dark:text-red-400 text-base text-left transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="block bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg -mx-3 px-4 py-3 rounded-xl font-semibold text-white text-base text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}