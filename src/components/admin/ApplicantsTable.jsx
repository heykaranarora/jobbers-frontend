import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [applications, setApplications] = useState(applicants?.applications || []);

    const statusHandler = async (status, id) => {
        try {
            const response = await fetch(`${APPLICATION_API_END_POINT}/status/${id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include', // Ensures cookies are sent
                body: JSON.stringify({ status })
            });

            const data = await response.json();
            
            if (data.success) {
                // Update the application status locally
                setApplications(prevApplications => 
                    prevApplications.map(app => 
                        app._id === id ? { ...app, status } : app
                    )
                );
                toast.success(data.message);
            } else {
                toast.error(data.message || 'Failed to update status');
            }
        } catch (error) {
            toast.error('An error occurred while updating status');
        }
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white">

            <Table className="w-full text-sm text-left text-gray-600">
                <TableCaption className="text-gray-500">A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="py-3 px-4">Full Name</TableHead>
                        <TableHead className="py-3 px-4">Email</TableHead>
                        <TableHead className="py-3 px-4">Contact</TableHead>
                        <TableHead className="py-3 px-4">Resume</TableHead>
                        <TableHead className="py-3 px-4">Date</TableHead>
                        <TableHead className="py-3 px-4">Status</TableHead>
                        <TableHead className="py-3 px-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((item) => (
                        <TableRow key={item._id} className="border-b hover:bg-gray-50">
                            <TableCell className="py-2 px-4">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="py-2 px-4">{item?.applicant?.email}</TableCell>
                            <TableCell className="py-2 px-4">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="py-2 px-4">
                                {item.applicant?.profile?.resume ? (
                                    <a className="text-blue-600 underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">NA</span>
                                )}
                            </TableCell>
                            <TableCell className="py-2 px-4">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="py-2 px-4">
                                <Button variant="outline" size="sm" className="text-gray-800">
                                    {item.status || 'Pending'}
                                </Button>
                            </TableCell>
                            <TableCell className="py-2 px-4 flex gap-2">
                                <Button
                                    key="accepted"
                                    variant="success"
                                    size="sm"
                                    className="bg-green-500 text-white hover:bg-green-600"
                                    onClick={() => statusHandler("Accepted", item._id)}
                                >
                                    Accept
                                </Button>
                                <Button
                                    key="rejected"
                                    variant="danger"
                                    size="sm"
                                    className="bg-red-500 text-white hover:bg-red-600"
                                    onClick={() => statusHandler("Rejected", item._id)}
                                >
                                    Reject
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
