"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Eye, TrendingUp, TrendingDown } from "lucide-react"

interface ContentPerformanceProps {
  timeRange: string
  platform: string
}

const topPosts = [
  {
    id: "1",
    platform: "twitter",
    content: "Just launched our new analytics dashboard! 🚀 The insights are incredible...",
    date: "2 days ago",
    likes: 245,
    comments: 32,
    shares: 18,
    impressions: 5420,
    engagement: 5.4,
    trend: "up",
  },
  {
    id: "2",
    platform: "instagram",
    content: "Behind the scenes of our product development process. Swipe to see more! ➡️",
    date: "4 days ago",
    likes: 189,
    comments: 28,
    shares: 12,
    impressions: 3890,
    engagement: 5.9,
    trend: "up",
  },
  {
    id: "3",
    platform: "twitter",
    content: "Quick tip: Use data visualization to make your reports more engaging and easier to understand.",
    date: "1 week ago",
    likes: 156,
    comments: 19,
    shares: 24,
    impressions: 4120,
    engagement: 4.8,
    trend: "down",
  },
  {
    id: "4",
    platform: "instagram",
    content: "Team spotlight: Meet Sarah, our lead designer who creates amazing user experiences! 👩‍💻",
    date: "1 week ago",
    likes: 203,
    comments: 41,
    shares: 8,
    impressions: 3650,
    engagement: 6.9,
    trend: "up",
  },
]

const contentTypes = [
  { type: "Educational", posts: 12, avgEngagement: 4.8, performance: "up" },
  { type: "Behind the Scenes", posts: 8, avgEngagement: 5.2, performance: "up" },
  { type: "Product Updates", posts: 6, avgEngagement: 3.9, performance: "down" },
  { type: "Team Spotlights", posts: 4, avgEngagement: 6.1, performance: "up" },
]

export function ContentPerformance({ timeRange, platform }: ContentPerformanceProps) {
  return (
    <div className="space-y-6">
      {/* Content Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Type Performance</CardTitle>
          <CardDescription>How different types of content are performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentTypes.map((type) => {
              const TrendIcon = type.performance === "up" ? TrendingUp : TrendingDown
              const trendColor = type.performance === "up" ? "text-green-600" : "text-red-600"

              return (
                <div key={type.type} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{type.type}</h4>
                    <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{type.avgEngagement}%</div>
                  <p className="text-xs text-muted-foreground">{type.posts} posts</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your best content from the selected time period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topPosts.map((post) => {
              const platformColor =
                post.platform === "twitter" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
              const TrendIcon = post.trend === "up" ? TrendingUp : TrendingDown
              const trendColor = post.trend === "up" ? "text-green-600" : "text-red-600"

              return (
                <div key={post.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <Badge variant="secondary" className={platformColor}>
                          {post.platform === "twitter" ? "Twitter/X" : "Instagram"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                      </div>
                    </div>
                    <div className={`flex items-center text-sm ${trendColor}`}>
                      <TrendIcon className="h-4 w-4 mr-1" />
                      {post.engagement}%
                    </div>
                  </div>

                  <p className="text-sm text-foreground mb-4">{post.content}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share className="h-4 w-4 text-green-500" />
                      <span>{post.shares}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <span>{post.impressions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Posting Times</CardTitle>
            <CardDescription>Optimal times for maximum engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Twitter/X</span>
              <span className="font-medium">2 PM - 4 PM EST</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Instagram</span>
              <span className="font-medium">6 PM - 8 PM EST</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Best Day</span>
              <span className="font-medium">Tuesday & Thursday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions for better performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Post more educational content</p>
              <p className="text-xs text-muted-foreground">+23% higher engagement rate</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Include more behind-the-scenes posts</p>
              <p className="text-xs text-muted-foreground">Audience loves authentic content</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Try posting at 6 PM on weekdays</p>
              <p className="text-xs text-muted-foreground">Peak audience activity time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
