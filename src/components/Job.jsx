import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const currentDate = new Date();
    const jobDate = new Date(dateString);
    const timeDifference = currentDate - jobDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      return "Today";
    } else if (daysDifference === 1) {
      return "Yesterday";
    } else {
      return jobDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <div
      className="p-5 rounded-lg shadow-lg bg-white border border-gray-200"
      
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{formatDate(job?.createdAt)}</p>
        <Button className="rounded-full" size="icon" variant="outline">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Avatar>
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfUlGcxUmqLQ08e_4msz7RwXoNtq6yR_f_PA&s" />
        </Avatar>

        <div>
          <h1 className="text-lg font-semibold">{job?.company?.companyName}</h1>
          <p className="text-sm text-gray-500">
            {job?.location}, India
          </p>
        </div>
      </div>

      <div className="my-4">
        <h1 className="text-xl font-bold mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-700">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-600 font-medium" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-red-500 font-medium" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-600 font-medium" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1"
        >
          Details
        </Button>
        <Button className="bg-purple-700 text-white flex-1">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
