import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase, FileText, MapPin, DollarSign, Clock, Star, Building2, Hash, ArrowLeft } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "", description: "", requirements: "",
    salary: "", location: "", jobType: "",
    experience: "", position: 0, companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Back + Title */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/jobs")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 border-gray-200 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div>
            <h1 className="font-bold text-2xl text-gray-800">Post New Job</h1>
            <p className="text-gray-400 text-sm">Fill in the details to post a new job</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-5">

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Briefcase className="w-4 h-4 text-purple-500" /> Title
                </Label>
                <Input type="text" name="title" value={input.title}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg"
                  placeholder="e.g. Frontend Developer" />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <FileText className="w-4 h-4 text-purple-500" /> Description
                </Label>
                <Input type="text" name="description" value={input.description}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg"
                  placeholder="Brief job description" />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-purple-500" /> Requirements
                </Label>
                <Input type="text" name="requirements" value={input.requirements}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg"
                  placeholder="e.g. React, Node.js" />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-purple-500" /> Salary
                </Label>
                <Input type="text" name="salary" value={input.salary}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg"
                  placeholder="e.g. 8 LPA" />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <MapPin className="w-4 h-4 text-purple-500" /> Location
                </Label>
                <Input type="text" name="location" value={input.location}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg"
                  placeholder="e.g. Delhi, Remote" />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-purple-500" /> Job Type
                </Label>
                <Input type="text" name="jobType" value={input.jobType}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg"
                  placeholder="e.g. Full Time, Remote" />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-purple-500" /> Experience Level
                </Label>
                <Input type="text" name="experience" value={input.experience}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg"
                  placeholder="e.g. 0-2 years" />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Hash className="w-4 h-4 text-purple-500" /> No of Positions
                </Label>
                <Input type="number" name="position" value={input.position}
                  onChange={changeEventHandler}
                  className="border-gray-200 rounded-lg" />
              </div>

              {/* Company Dropdown */}
              {companies.length > 0 && (
                <div className="col-span-2">
                  <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                    <Building2 className="w-4 h-4 text-purple-500" /> Select Company
                  </Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full border border-gray-200 bg-white text-black rounded-lg">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

            </div>

            {/* Submit */}
            <div className="mt-8">
              {loading ? (
                <Button className="w-full bg-[#6A38C2] text-white rounded-lg py-5">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit"
                  className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-lg py-5 font-semibold shadow-md">
                  Post New Job →
                </Button>
              )}
            </div>

            {companies.length === 0 && (
              <p className="text-xs text-red-500 font-semibold text-center mt-4">
                * Please register a company first before posting a job
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;