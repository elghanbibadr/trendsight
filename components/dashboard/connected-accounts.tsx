"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Twitter, Instagram, CheckCircle, AlertCircle } from "lucide-react"

const mockAccounts = [
  {
    id: "1",
    platform: "twitter",
    username: "@johndoe",
    followers: "12.5K",
    connected: true,
    status: "active",
  },
  {
    id: "2",
    platform: "instagram",
    username: "@johndoe_insta",
    followers: "8.2K",
    connected: true,
    status: "active",
  },
]

export function ConnectedAccounts() {
  if (mockAccounts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No accounts connected yet</p>
        <Button>Connect Your First Account</Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {mockAccounts.map((account) => {
        const Icon = account.platform === "twitter" ? Twitter : Instagram
        const platformColor = account.platform === "twitter" ? "text-blue-500" : "text-pink-500"

        return (
          <Card key={account.id} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-6 w-6 ${platformColor}`} />
                  <div>
                    <p className="font-medium text-foreground">{account.username}</p>
                    <p className="text-sm text-muted-foreground">{account.followers} followers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {account.connected ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Disconnected
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
