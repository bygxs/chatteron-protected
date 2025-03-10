// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
                MyLogo
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link href="/">
              <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/signin-form">
              <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                Sign In
              </span>
            </Link>
            <Link href="/signup-form">
              <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}