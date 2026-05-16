import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Image } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`https://hirehub-jobportal-prateek.onrender.com/api/v1/company/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 py-10'>

               
                <div className='flex items-center gap-4 mb-8'>
                    <Button
                        onClick={() => navigate("/admin/companies")}
                        variant="outline"
                        className="flex items-center gap-2 text-gray-500 border-gray-200 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className='w-4 h-4' />
                        Back
                    </Button>
                    <div>
                        <h1 className='font-bold text-2xl text-gray-800'>Company Setup</h1>
                        <p className='text-gray-400 text-sm'>Update your company information</p>
                    </div>
                </div>

               
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-2 gap-5'>

                            
                            <div>
                                <Label className='text-gray-700 font-semibold flex items-center gap-1 mb-1'>
                                    <Building2 className='w-4 h-4 text-purple-500' /> Company Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg focus:ring-purple-500"
                                />
                            </div>

                            
                            <div>
                                <Label className='text-gray-700 font-semibold flex items-center gap-1 mb-1'>
                                    <FileText className='w-4 h-4 text-purple-500' /> Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg focus:ring-purple-500"
                                />
                            </div>

                            
                            <div>
                                <Label className='text-gray-700 font-semibold flex items-center gap-1 mb-1'>
                                    <Globe className='w-4 h-4 text-purple-500' /> Website
                                </Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg focus:ring-purple-500"
                                />
                            </div>

                            
                            <div>
                                <Label className='text-gray-700 font-semibold flex items-center gap-1 mb-1'>
                                    <MapPin className='w-4 h-4 text-purple-500' /> Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 rounded-lg focus:ring-purple-500"
                                />
                            </div>

                          
                            <div className='col-span-2'>
                                <Label className='text-gray-700 font-semibold flex items-center gap-1 mb-1'>
                                    <Image className='w-4 h-4 text-purple-500' /> Company Logo
                                </Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="border-gray-200 rounded-lg cursor-pointer"
                                />
                            </div>

                        </div>

                    
                        <div className='mt-8'>
                            {loading ? (
                                <Button className="w-full bg-[#6A38C2] text-white rounded-lg py-5">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-lg py-5 font-semibold shadow-md"
                                >
                                    Update Company →
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CompanySetup