import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState('');

    const registerNewCompany = async () => {
        try {
            const res = await fetch(`${COMPANY_API_END_POINT}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyName: companyName,
                }),
            });

            const data = await res.json();

            if (res.ok && data.company) {
                dispatch(setSingleCompany(data.company)); 
                toast.success(data.message || 'Company registered successfully');
                const companyId = data.company._id; 
                navigate(`/admin/companies/${companyId}`);
            } else {
                toast.error(data.error || "Failed to register company");
            }
        } catch (error) {
            toast.error("An error occurred during registration");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto my-3">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">
                        What would you like to name your company? You can change it later.
                    </p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    placeholder="Enter your Company Name"
                    className="w-full my-4"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>
                        Cancel
                    </Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
