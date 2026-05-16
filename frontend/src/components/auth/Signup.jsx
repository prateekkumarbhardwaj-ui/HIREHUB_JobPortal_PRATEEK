import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { useNavigate } from 'react-router-dom'
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from "../../utils/constant";
import { setLoading } from '@/redux/authSlice'
import { Loader2, User, Mail, Phone, Lock, Image, UserCheck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "", email: "", phoneNumber: "",
    password: "", role: "", file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post("https://hirehub-jobportal-prateek.onrender.com/api/v1/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) navigate("/");
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-7 h-7 text-purple-600" />
              </div>
              <h1 className="font-bold text-2xl text-gray-800">Create Account</h1>
              <p className="text-gray-400 text-sm mt-1">Join thousands of job seekers today</p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-4">

             
              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <User className="w-4 h-4 text-purple-500" /> Full Name
                </Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="Prateek Sharma"
                  className="border-gray-200 rounded-lg h-11"
                />
              </div>

              
              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Mail className="w-4 h-4 text-purple-500" /> Email
                </Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="prateek@gmail.com"
                  className="border-gray-200 rounded-lg h-11"
                />
              </div>

             
              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Phone className="w-4 h-4 text-purple-500" /> Phone Number
                </Label>
                <Input
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="8080808080"
                  className="border-gray-200 rounded-lg h-11"
                />
              </div>

              
              <div>
                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                  <Lock className="w-4 h-4 text-purple-500" /> Password
                </Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="border-gray-200 rounded-lg h-11"
                />
              </div>

             
              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label className="text-gray-700 font-semibold mb-2 block">Role</Label>
                  <RadioGroup className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === "student"}
                        onChange={changeEventHandler}
                        className="cursor-pointer w-4 h-4 accent-purple-600"
                      />
                      <Label className="text-gray-600 cursor-pointer">Student</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === "recruiter"}
                        onChange={changeEventHandler}
                        className="cursor-pointer w-4 h-4 accent-purple-600"
                      />
                      <Label className="text-gray-600 cursor-pointer">Recruiter</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-2">
                    <Image className="w-4 h-4 text-purple-500" /> Profile
                  </Label>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer text-sm border-gray-200 rounded-lg w-36"
                  />
                </div>
              </div>

              
              <div className="pt-2">
                {loading ? (
                  <Button className="w-full bg-[#6A38C2] text-white rounded-lg py-5">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-lg py-5 font-semibold shadow-md"
                  >
                    Create Account →
                  </Button>
                )}
              </div>

             
              <p className="text-center text-sm text-gray-500 pt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;