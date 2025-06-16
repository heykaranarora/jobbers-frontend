import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
//  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const onChangeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        navigate("/");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f7f9] to-[#efebf3]">
      <Navbar />
      <div className="flex items-center justify-center px-4 md:px-8 lg:px-12 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 mt-6 space-y-6"
        >
          <h1 className="font-extrabold text-3xl mb-8 text-gray-900 text-center">
            Welcome Back!
          </h1>

          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={onChangeEventHandler}
              value={input.email}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative mb-6">
            <Label className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={input.password}
              onChange={onChangeEventHandler}
              name="password"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 mt-7 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className="mb-6">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={onChangeEventHandler}
                  id="r1"
                />
                <Label htmlFor="r1" className="text-sm font-medium text-gray-700">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={onChangeEventHandler}
                  id="r2"
                />
                <Label htmlFor="r2" className="text-sm font-medium text-gray-700">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full py-3 my-4 bg-blue-500 text-white rounded-lg flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-3 my-4  bg-[#6A38C2] text-white rounded-lg hover:bg-[#6A38C2]"
            >
              Login
            </Button>
          )}

          <p className="text-center mt-4 text-gray-700">
            Don't Have an Account?{" "}
            <Link to="/signup" className=" text-[#6A38C2] hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-center mt-2 text-gray-700">
            Login as Admin?{" "}
            <Link to="/owner/login" className=" text-[#6A38C2] hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
