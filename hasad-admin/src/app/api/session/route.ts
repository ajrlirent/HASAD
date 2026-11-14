import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt, encrypt } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    let session = cookies().get('session')?.value;

    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 404 });
    }

    const payload = await decrypt(session);
    return NextResponse.json({ payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve payload' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionPayload = await request.json();
    const session = await encrypt(sessionPayload);

    cookies().set('session', session, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    cookies().delete('session');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}