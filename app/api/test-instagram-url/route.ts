// app/api/test-instagram-simple/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Simple Instagram test route called');

  // Use default userId for testing
  const testUserId = 'test-user-123';
  
  // Check environment variables
  const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
  const instagramClientId = process.env.INSTAGRAM_CLIENT_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  const stateData = { 
    userId: testUserId,
    timestamp: Date.now(),
    api_type: 'test'
  };
  const state = Buffer.from(JSON.stringify(stateData)).toString('base64');

  // Try Facebook OAuth approach (post-December 2024)
  if (facebookClientId && redirectUri) {
    const facebookParams = new URLSearchParams({
      client_id: facebookClientId,
      redirect_uri: redirectUri,
      scope: 'instagram_basic,pages_show_list,email',
      response_type: 'code',
      state: state
    });
    
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?${facebookParams.toString()}`;
    
    return NextResponse.json({
      success: true,
      message: 'Using Facebook OAuth for Instagram Graph API (post-Dec 2024)',
      authUrl: facebookAuthUrl,
      approach: 'facebook_oauth',
      environment: {
        facebook_client_id: facebookClientId ? 'Present' : 'Missing',
        instagram_client_id: instagramClientId ? 'Present (deprecated)' : 'Missing',
        redirect_uri: redirectUri ? 'Present' : 'Missing'
      },
      note: 'Instagram Basic Display API was shut down Dec 4, 2024. Using Facebook OAuth instead.'
    });
  }

  // Fallback: Try old Instagram approach (will fail but shows the error)
  if (instagramClientId && redirectUri) {
    const instagramParams = new URLSearchParams({
      client_id: instagramClientId,
      redirect_uri: redirectUri,
      scope: 'user_profile,user_media',
      response_type: 'code',
      state: state
    });
    
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?${instagramParams.toString()}`;
    
    return NextResponse.json({
      success: false,
      message: 'Instagram Basic Display API was deprecated Dec 4, 2024',
      authUrl: instagramAuthUrl,
      approach: 'instagram_basic_display',
      environment: {
        instagram_client_id: instagramClientId ? 'Present' : 'Missing',
        redirect_uri: redirectUri ? 'Present' : 'Missing'
      },
      warning: 'This will show "Invalid platform app" error because API is shut down'
    });
  }

  return NextResponse.json({
    success: false,
    error: 'No valid configuration found',
    environment: {
      facebook_client_id: facebookClientId ? 'Present' : 'Missing',
      instagram_client_id: instagramClientId ? 'Present (deprecated)' : 'Missing', 
      redirect_uri: redirectUri ? 'Present' : 'Missing'
    },
    required_for_2024: [
      'FACEBOOK_CLIENT_ID (from Facebook app, not Instagram app)',
      'FACEBOOK_CLIENT_SECRET', 
      'INSTAGRAM_REDIRECT_URI'
    ]
  });
}