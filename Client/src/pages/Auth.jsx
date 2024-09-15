//  all the component used in this page, will be created in component/auth directory

import React, { useState } from "react";
import Victory from "@/assets/victory.svg";
import Background from "@/assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "sonner";
import { apiConnector } from "@/services/apiConnector";
import { authApiEndPoints } from "@/services/apiEndPoints";

const { SIGNUP_API, LOGIN_API } = authApiEndPoints;

export const Auth = () => {
  //  cteate state variable
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  //    handle form submit events
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Please enter email!");
      return false;
    }
    if (!password.length) {
      toast.error("Please enter Password");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //  if validateLogin is true , then map api call
      if (validateLogin()) {
        const response = await apiConnector(
          "POST",
          LOGIN_API,
          { email, password },
          { withCredentials: true } // cookie will be send to the browser
        );

        //  log the response
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Please enter email!");
      return false;
    }
    if (!password.length) {
      toast.error("Please enter Password");
      return false;
    }

    if (password !== confirmPass) {
      toast.error("Password and ConfirmPassword must be same!");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      //  if validate Signup is true ,make an api call
      if (validateSignUp()) {
        const response = await apiConnector(
          "POST",
          SIGNUP_API,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        //  log the response
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-[100vh]  w-[100vw] flex justify-center items-center ">
      {/*  auth container div below */}
      <div className="h-[90vh] bg-white borrder-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw]  lg:flex md:flex xl:flex items-center justify-center  ">
        {/*  left container */}
        <div className="flex flex-col items-center justify-center gap-6  ">
          {/* form container with heading */}
          <div className="flex flex-col justify-center items-center ">
            {/* welcome Heading div */}
            <div className="flex  justify-center items-center  ">
              <h1 className="text-2xl font-bold sm:text-2xl md:text-4xl lg:text-5xl   ">
                Welcome
              </h1>

              {/*  add victory emoji */}
              <img src={Victory} alt="" className="lg:h-[6rem] h-[4rem]  " />
            </div>

            {/*  sub heading div */}
            <div className="flex justify-center items-center px-3 text-lg">
              <p>
                Fill in the Details to get started With{" "}
                <span className="text-lg font-semibold text-pink-500 ">
                  Ping Me!
                </span>
              </p>
            </div>
          </div>

          {/*  Login and signUp Tab Container */}
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="signup" className=" w-3/4 ">
              <TabsList className=" bg-transparent rounded-none w-full  ">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 data-[state=active]:font-semibold p-3 transition-all duration-300  "
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 data-[state=active]:font-semibold p-3 transition-all duration-300  "
                  value="signup"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>

              {/*  add tab cotent */}
              <TabsContent value="login">
                {/* set input fields for login*/}
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col gap-5 mt-6"
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex justify-center items-center relative">
                    <Input
                      placeholder="Password"
                      name="password"
                      type={passVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setPassVisible(!passVisible)}
                    >
                      {passVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </div>
                  </div>

                  {/*  add button */}
                  <Button className="rounded-full p-4 w-full">Login</Button>
                </form>
              </TabsContent>

              {/*  input field for signup */}
              <TabsContent value="signup">
                <form
                  onSubmit={handleSignup}
                  className="flex flex-col gap-5 mt-6"
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex justify-center items-center relative">
                    <Input
                      placeholder="Password"
                      name="password"
                      type={passVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setPassVisible(!passVisible)}
                    >
                      {passVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </div>
                  </div>

                  {/*  confirm password field */}
                  <div className="flex justify-center items-center relative">
                    <Input
                      placeholder="Confirm Password"
                      name="confirmPass"
                      type={confirmPassVisible ? "text" : "password"}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />

                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setConfirmPassVisible(!confirmPassVisible)}
                    >
                      {confirmPassVisible ? (
                        <IoEyeOffOutline />
                      ) : (
                        <IoEyeOutline />
                      )}
                    </div>
                  </div>

                  {/*  add button */}
                  <Button className="rounded-full p-4 w-full">SignUp</Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/*  right container */}
        <div className="hidden md:flex lg:flex xl:flex justify-center items-center">
          {/*  add bg image */}
          <img src={Background} alt="auth-Bg" className=" h-[500px] " />
        </div>
      </div>
    </div>
  );
};
