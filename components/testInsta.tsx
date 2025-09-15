// components/InstagramConnect.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function InstagramConnect() {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for OAuth callback parameters when component mounts
  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (code) {
      setAuthCode(code);
      setError(null);
      console.log('✅ Authorization code received:', code);
      
      // Clean the URL by removing the query parameters
      router.replace('/dashboard'); // or whatever your current page is
    } else if (errorParam) {
      setError(errorDescription || 'Instagram authentication failed');
      setAuthCode(null);
      console.error('❌ Instagram OAuth error:', errorParam, errorDescription);
      
      // Clean the URL
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  const handleConnectInstagram = () => {
    setError(null);
    
    // Your Instagram App credentials
    const INSTAGRAM_CLIENT_ID = '2811817705681247';
    const REDIRECT_URI = `${window.location.origin}/dashboard`; // Redirect back to current page
    
    // Instagram OAuth URL with required parameters
    const instagramAuthUrl = new URL('https://www.instagram.com/oauth/authorize');
    instagramAuthUrl.searchParams.set('client_id', INSTAGRAM_CLIENT_ID);
    instagramAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    instagramAuthUrl.searchParams.set('scope', [
      'instagram_business_basic',
      'instagram_business_manage_messages', 
      'instagram_business_manage_comments',
      'instagram_business_content_publish',
      'instagram_business_manage_insights'
    ].join(','));
    instagramAuthUrl.searchParams.set('response_type', 'code');
    instagramAuthUrl.searchParams.set('force_reauth', 'true');
    
    console.log('🚀 Redirecting to Instagram OAuth:', instagramAuthUrl.toString());
    
    // Redirect to Instagram OAuth
    window.location.href = instagramAuthUrl.toString();
  };

  const resetConnection = () => {
    setAuthCode(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Instagram Connect</h2>
        <p className="text-gray-600 mb-6">Connect your Instagram Business account</p>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Success - Show Authorization Code */}
        {authCode ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Connected Successfully!</h3>
            <p className="text-green-700 text-sm mb-4">Authorization code received from Instagram</p>
            
            <div className="bg-white border rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">Authorization Code:</p>
              <code className="text-sm text-gray-800 break-all font-mono bg-gray-50 p-2 rounded block">
                {authCode}
              </code>
            </div>
            
            <p className="text-xs text-green-600 mb-4">
              ✅ You can now use this code to exchange for an access token
            </p>
            
            <button
              onClick={resetConnection}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              Connect Another Account
            </button>
          </div>
        ) : (
          /* Connect Button */
          <div>
            {/* Method 1: Button with JavaScript redirect */}
            {/* <button
              onClick={handleConnectInstagram}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
              </svg>
              Connect with Button
            </button> */}

            {/* Method 2: Direct link with exact URL for testing */}
            <Link
              href="https://www.instagram.com/oauth/authorize?client_id=2811817705681247&redirect_uri=https%3A//localhost%3A3000/api/auth/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 text-center"
            >
              Connect with Encoded Link
            </Link>
            
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>• Requires Instagram Business or Creator account</p>
              <p>• Account must be linked to a Facebook page</p>
              <p>• Try the link if button doesn't work</p>
            </div>
          </div>
        )}
      </div>

      {/* Debug Info (remove in production) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Debug Info:</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Client ID:</strong> 2811817705681247</p>
          <p><strong>Redirect URI:</strong> {typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'Loading...'}</p>
          <p><strong>Status:</strong> {authCode ? '✅ Code Received' : '⏳ Waiting for connection'}</p>
        </div>
      </div>
    </div>
  );
}