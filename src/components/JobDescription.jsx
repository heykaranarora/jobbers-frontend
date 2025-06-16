import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { JOB_API_END_POINT } from "@/utils/constant";
import   { toast }  from "sonner";

const JobDescription = () => {
  
  const params= useParams();
  const jobId= params.id;
  const {singleJob}= useSelector(state=>state.job);
  const {user}= useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const isIntialApplied = singleJob?.application?.some(applications=>applications.applicant===user?._id)|| false;
  const [isApplied,setIsApllied]=useState(isIntialApplied);

  const appplyJobHandler= async ()=>{ 
    try {
      const res= await fetch(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data= await res.json()
    console.log(data);
    if(data.success){
      setIsApllied(true);
      const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]};
      dispatch(setSingleJob(updateSingleJob)); 
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchSingleJob= async (jobId) => {
        try {
            const res= await fetch(`${JOB_API_END_POINT}/get/${jobId}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data= await res.json()
            if(data.success){
                dispatch(setSingleJob(data.job))
                setIsApllied(data.job.applications.some(application=>application.applicant===user?._id)) 
            }else{
                console.log(data.message)
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleJob(jobId);
}, [jobId,dispatch,user?._id])



const formatDate = (dateString) => {
  const jobDate = new Date(dateString);
    return jobDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  
};
  
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex item-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex item center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold "} variant="ghots">
              {singleJob?.position} Position
            </Badge>
            <Badge className={" text-[#F83002] font-bold "} variant="ghots">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold "} variant="ghots">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
        onClick={isApplied?null:appplyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5F32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-bold text-lg py-4 font-md">
        
      </h1>
      <div className="my-2">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Loacation:
          <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
           {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experiene:
          <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel}</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">{formatDate(singleJob?.createdAt)}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;