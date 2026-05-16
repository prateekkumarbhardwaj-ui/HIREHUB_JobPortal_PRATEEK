import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Filter jobs based on searchedQuery
  const filteredJobs = searchedQuery
    ? allJobs.filter((job) => {
        const q = searchedQuery.toLowerCase();
        return (
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q) ||
          job.company?.name?.toLowerCase().includes(q)
        );
      })
    : allJobs;

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Search className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              {searchedQuery ? `Results for "${searchedQuery}"` : "All Jobs"}
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            <span className="text-purple-600 font-semibold">
              {filteredJobs.length}
            </span>{" "}
            jobs found
            {searchedQuery && (
              <button
                onClick={() => dispatch(setSearchedQuery(""))}
                className="ml-3 text-xs text-red-400 hover:text-red-600 underline"
              >
                Clear filter
              </button>
            )}
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              No Jobs Found
            </h3>
            <p className="text-gray-400 text-sm">Try different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
