import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userPicture, setUserPicture] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user) {
      setUserPicture(user.picture);
    } else {
      console.log("no user");
    }
    console.log(userPicture);
  }, [user]);

  const userLogin = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      });
  };

  return (
    <div className="p-3.5 shadow-md flex justify-between items-center px-5 bg-orange-200/[.3]">
      <a href="/"><img src="/logo.svg" className="cursor-pointer " /></a>
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-2xl w-18 sm:w-24 border-black hover:bg-gradient-to-tr from-orange-200 to-[#26ae75]
            hover:shadow-gray-600 hover:shadow-sm hover:border-gray-800 hover:scale-105">
                Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={userPicture}
                  className="size-10 rounded-full border-black border-2 hover:scale-105"
                />
              </PopoverTrigger>
              <PopoverContent
                className="rounded-xl ml-5 text-center p-2
                        w-24 sm:w-28 md:w-32 lg:w-32 xl:w-32 2xl:w-32">
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="cursor-pointer hover:scale-105">
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-2xl font-bold bg-[#32c387] hover:bg-[#26ae75] border-black border hover:scale-105 hover:text-slate-200 text-gray-800">
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:w-[500px] w-[350px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col items-center mx-5 font-mono select-none">
                    <img
                      className="size-14 mt-2"
                      src="/logo.svg"
                      alt="google logo"
                    />
                    <h2 className="my-5 text-2xl font-bold text-black">
                      Sign In
                    </h2>
                    <p className="text-gray-700 text-center">
                      Save your trips and access them anywhere
                    </p>
                    <Button
                      className="mt-20 p-6 w-full text-lg font-semibold flex gap-5
                        items-center justify-center bg-black"
                      onClick={userLogin}>
                      <FcGoogle className="text-2xl size-6" /> Sign In With
                      Google
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Header;
