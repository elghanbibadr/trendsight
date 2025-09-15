"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Twitter, Instagram, CheckCircle, AlertCircle, Plus } from "lucide-react"
import InstagramLoginButton from "@/components/testInsta"

interface ConnectedAccount {
  id: string
  platform: "twitter" | "instagram"
  username: string
  connected: boolean
  lastSync?: string
}

export default function ConnectionsPage() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: "1",
      platform: "twitter",
      username: "@johndoe",
      connected: true,
      lastSync: "2 hours ago",
    },
    {
      id: "2",
      platform: "instagram",
      username: "@johndoe_insta",
      connected: false,
    },
  ])

  const handleConnect = (platform: "twitter" | "instagram") => {
    // Mock connection process
    console.log(`Connecting to ${platform}...`)
    // In a real app, this would redirect to OAuth flow
    alert(`Redirecting to ${platform} authorization...`)
  }

  const handleDisconnect = (accountId: string) => {
    setAccounts(accounts.map((acc) => (acc.id === accountId ? { ...acc, connected: false, lastSync: undefined } : acc)))
  }

  const platformConfig = {
    twitter: {
      name: "Twitter/X",
      icon: Twitter,
      color: "text-blue-500",
      description: "Connect your Twitter/X account to track tweets, engagement, and follower growth",
    },
    instagram: {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      description: "Connect your Instagram account to monitor posts, stories, and audience insights",
    },
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Social Media Connections</h1>
        <p className="text-muted-foreground">Connect your social media accounts to start tracking analytics</p>
      </div>


<InstagramLoginButton/>
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your data is secure. We only access public metrics and never post on your behalf.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {Object.entries(platformConfig).map(([platform, config]) => {
          const account = accounts.find((acc) => acc.platform === platform)
          const Icon = config.icon

          return (
            <Card key={platform}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-8 w-8 ${config.color}`} />
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {config.name}
                        {account?.connected && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{config.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {account?.connected ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleDisconnect(account.id)}>
                          Disconnect
                        </Button>
                        <Button size="sm">Refresh Data</Button>
                      </>
                    ) : (
                      <Button onClick={() => handleConnect(platform as "twitter" | "instagram")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              {account?.connected && (
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Account: {account.username}</span>
                    <span>Last synced: {account.lastSync}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Having trouble connecting your accounts? Check our setup guides or contact support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline">View Setup Guide</Button>
            <Button variant="outline">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
