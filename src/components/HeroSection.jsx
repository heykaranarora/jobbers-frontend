import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f8f7f9] to-[#efebf3] py-24 md:py-36 text-gray-900">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Find, Apply & Land Your <br />
            <span className="text-[#6A38C2] block mt-2">Dream Job</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Discover thousands of job opportunities tailored to your skills and career goals.
            Start your journey today!
          </p>

          <div className="flex justify-center mt-8">
            <div className="flex w-full max-w-2xl shadow-lg border border-gray-300 rounded-full bg-white items-center">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for jobs"
                className="outline-none border-none w-full pl-4 py-2 rounded-l-full text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-[#6A38C2]"
              />
            </div>
              <Button
                className="rounded-r-full bg-[#6A38C2] text-white flex items-center justify-center px-6 py-4"
                onClick={searchJobHandler}
              >
                <Search className="h-5 w-5" />
                <span className="hidden sm:block py-3">Search</span>
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
