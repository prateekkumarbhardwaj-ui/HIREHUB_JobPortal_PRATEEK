import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className='rounded-2xl overflow-hidden'>
            <Table>
                <TableCaption className='text-gray-400 text-sm py-4'>
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow className='bg-gray-50 border-b border-gray-100'>
                        <TableHead className='text-gray-500 font-semibold'>Logo</TableHead>
                        <TableHead className='text-gray-500 font-semibold'>Name</TableHead>
                        <TableHead className='text-gray-500 font-semibold'>Date</TableHead>
                        <TableHead className='text-gray-500 font-semibold text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow
                            key={company._id}
                            className='hover:bg-purple-50 transition-colors border-b border-gray-50'
                        >
                            <TableCell>
                                <Avatar className='border border-gray-200'>
                                    <AvatarImage src={company.logo} />
                                    <AvatarFallback className='bg-purple-100 text-purple-600 font-bold'>
                                        {company.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className='font-semibold text-gray-800'>
                                {company.name}
                            </TableCell>
                            <TableCell className='text-gray-400 text-sm'>
                                {company.createdAt.split("T")[0]}
                            </TableCell>
                            <TableCell className='text-right'>
                                <Popover>
                                    <PopoverTrigger>
                                        <div className='inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
                                            <MoreHorizontal className='w-4 h-4 text-gray-500' />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-36 bg-white shadow-lg border border-gray-100 rounded-xl p-2'>
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-purple-50 hover:text-purple-600 transition-colors'
                                        >
                                            <Edit2 className='w-4 h-4' />
                                            <span className='text-sm font-medium'>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable