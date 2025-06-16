import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_API_END_POINT } from "@/utils/constant";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      case "password":
        validatePassword(e.target.value);
        break;
      case "phoneNumber":
        validatePhoneNumber(e.target.value);
        break;
      case "email":
        validateEmail(e.target.value);
        break;
      default:
        break;
    }
  };

  const validatePassword = (password) => {
    const passwordCriteria = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (!passwordCriteria.length) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!passwordCriteria.lowercase) {
      setPasswordError("Password must contain at least one lowercase letter.");
    } else if (!passwordCriteria.uppercase) {
      setPasswordError("Password must contain at least one uppercase letter.");
    } else if (!passwordCriteria.specialChar) {
      setPasswordError("Password must contain at least one special character.");
    } else {
      setPasswordError("");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length !== 10) {
      setPhoneError("Phone number must be exactly 10 characters long.");
    } else {
      setPhoneError("");
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const domainPattern = /\.(com|net|org|edu|gov|mil|co)$/i; // Add other valid TLDs if necessary

    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else if (!domainPattern.test(email)) {
      setEmailError("Email must have a valid domain (e.g., .com, .net, .org).");
    } else {
      setEmailError("");
    }
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError || phoneError || emailError) {
      toast.error("Please fix the form issues before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await fetch(`${USER_API_END_POINT}/register`, {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        navigate("/login");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
        >
          <h1 className="font-bold text-2xl mb-6 text-gray-800 text-center">Sign Up</h1>

          <div className="my-4">
            <Label htmlFor="fullname" className="text-sm font-medium text-gray-600">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              value={input.fullname}
              onChange={changeEventHandler}
              name="fullname"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="my-4">
            <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {emailError && (
              <p className="text-red-500 text-sm">{emailError}</p>
            )}
          </div>

          <div className="my-4">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-600">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              name="phoneNumber"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {phoneError && (
              <p className="text-red-500 text-sm">{phoneError}</p>
            )}
          </div>

          <div className="relative my-4">
            <Label htmlFor="password" className="text-sm font-medium text-gray-600">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 mt-8 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <div className="my-6">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="role-student" className="text-sm font-medium text-gray-600">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                />
                <Label htmlFor="role-recruiter" className="text-sm font-medium text-gray-600">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="my-6">
            <Label htmlFor="file" className="text-sm font-medium text-gray-600">Upload File</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              name="file"
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
          </Button>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;