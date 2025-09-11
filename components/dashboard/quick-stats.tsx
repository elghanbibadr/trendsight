import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share } from "lucide-react"

const stats = [
  {
    title: "Total Followers",
    value: "20.7K",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Engagement Rate",
    value: "4.2%",
    change: "+0.8%",
    trend: "up",
    icon: Heart,
  },
  {
    title: "Total Posts",
    value: "156",
    change: "+8",
    trend: "up",
    icon: MessageCircle,
  },
  {
    title: "Reach",
    value: "45.2K",
    change: "-2.1%",
    trend: "down",
    icon: Share,
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
        const trendColor = stat.trend === "up" ? "text-green-600" : "text-red-600"

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className={`flex items-center text-xs ${trendColor}`}>
                <TrendIcon className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
