"use client";
import { Box, ScrollArea } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

interface Props {
  data: { date: string; value: number }[];
}

const formatYAxis = (value: number) => {
  return value.toLocaleString();
};

const LineChartComponent = ({ data }: Props) => {
  return (
    <ScrollArea type="auto" scrollbars="horizontal">
      <Box minWidth="100%" width="800px" className="space-y-5 p-1">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"} />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--accent-9)"
              strokeWidth={1.5}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ScrollArea>
  );
};

export default LineChartComponent;
