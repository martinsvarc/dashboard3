"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface OverviewProps {
  averageScores: {
    engagement: string
    objectionHandling: string
    informationGathering: string
    programExplanation: string
    closingSkills: string
    overallEffectiveness: string
  }
}

export function Overview({ averageScores }: OverviewProps) {
  const data = [
    {
      name: "Engagement",
      total: parseFloat(averageScores.engagement),
    },
    {
      name: "Objection Handling",
      total: parseFloat(averageScores.objectionHandling),
    },
    {
      name: "Information Gathering",
      total: parseFloat(averageScores.informationGathering),
    },
    {
      name: "Program Explanation",
      total: parseFloat(averageScores.programExplanation),
    },
    {
      name: "Closing Skills",
      total: parseFloat(averageScores.closingSkills),
    },
    {
      name: "Overall Effectiveness",
      total: parseFloat(averageScores.overallEffectiveness),
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
