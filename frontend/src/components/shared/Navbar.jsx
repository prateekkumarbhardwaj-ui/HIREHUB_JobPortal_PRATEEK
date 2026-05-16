import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-14 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6A38C2] rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Hire<span className="text-[#6A38C2]">Hub</span>
          </h1>
        </Link>

        {/* Nav Links + Auth */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-sm text-gray-600">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#6A38C2] transition-colors"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#6A38C2] transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#6A38C2] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#6A38C2] transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#6A38C2] transition-colors"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons or Avatar */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/Login">
                <Button
                  variant="outline"
                  className="h-8 text-sm rounded-lg border-gray-200 hover:border-[#6A38C2] hover:text-[#6A38C2]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button className="h-8 text-sm rounded-lg bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-sm">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <Avatar className="w-8 h-8 ring-2 ring-purple-200 group-hover:ring-[#6A38C2] transition-all">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#6A38C2] transition-colors">
                    {user?.fullname?.split(" ")[0]}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-white w-72 p-4 rounded-2xl shadow-lg border border-gray-100">
                {/* User Info */}
                <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
                  <Avatar className="w-10 h-10 ring-2 ring-purple-100">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {user?.fullname}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                      <User2 className="w-4 h-4 text-purple-500" />
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-gray-600 hover:text-[#6A38C2]"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
                    <LogOut className="w-4 h-4 text-red-400" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="p-0 h-auto text-sm text-gray-600 hover:text-red-500"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
