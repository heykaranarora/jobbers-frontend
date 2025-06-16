import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { LogOut, User2 } from "lucide-react";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs(); // Hook to fetch applied jobs
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth); // Getting user data from Redux store

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    ); // Loading state if user data is not available yet
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border-gray-200 rounded-2xl my-2 p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto || "/default-profile.png"} // Default profile image
                alt="Profile Image"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={() => setOpen(true)}
            className="text-right mt-4 sm:mt-0"
            variant="outline"
            aria-label="Edit Profile"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          {/* Email & Phone */}
          <div className="flex items-center gap-4">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4 my-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          {/* Skills Section */}
          <h1 className="font-bold text-lg">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added yet</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm item-center gap-1.5 mt-4">
          {/* Resume Section */}
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              href={user.profile.resume} // This should be the path to the uploaded resume
              className="text-blue-500 hover:underline"
              rel="noopener noreferrer"
            >
              {user.profile.resumeOriginalName}{" "}
              {/* Display the original resume name */}
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
