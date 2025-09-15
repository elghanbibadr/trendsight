// app/api/instagram/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const appId = process.env.FB_APP_ID!;
  const redirectUri = encodeURIComponent(process.env.FB_REDIRECT_URI!);

  // Instagram Business scopes
  const scopes = [
    "instagram_business_basic",
    "instagram_manage_comments",
    "instagram_business_manage_messages",
    "instagram_content_publish",
    "instagram_manage_insights",
  ].join(",");

  // Construct the Instagram Business login URL
  const url = `https://www.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&force_reauth=true`;

  return NextResponse.redirect(url);
}
