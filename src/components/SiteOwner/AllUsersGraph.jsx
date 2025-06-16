import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28"];

const AllUsersGraph = ({ data }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const latestData = data[data.length - 1];
      setPieData([
        { name: "Students Logged In", value: latestData.studentsLoggedIn },
        {
          name: "Students Not Logged In",
          value: latestData.totalStudents - latestData.studentsLoggedIn,
        },
        { name: "Recruiters Logged In", value: latestData.recruitersLoggedIn },
        {
          name: "Recruiters Not Logged In",
          value: latestData.totalRecruiters - latestData.recruitersLoggedIn,
        },
      ]);
    }
  }, [data]);

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>All User Login Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllUsersGraph;
