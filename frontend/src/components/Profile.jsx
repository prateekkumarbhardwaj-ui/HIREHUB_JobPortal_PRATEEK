import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText, Award } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = user?.profile?.resume;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-5">
              <Avatar className="h-20 w-20 ring-4 ring-purple-100">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="font-bold text-2xl text-gray-800">
                  {user?.fullname}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="cursor-pointer border-gray-200 hover:border-purple-400 hover:text-purple-600 rounded-xl"
            >
              <Pen className="w-4 h-4" />
            </Button>
          </div>

          <hr className="border-gray-100 mb-5" />

          <div className="flex flex-col gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-purple-500" />
              </div>
              <span className="text-gray-600 text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Contact className="w-4 h-4 text-purple-500" />
              </div>
              <span className="text-gray-600 text-sm">{user?.phoneNumber}</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-purple-500" />
              <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Skills
              </h2>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              {user?.profile?.skills?.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 rounded-lg px-3 py-1 text-xs font-medium"
                    variant="outline"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No skills added</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <Label className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Resume
              </Label>
            </div>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-sm text-purple-600 hover:text-purple-800 hover:underline cursor-pointer font-medium"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-400 text-sm">No resume uploaded</span>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h1 className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
