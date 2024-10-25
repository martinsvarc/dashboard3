import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { Overview } from '@/components/overview'
import { RecentSales } from '@/components/recent-sales'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: callLogs } = await supabase
    .from('Call Logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  const calculateAverage = (field: string) => {
    const sum = callLogs?.reduce((acc, log) => acc + (log[field] || 0), 0)
    return callLogs?.length ? (sum / callLogs.length).toFixed(1) : '0'
  }

  const averageScores = {
    engagement: calculateAverage('Engagement'),
    objectionHandling: calculateAverage('Objection Handling'),
    informationGathering: calculateAverage('Information Gathering'),
    programExplanation: calculateAverage('Program Explanation'),
    closingSkills: calculateAverage('Closing Skills'),
    overallEffectiveness: calculateAverage('Overall Effectiveness'),
  }

  const totalCallLength = callLogs?.reduce((acc, log) => acc + (log['Call Length'] || 0), 0)
  const averageCallLength = callLogs?.length ? (totalCallLength / callLogs.length).toFixed(2) : '0'

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Call Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCallLength} minutes</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Effectiveness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScores.overallEffectiveness}/5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callLogs?.length || 0}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview averageScores={averageScores} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales callLogs={callLogs || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
