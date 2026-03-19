import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password } = body;
    
    const response = await fetch(`https://express-d1-app.ckd-qja.workers.dev/api/comments/${id}/verify-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any)?.error || 'Password verification failed');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Password verification failed' },
      { status: 500 }
    );
  }
}
