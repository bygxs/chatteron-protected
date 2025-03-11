// src/app/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

export default function Profile() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signin-form");
      } else {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the data to your backend or database
    // For example:
    // await saveUserProfile({ name, bio });

    console.log("User Profile Submitted:", { name, bio });

    // Reset form or redirect after submission
    setIsSubmitting(false);
    // Optionally redirect or show a success message
  };

  return (
    <div className="min-h-screen bg-amber-100 dark:bg-amber-900">
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className=" m-7 text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Welcome to Your Profile, {userEmail || "User"}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 mt-6">
          Please complete your profile to get started.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              rows={4}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 text-white rounded-md ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
