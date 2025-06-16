import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await fetch(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    method: 'GET',
                    credentials: 'include' 
                });

                if (!response.ok) {
                    console.log(response.message);  
                }

                const data = await response.json();
                if (data.success) {
                    dispatch(setAllJobs(data.jobs));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
