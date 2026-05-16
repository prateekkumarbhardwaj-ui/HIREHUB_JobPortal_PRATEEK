import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  Calendar,
  Star,
} from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-bold text-2xl text-gray-800 mb-3">
                  {singleJob?.title}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-semibold px-3 py-1">
                    {singleJob?.position} Positions
                  </Badge>
                  <Badge className="bg-orange-50 text-orange-500 border-orange-100 font-semibold px-3 py-1">
                    {singleJob?.jobType}
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-600 border-purple-100 font-semibold px-3 py-1">
                    {singleJob?.salary} LPA
                  </Badge>
                </div>
              </div>
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-xl px-6 py-5 font-semibold shadow-md ${
                  isApplied
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
                }`}
              >
                {isApplied ? "✓ Already Applied" : "Apply Now →"}
              </Button>
            </div>
          </div>

          <div className="p-8">
            <h2 className="font-bold text-lg text-gray-800 mb-6">
              Job Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Role</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {singleJob?.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Location</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {singleJob?.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Salary</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {singleJob?.salary} LPA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Experience
                  </p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {singleJob?.experience} yrs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Total Applicants
                  </p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {singleJob?.applications?.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Posted Date
                  </p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {singleJob?.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-purple-50 rounded-xl border border-purple-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                Job Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {singleJob?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
