import React, { useEffect, useState } from "react";
import {
  TableBody,
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText = "" } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg overflow-x-auto">
      <Table className="w-full min-w-[640px]">
        <TableCaption className="mb-2">Registered Companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2">Logo</TableHead>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Date</TableHead>
            <TableHead className="px-4 py-2 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                You haven't registered any company.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <TableCell className="px-4 py-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={company.logo}
                      alt={`${company.companyName} Logo`}
                      className="rounded-full"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="px-4 py-2">{company.companyName}</TableCell>
                <TableCell className="px-4 py-2">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="px-4 py-2 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white shadow-lg rounded-md">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-full px-2 py-1 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-4 text-gray-600" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
