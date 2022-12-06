import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Flex,
  Box,
  Card
} from '@chakra-ui/react'

const data = [
  {
    name: "PPG",
    you: 4000,
    player: 2400,
    amt: 2400,
  },
  {
    name: "APG",
    you: 3000,
    player: 1398,
    amt: 2210,
  },
  {
    name: "BPG",
    you: 2000,
    player: 9800,
    amt: 2290,
  },
  {
    name: "SPG",
    you: 2780,
    player: 3908,
    amt: 2000,
  },
  {
    name: "BPG",
    you: 1890,
    player: 4800,
    amt: 2181,
  },
];

export default class BarChartContainer extends PureComponent {
  render() {
    return (
      <Flex>
        {/* <ResponsiveContainer> */}
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
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
          <Bar dataKey="you" fill="#9DECF9" />
          <Bar dataKey="player" fill="#0987A0" />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </Flex>
    );
  }
}
