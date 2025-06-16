import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { setAdmin } from "../../redux/adminSlice"; // Ensure correct import

const AdminNavbar = () => {
  const admin = useSelector((state) => state.admin.admin); // Access the admin state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await fetch("https://jobportal-backend-psrc.onrender.com/api/v1/admin/logout", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setAdmin(null)); // Clear admin from state
        toast.success(data.message);
        navigate("/"); // Redirect to home page after logout
      } else {
        throw new Error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md py-5">
      <div className="flex justify-between items-center mx-auto max-w-7xl px-4">
        <div>
          <h1 className="text-3xl font-bold text-[#6A38C2]">
            Jobbers
          </h1>
        </div>
        <div className="flex items-center gap-8">
          {/* Display Logout button if admin is logged in */}
          {admin && (
            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 text-sm text-red-600 hover:underline mt-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}

          {/* "Home" button always visible */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-lg text-black hover:underline mt-2"
          >
            Home
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
