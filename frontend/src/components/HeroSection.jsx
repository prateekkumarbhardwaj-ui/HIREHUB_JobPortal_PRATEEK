import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Briefcase, TrendingUp, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

  const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-40 bg-purple-50 rounded-full blur-3xl opacity-60"></div>

      <div className="relative text-center py-24 px-4 flex flex-col gap-6">
        <div className="mx-auto">
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-semibold text-sm border border-purple-200">
            🚀 India's No. 1 Job Hunt Platform
          </span>
        </div>

        <h1 className="text-6xl font-black text-gray-900 leading-tight tracking-tight">
          Find, Apply & <br />
          Land Your{" "}
          <span className="bg-linear-to-r from-[#6A38C2] to-blue-500 bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>

        <p className="text-gray-400 text-lg max-w-lg mx-auto">
          Connect with top companies. Discover opportunities that match your
          skills and ambitions.
        </p>

        <div className="flex w-[48%] mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2 gap-2">
          <input
            type="text"
            placeholder="Job title, skill, or company..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full px-4 py-2 text-gray-700 bg-transparent text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-linear-to-r from-[#6A38C2] to-blue-500 hover:opacity-90 rounded-xl px-6 py-5 transition-all shadow-lg"
          >
            <Search className="h-5 w-5 text-white" />
            <span className="ml-2 text-white font-semibold">Search</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 justify-center flex-wrap">
          <span className="text-gray-400 text-sm font-medium">Trending:</span>
          {[
            "Frontend Developer",
            "Backend Developer",
            "UI/UX Designer",
            "Data Analyst",
            "Full Stack",
          ].map((tag) => (
            <span
              key={tag}
              onClick={() => {
                dispatch(setSearchedQuery(tag));
                navigate("/browse");
              }}
              className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-sm cursor-pointer hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-12 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800 text-lg leading-none">
                12K+
              </p>
              <p className="text-gray-400 text-xs">Live Jobs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800 text-lg leading-none">
                3.4K+
              </p>
              <p className="text-gray-400 text-xs">Companies</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800 text-lg leading-none">
                98%
              </p>
              <p className="text-gray-400 text-xs">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
