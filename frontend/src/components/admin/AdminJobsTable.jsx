import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className='rounded-2xl overflow-hidden'>
      <Table>
        <TableCaption className='text-gray-400 text-sm py-4'>
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className='bg-gray-50 border-b border-gray-100'>
            <TableHead className='text-gray-500 font-semibold'>Company Name</TableHead>
            <TableHead className='text-gray-500 font-semibold'>Role</TableHead>
            <TableHead className='text-gray-500 font-semibold'>Date</TableHead>
            <TableHead className='text-gray-500 font-semibold text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className='hover:bg-purple-50 transition-colors border-b border-gray-50'
            >
              <TableCell className='font-semibold text-gray-800'>
                {job?.company?.name}
              </TableCell>
              <TableCell>
                <span className='bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium'>
                  {job?.title}
                </span>
              </TableCell>
              <TableCell className='text-gray-400 text-sm'>
                {job?.createdAt.split("T")[0]}
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
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-purple-50 hover:text-purple-600 transition-colors'
                    >
                      <Edit2 className='w-4 h-4' />
                      <span className='text-sm font-medium'>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-purple-50 hover:text-purple-600 transition-colors mt-1'
                    >
                      <Eye className='w-4 h-4' />
                      <span className='text-sm font-medium'>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;