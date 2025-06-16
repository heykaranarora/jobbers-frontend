import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleComapny = async () => {
      try {
        const res = await fetch(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success) {
            dispatch(setSingleCompany(data.company))
          console.log(data.jobs);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleComapny();
  }, [companyId,dispatch]);
};

export default useGetCompanyById;
