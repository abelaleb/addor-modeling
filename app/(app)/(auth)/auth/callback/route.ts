import { createServerSupabaseClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = await cookies();
    const supabase = await createServerSupabaseClient();

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL('/auth?error=Could not authenticate user', requestUrl.origin));
    }

    if (data.user) {
      // Check if user exists in users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      // If user doesn't exist (Google sign-in first time), create them
      if (userError || !userData) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            role: 'client', // Default role
          });

        if (insertError) {
          console.error('Error creating user profile:', insertError);
        }

        // Redirect to home for new users
        return NextResponse.redirect(new URL('/', requestUrl.origin));
      }

      // Redirect based on role
      if (userData.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', requestUrl.origin));
      } else {
        return NextResponse.redirect(new URL('/', requestUrl.origin));
      }
    }
  }

  // Default redirect
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
