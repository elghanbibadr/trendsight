import { Suspense } from "react"
import { ConnectedAccounts } from "@/components/dashboard/connected-accounts"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your social media performance across platforms</p>
      </div>

      <div className="grid gap-6">
        {/* Connected Accounts Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your social media connections</CardDescription>
            </div>
            <Link href="/dashboard/connections">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading accounts...</div>}>
              <ConnectedAccounts />
            </Suspense>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Suspense fallback={<div>Loading stats...</div>}>
          <QuickStats />
        </Suspense>
      </div>
    </div>
  )
}
