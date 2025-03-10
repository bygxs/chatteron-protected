// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app'; // Import applicationDefault

// Initialize Firebase Admin SDK
const app = initializeApp({
  credential: applicationDefault(), // Use environment variables for production
});

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    return NextResponse.json({ message: 'Access granted', user: decodedToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }
}