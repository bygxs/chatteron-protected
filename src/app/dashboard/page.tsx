"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Link from "next/link";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/");  // Redirect to home page if user signs out
        return;
      }

      setUserEmail(user.email);

      // Fetch profile data from Firestore
      const profileDoc = await getDoc(doc(db, "users", user.uid));
      if (profileDoc.exists()) {
        setProfile(profileDoc.data());
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Welcome to the Dashboard, {userEmail || "User"}!
        </h1>
        <Link
  href="/profile"
  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
>
  Edit Profile
</Link>
        {profile && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Your Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Name:</strong> {profile.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Bio:</strong> {profile.bio}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Location:</strong> {profile.location}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Date of Birth:</strong> {profile.dob}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Interests:</strong> {profile.interests.join(", ")}
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Social Links
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>LinkedIn:</strong>{" "}
                {profile.socialLinks.linkedin || "Not provided"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Twitter:</strong>{" "}
                {profile.socialLinks.twitter || "Not provided"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Facebook:</strong>{" "}
                {profile.socialLinks.facebook || "Not provided"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
