import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const validatePhoneNumber = (phoneNumber) => {
  if (typeof phoneNumber !== 'string') {
    return false; // Return false if phoneNumber is not a string
  }
  const cleaned = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
  return cleaned.length === 10; // Ensure the length is exactly 10 digits
};

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput((prevInput) => ({
      ...prevInput,
      file,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //  Validate phone number
    if (!validatePhoneNumber(input.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    setLoadingState(true);
  
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
  
    if (input.file) {
      formData.append("file", input.file);
    }
  
    try {
      const response = await fetch(`${USER_API_END_POINT}/profile/update`, {
        method: "POST",
        credentials: "include", 
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
      } else {
        toast.error(data.message || "Profile update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    } finally {
      setLoadingState(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-425px"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <Input
                id="fullname"
                type="text"
                className="col-span-3"
                name="fullname"
                onChange={changeEventHandler}
                value={input.fullname}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                name="email"
                onChange={changeEventHandler}
                value={input.email}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                className="col-span-3"
                name="phoneNumber"
                onChange={changeEventHandler}
                value={input.phoneNumber}
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                className="col-span-3"
                name="bio"
                onChange={changeEventHandler}
                value={input.bio}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                className="col-span-3"
                name="skills"
                onChange={changeEventHandler}
                value={input.skills}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                className="col-span-3"
                name="file"
                type="file"
                onChange={fileChangeHandler}
                accept="application/pdf"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;