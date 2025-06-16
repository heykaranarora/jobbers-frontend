import React, { useState, useEffect, useRef } from "react";
import { Users, Briefcase, GraduationCap, Download, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminNavbar from "./SiteNavbar";
import StudentGraph from "./StudentGraph";
import RecruiterGraph from "./RecruiterGraph";
import AllUsersGraph from "./AllUsersGraph";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, icon, count, linkTo }) => (
  <Card className="shadow-md bg-white transition-all hover:shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl font-semibold">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center">
        <p className="text-3xl font-bold mb-2">{count}</p>
        <Button>
          <Link to={linkTo}>View Details</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const UserManagementDashboard = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLoginDetails, setUserLoginDetails] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentGraphData, setStudentGraphData] = useState([]);
  const [recruiterGraphData, setRecruiterGraphData] = useState([]);
  const [allUsersGraphData, setAllUsersGraphData] = useState([]);

  const allUsersGraphRef = useRef(null);
  const studentGraphRef = useRef(null);
  const recruiterGraphRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUsers(), fetchCompanies(), fetchLoginDetails()]);
        const [defaultStart, defaultEnd] = getLast10Days();
        setStartDate(defaultStart);
        setEndDate(defaultEnd);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("https://jobportal-backend-psrc.onrender.com/api/v1/admin/getallusers", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    setUsers(data.users);
  };

  const fetchCompanies = async () => {
    const response = await fetch("https://jobportal-backend-psrc.onrender.com/api/v1/admin/getallcompanies", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch companies");
    const data = await response.json();
    setCompanies(data.companies);
  };

  const fetchLoginDetails = async () => {
    const response = await fetch("https://jobportal-backend-psrc.onrender.com/api/v1/admin/logindetails", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch login details");
    const data = await response.json();
    setUserLoginDetails(data.data);
  };

  const getLast10Days = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 10);
    return [startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]];
  };

  const handleFilterData = () => {
    if (!startDate || !endDate) {
      const [defaultStart, defaultEnd] = getLast10Days();
      setStartDate(defaultStart);
      setEndDate(defaultEnd);
    }

    const start = new Date(startDate + "T00:00:00Z");
    const end = new Date(endDate + "T23:59:59Z");

    const filteredStudents = users.filter((user) => {
      const lastLoginDate = new Date(user.lastLogin);
      return user.role === "student" && lastLoginDate >= start && lastLoginDate <= end;
    });

    const filteredRecruiters = users.filter((user) => {
      const lastLoginDate = new Date(user.lastLogin);
      return user.role === "recruiter" && lastLoginDate >= start && lastLoginDate <= end;
    });

    setStudentGraphData([
      {
        dateRange: `${startDate} to ${endDate}`,
        loggedIn: filteredStudents.length,
        total: filteredStudents.length,
      },
    ]);

    setRecruiterGraphData([
      {
        dateRange: `${startDate} to ${endDate}`,
        loggedIn: filteredRecruiters.length,
        total: filteredRecruiters.length,
      },
    ]);

    setAllUsersGraphData([
      {
        dateRange: `${startDate} to ${endDate}`,
        studentsLoggedIn: filteredStudents.length,
        recruitersLoggedIn: filteredRecruiters.length,
        totalStudents: filteredStudents.length,
        totalRecruiters: filteredRecruiters.length,
      },
    ]);
  };

  const handleDownload = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("User Management Dashboard", 20, 20);

      doc.setFontSize(12);
      doc.text(`Total Students: ${users.filter((user) => user.role === "student").length}`, 20, 40);
      doc.text(`Total Recruiters: ${users.filter((user) => user.role === "recruiter").length}`, 20, 50);
      doc.text(`Total Companies: ${companies.length}`, 20, 60);

      try {
        const studentCanvas = await html2canvas(studentGraphRef.current);
        const studentImgData = studentCanvas.toDataURL("image/png");
        doc.addImage(studentImgData, "PNG", 20, 70, 170, 100);

        const studentData = userLoginDetails ? userLoginDetails.studentCount : 0;
        doc.text(`Logged In Students: ${studentData}`, 20, 180);

        const recruiterCanvas = await html2canvas(recruiterGraphRef.current);
        const recruiterImgData = recruiterCanvas.toDataURL("image/png");
        doc.addPage();
        doc.addImage(recruiterImgData, "PNG", 20, 20, 170, 100);

        const recruiterData = userLoginDetails ? userLoginDetails.recruiterCount : 0;
        doc.text(`Logged In Recruiters: ${recruiterData}`, 20, 130);

        const allUsersCanvas = await html2canvas(allUsersGraphRef.current);
        const allUsersImgData = allUsersCanvas.toDataURL("image/png");
        doc.addPage();
        doc.addImage(allUsersImgData, "PNG", 20, 20, 170, 100);

        doc.text(`Total Students: ${users.filter((user) => user.role === "student").length}`, 20, 130);
        doc.text(`Total Recruiters: ${users.filter((user) => user.role === "recruiter").length}`, 20, 140);
      } catch (err) {
        console.error("Error capturing graphs:", err);
      }

      doc.save("dashboard_data.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  const recruiters = users.filter((user) => user.role === "recruiter");
  const students = users.filter((user) => user.role === "student");

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">User Management Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Students"
            icon={<GraduationCap className="h-8 w-8" />}
            count={students.length}
            linkTo="/owner/studentlist"
          />
          <DashboardCard
            title="Recruiters"
            icon={<Users className="h-8 w-8" />}
            count={recruiters.length}
            linkTo="/owner/recuiterlist"
          />
          <DashboardCard
            title="Companies"
            icon={<Briefcase className="h-8 w-8" />}
            count={companies.length}
            linkTo="/owner/companylist"
          />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <Button className="mt-4" onClick={handleFilterData}>
              <Filter className="mr-2 h-4 w-4" /> Filter Data
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Student Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={studentGraphRef}>
                <StudentGraph data={studentGraphData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recruiter Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={recruiterGraphRef}>
                <RecruiterGraph data={recruiterGraphData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Users Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={allUsersGraphRef}>
                <AllUsersGraph data={allUsersGraphData} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="mt-8" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
    </div>
  );
};

export default UserManagementDashboard;

