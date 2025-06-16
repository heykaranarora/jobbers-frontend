import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  

    const fetchCompany = async () => {
      try {
        const res = await fetch('https://jobportal-backend-psrc.onrender.com/api/v1/company/get', {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });


        if (!res.ok) {
          return;
        }

        const data = await res.json();

        if (data.success) {
          dispatch(setCompanies(data.companies)); 
        } else {
          console.error("Error fetching companies:", data.message); 
        }
      } catch (error) {
        console.error("Fetch error:", error); 
      }
    };

    fetchCompany(); 
  }, []); 
  
};

export default useGetAllCompanies;
