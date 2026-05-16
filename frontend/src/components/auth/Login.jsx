import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, LogIn } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post("https://hirehub-jobportal-prateek.onrender.com/api/v1/user/login", input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <LogIn className="w-7 h-7 text-purple-600" />
                            </div>
                            <h1 className="font-bold text-2xl text-gray-800">Welcome Back</h1>
                            <p className="text-gray-400 text-sm mt-1">Login to continue your journey</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-4">

                            {/* Email */}
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

                            {/* Password */}
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

                            {/* Role */}
                            <div className="pt-2">
                                <Label className="text-gray-700 font-semibold mb-2 block">Role</Label>
                                <RadioGroup className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
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
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4 accent-purple-600"
                                        />
                                        <Label className="text-gray-600 cursor-pointer">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Submit */}
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
                                        Login →
                                    </Button>
                                )}
                            </div>

                            {/* Signup Link */}
                            <p className="text-center text-sm text-gray-500 pt-2">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
                                    Signup
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login