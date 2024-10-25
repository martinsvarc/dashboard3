import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface CallLog {
  id: string
  created_at: string
  "Overall Effectiveness": number
  "Call Length": number
}

export function RecentSales({ callLogs }: { callLogs: CallLog[] }) {
  return (
    <div className="space-y-8">
      {callLogs.map((log) => (
        <div key={log.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{log.id.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Call ID: {log.id.slice(0, 8)}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(log.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {log["Overall Effectiveness"]}/5 - {log["Call Length"]} min
          </div>
        </div>
      ))}
    </div>
  )
}re
