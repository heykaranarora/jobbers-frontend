import React, { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import SiteNavbar from "./SiteNavbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const CompanyDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/getallcompanies",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      const data = await response.json();
      setCompanies(data.companies);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanyDelete = async (companyId) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/deletecompany/" + companyId,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete company");
      }
      setCompanies(companies.filter((company) => company._id !== companyId));
    } catch (error) {
      alert("Failed to delete company");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <SiteNavbar />
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <h2 className="text-xl flex justify-center mb-6">Company</h2>
        <Table className="mt-3">
          <TableCaption>A list of all companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length <= 0 ? (
              <div className="flex justify-center items-center">
                <span className="block text-gray-500 text-lg font-semibold italic center">
                  No Companies available
                </span>
              </div>
            ) : (
              companies.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.description}</TableCell>
                  <TableCell>{company.website}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt="Company Logo"
                        width={50}
                        height={50}
                      />
                    ) : (
                      "No Logo"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Add action buttons if needed (like edit, delete, etc.) */}
                    <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-100"
                    onClick={() => handleCompanyDelete(company._id)}
                  >
                    Delete
                  </Button>
                    {/* You can add more actions like editing or viewing company details */}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompanyDetails;
