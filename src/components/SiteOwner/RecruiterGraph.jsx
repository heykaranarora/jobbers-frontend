import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to get all dates between a start and end date
const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(new Date(currentDate).toLocaleDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const RecruiterGraph = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Generate data points for each date in the date range
      const formattedData = data.flatMap((item) => {
        const [startDate, endDate] = item.dateRange.split(" to ");
        const dateList = getDatesBetween(startDate, endDate);

        return dateList.map((date) => ({
          date: date,
          loggedIn: item.loggedIn || 0,  // Assign the same loggedIn count for each day in the range
          total: item.total || 0,        // Assign the same total count for each day in the range
        }));
      });
      setChartData(formattedData);
    }
  }, [data]);

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Recruiter Logins (Daily Data)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => value} labelFormatter={(label) => `Date: ${label}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="loggedIn"
                stroke="#8884d8"
                name="Logged In"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                name="Total"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecruiterGraph;
  