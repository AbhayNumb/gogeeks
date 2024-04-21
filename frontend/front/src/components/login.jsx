import React, { useEffect, useState, useRef } from "react";
import { useWebContext } from "../context/contextprovider";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { initFlowbite } from "flowbite";
const Login = () => {
  const navigate = useNavigate();
  const [otpsent, setotpsent] = useState(false);
  const { sendOTP, loginOTP, isAuth, loader, setloader } = useWebContext();
  useEffect(() => {
    initFlowbite();
  }, []);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [otp, setOtp] = useState("");

  // Refs to access input elements
  const inputsRef = useRef([]);
  inputsRef.current = new Array(6)
    .fill()
    .map((_, i) => inputsRef.current[i] ?? React.createRef());
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; // Prevent non-numeric characters

    // Update the OTP by manipulating the string based on input
    let valueArray = otp.split("");
    valueArray[index] = element.value;
    let newOtp = valueArray.join("");

    // If the user hasn't filled the current input, slice off any undefined values
    newOtp = newOtp.slice(0, index + 1);

    setOtp(newOtp);

    // Move focus to next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const sendotphandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please enter email and password to send otp");
      return;
    }
    const val = await sendOTP(email, password);
    if (val) {
      toast.success("OTP sent successfully");
      setotpsent(true);
      // navigate("/dashboard");
    } else {
      toast.error("Some error occured in sending OTP");
    }
  };
  const login = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please enter email and password to verify otp");
      return;
    }
    setloader(true);
    const val = await loginOTP(email, password, otp);
    if (val) {
      await isAuth();
      navigate("/dashboard");
    } else {
      toast.error("Some error occured in sending OTP");
    }
    setloader(false);
  };
  return (
    <div class="flex justify-center items-center h-screen">
      {loader ? (
        <div
          className="flex items-center justify-center"
          style={{ width: "100%", height: "100vh" }}
        >
          <div>
            <MoonLoader color="#1A56DB" />
          </div>
        </div>
      ) : (
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" action="#">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to GoGeekz Assignment
            </h5>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                disabled={otpsent}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="email"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                disabled={otpsent}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            {otpsent ? (
              <div className="bg-white rounded text-center">
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>
                  <span className="font-bold">{`${email}`}</span>
                </div>
                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="text"
                      key={index}
                      maxLength="1"
                      value={otp[index] || ""} // Display the current character or empty if undefined
                      onChange={(e) => handleChange(e.target, index)}
                      ref={inputsRef.current[index]}
                    />
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}

            {otpsent ? (
              <button
                type="submit"
                onClick={(e) => login(e)}
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>
            ) : (
              <button
                type="submit"
                onClick={(e) => sendotphandler(e)}
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                SendOtp
              </button>
            )}

            <div class=" flex justify-center items-center text-sm font-medium text-gray-500 dark:text-gray-300">
              Don't have account?{" "}
              <Link className="text-blue-500" to="/signup">
                Signup
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
