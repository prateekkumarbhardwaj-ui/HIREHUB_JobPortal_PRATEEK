import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText, Star, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) formData.append("file", input.file);
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent
                    className="sm:max-w-106.25 bg-white rounded-2xl border border-gray-100 shadow-lg p-0 overflow-hidden"
                    onInteractOutside={() => setOpen(false)}
                >
                    
                    <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            Update Profile
                        </DialogTitle>
                        <p className="text-gray-400 text-sm">Update your personal information</p>
                    </DialogHeader>

                    <form onSubmit={submitHandler}>
                        <div className="px-6 py-4 space-y-4">

                            <div>
                                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                                    <User className="w-4 h-4 text-purple-500" /> Full Name
                                </Label>
                                <Input
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg h-10"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                                    <Mail className="w-4 h-4 text-purple-500" /> Email
                                </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg h-10"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                                    <Phone className="w-4 h-4 text-purple-500" /> Phone Number
                                </Label>
                                <Input
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg h-10"
                                    placeholder="8080808080"
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                                    <FileText className="w-4 h-4 text-purple-500" /> Bio
                                </Label>
                                <Input
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg h-10"
                                    placeholder="Tell us about yourself"
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                                    <Star className="w-4 h-4 text-purple-500" /> Skills
                                </Label>
                                <Input
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg h-10"
                                    placeholder="React, Node.js, MongoDB..."
                                />
                            </div>

                            <div>
                                <Label className="text-gray-700 font-semibold flex items-center gap-1 mb-1">
                                    <Upload className="w-4 h-4 text-purple-500" /> Resume (PDF)
                                </Label>
                                <Input
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="border-gray-200 rounded-lg cursor-pointer text-sm"
                                />
                            </div>

                        </div>

                        <DialogFooter className="px-6 pb-6">
                            {loading ? (
                                <Button className="w-full bg-[#6A38C2] text-white rounded-lg py-5">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-lg py-5 font-semibold shadow-md"
                                >
                                    Save Changes →
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog