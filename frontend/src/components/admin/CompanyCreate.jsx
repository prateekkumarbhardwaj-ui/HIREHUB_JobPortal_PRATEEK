import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`https://hirehub-jobportal-prateek.onrender.com/api/v1/company/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 py-16'>

                
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-10'>

                   
                    <div className='flex flex-col items-center text-center mb-10'>
                        <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4'>
                            <Building2 className='w-8 h-8 text-purple-600' />
                        </div>
                        <h1 className='font-bold text-2xl text-gray-800'>Create Your Company</h1>
                        <p className='text-gray-400 text-sm mt-2 max-w-sm'>
                            Give your company a name to get started. You can always change this later.
                        </p>
                    </div>

                  
                    <div className='mb-8'>
                        <Label className='text-gray-700 font-semibold'>Company Name</Label>
                        <Input
                            type="text"
                            className="my-2 border-gray-200 rounded-lg h-11 focus:ring-purple-500"
                            placeholder="e.g. JobHunt, Microsoft, Google..."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    
                    <div className='flex items-center gap-3'>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg px-5"
                            onClick={() => navigate("/admin/companies")}
                        >
                            <ArrowLeft className='w-4 h-4' />
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-lg py-5 font-semibold shadow-md"
                            onClick={registerNewCompany}
                        >
                            Continue →
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompanyCreate