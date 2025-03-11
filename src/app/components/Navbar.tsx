"use client";

import Link from "next/link";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in status

  // Check if user is signed in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user); // Set isSignedIn to true if user is signed in
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

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
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Home
              </span>
            </Link>
            {isSignedIn && (
              <Link href="/dashboard">
                <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                  Dashboard
                </span>
              </Link>
            )}
            {!isSignedIn && (
              <>
                <Link href="/signin-form">
                  <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                    Sign In
                  </span>
                </Link>
                <Link href="/signup-form">
                  <span className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                    Sign Up
                  </span>
                </Link>
              </>
            )}
            {isSignedIn && (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 dark:bg-red-600 dark:hover:bg-red-700 text-sm font-medium"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}