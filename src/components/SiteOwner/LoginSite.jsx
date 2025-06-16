import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import AdminNavbar from "./SiteNavbar";
import { setAdmin } from "../../redux/adminSlice"; 
import { Loader2 } from "lucide-react";

const LoginSite = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/v1/admin/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setAdmin(data.admin)); // Set admin data from the response
        toast.success(data.message);
        navigate("/owner/verifyadmin");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
        >
          <h1 className="font-bold text-2xl mb-6 text-gray-800 text-center">Login</h1>

          <div className="my-4">
            <Label className="text-sm font-medium text-gray-600">Username</Label>
            <Input
              placeholder="Enter your Username"
              value={input.username}
              onChange={onChangeEventHandler}
              name="username"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative my-4">
            <Label className="text-sm font-medium text-gray-600">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={input.password}
              onChange={onChangeEventHandler}
              name="password"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 mt-7 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Login
              </Button>
            )}
        </form>
      </div>
    </div>
  );
};

export default LoginSite;
