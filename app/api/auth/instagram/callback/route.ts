import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import axios from 'axios';

// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    console.log("come back")
  try {
    // Get user session - adjust based on your auth system
    const session = {user:{id:13940}};
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Instagram OAuth error:', error);
      return NextResponse.redirect(new URL('/dashboard?error=instagram_auth_failed', request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/dashboard?error=no_code', request.url));
    }

    // Create URLSearchParams for form-encoded data
    const tokenParams = new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID!,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.REDIRECT_URI}`,
      code: code
    });

    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', tokenParams, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log("token response",tokenResponse.data)

    const { access_token, user_id } = tokenResponse.data;

    console.log("access token", access_token)

    // Get long-lived access token
    const longLivedTokenResponse = await axios.get('https://graph.instagram.com/access_token', {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        access_token: access_token
      }
    });

    const longLivedToken = longLivedTokenResponse.data.access_token;

  
    // Fetch user profile information
    const profileResponse = await axios.get(`https://graph.instagram.com/me`, {
      params: {
        access_token: longLivedToken
      }
    });

    const profileId = profileResponse.data.id;
      // Fetch user profile information
  const insights = await axios.get(`https://graph.instagram.com/${profileId}/insights`, {
    params: {
      metric: 'reach,follower_count,website_clicks,profile_views',
      period: 'lifetime',
      access_token: longLivedToken
    }
  });
    console.log("profile didze",insights)


    console.log("profil", profileId)
    // // Store in database using Prisma
    // await prisma.instagramAccount.upsert({
    //   where: {
    //     instagramId: profileId.id
    //   },
    //   update: {
    //     accessToken: longLivedToken,
    //     profileIdData: profileId,
    //     updatedAt: new Date()
    //   },
    //   create: {
    //     userId: session.user.id,
    //     instagramId: profileId.id,
    //     username: profileId.username,
    //     name: profileId.name,
    //     accountType: profileId.account_type,
    //     accessToken: longLivedToken,
    //     profileIdData: profileId
    //   }
    // });

    return NextResponse.redirect(new URL('/dashboard?connected=instagram', request.url));

  } catch (error) {
    console.error('Error during Instagram OAuth:', error);
    // Log more details about the error for debugging
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    return NextResponse.redirect(new URL('/dashboard?error=instagram_connection_failed', request.url));
  }
}