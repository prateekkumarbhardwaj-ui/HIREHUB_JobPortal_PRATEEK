import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, BookmarkPlus } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 cursor-pointer transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center overflow-hidden">
            {job?.company?.logo ? (
              <img
                src={job?.company?.logo}
                alt={job?.company?.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <Briefcase className="w-5 h-5 text-purple-600" />
            )}
          </div>

          <div>
            <h1 className="font-semibold text-gray-800 text-sm">
              {job?.company?.name}
            </h1>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <p className="text-xs text-gray-400">
                {job?.location || "India"}
              </p>
            </div>
          </div>
        </div>
        <BookmarkPlus className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
      </div>

      <div className="mb-4">
        <h1 className="font-bold text-gray-800 text-base mb-1">{job?.title}</h1>
        <p className="text-xs text-gray-400 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          className="text-xs bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 rounded-lg px-2 py-0.5"
          variant="outline"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-xs bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100 rounded-lg px-2 py-0.5"
          variant="outline"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-xs bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100 rounded-lg px-2 py-0.5"
          variant="outline"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
