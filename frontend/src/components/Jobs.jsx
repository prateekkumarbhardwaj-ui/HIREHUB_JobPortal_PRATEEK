import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase, SearchX } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              {searchedQuery ? `Results for "${searchedQuery}"` : "All Jobs"}
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            {filterJobs.length} job{filterJobs.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex gap-6">
          <div className="w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <FilterCard />
            </div>
          </div>

          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <SearchX className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                No Jobs Found
              </h3>
              <p className="text-gray-400 text-sm">
                Try different keywords or remove filters
              </p>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 pr-1">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
