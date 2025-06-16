import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ComapniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setSearchCompanyByText } from '@/redux/companySlice'
const Companies = () => {
  useGetAllCompanies();
  const[input,setInput]=useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();
  

  useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
  },[input])
  return (
    <div> 
     <Navbar/>
     <div className=' max-w-6xl mx-auto my-10'>
        <div className='flex item-center justify-between my-5'>
        <Input
            className='w-fit'
            placeholder='Search Company'
            onChange={(e)=>setInput(e.target.value)}
        />
        <Button onClick={()=>navigate("/admin/companies/create")}>New Comapny</Button>
        </div>

        <ComapniesTable/>
     </div>
    </div>
  )
}

export default Companies
