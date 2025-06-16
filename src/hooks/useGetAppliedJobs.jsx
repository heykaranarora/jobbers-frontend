import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await fetch(`${APPLICATION_API_END_POINT}/get`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                const data = await res.json();
                
                if (data.success) {
                    dispatch(setAllAppliedJobs(data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
