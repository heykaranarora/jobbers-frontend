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

// Helper function to generate a list of dates from a date range
const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate)); // Push the current date into the list
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
  }

  return dates;
};

const StudentGraph = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = [];

      data.forEach((item) => {
        const [startDate, endDate] = item.dateRange.split(" to ");
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Generate the dates between the start and end date
        const dates = getDatesInRange(start, end);

        // For each date, add an entry to the data array
        dates.forEach((date) => {
          formattedData.push({
            date: date.toLocaleDateString(),  // Use the formatted date
            loggedIn: item.loggedIn || 0,
            total: item.total || 0,
          });
        });
      });

      // Set the formatted data for the chart
      setChartData(formattedData);
    }
  }, [data]);

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Student Logins (Daily Data)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => date} />
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

export default StudentGraph;
