import { NextRequest, NextResponse } from 'next/server';
import axios from '@/lib/axios';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = cookies().get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'No session found' }, { status: 404 });
    }

    const payload = await decrypt(sessionCookie);

    const access_token = payload?.access_token;

    // Call the Laravel signout API
    await axios.post('/api/auth/signout', {}, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Delete the session cookie
    cookies().delete('session');

    // Redirect to the homepage
    return NextResponse.redirect('/', 302);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
  }
}
