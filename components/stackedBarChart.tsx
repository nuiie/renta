import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Jan", section1: 4000, section2: 2400 },
  { name: "Feb", section1: 3000, section2: 1398 },
  { name: "Mar", section1: 2000, section2: 9800 },
  { name: "Apr", section1: 2780, section2: 3908 },
  { name: "May", section1: 1890, section2: 4800 },
  { name: "Jun", section1: 2390, section2: 3800 },
  { name: "Jul", section1: 3490, section2: 4300 },
]

const StackedBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="section1" stackId="a" fill="#8884d8" />
        <Bar dataKey="section2" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StackedBarChart
