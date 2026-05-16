import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>

                
                <div className='mb-8'>
                    <div className='flex items-center gap-2 mb-1'>
                        <Building2 className='w-6 h-6 text-purple-600' />
                        <h1 className='text-2xl font-bold text-gray-800'>Companies</h1>
                    </div>
                    <p className='text-gray-400 text-sm'>Manage all your registered companies</p>
                </div>

                
                <div className='flex items-center justify-between mb-6'>
                    <Input
                        className="w-64 border-gray-200 shadow-sm rounded-lg"
                        placeholder="🔍 Filter by name..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-lg px-5 shadow-md flex items-center gap-2"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        <Plus className='w-4 h-4' />
                        New Company
                    </Button>
                </div>

              
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                    <CompaniesTable />
                </div>

            </div>
        </div>
    )
}

export default Companies