import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";

const ContextProvider = createContext();
const WebContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [me, setme] = useState({});
  const [users, setUsers] = useState("None");
  useEffect(() => {
    initFlowbite();
    isAuth();
  }, []);
  const [loader, setloader] = useState(true);
  const [chartdata, setchartData] = useState("None");
  const URL = "https://gogeekbackend.onrender.com/api/v1";
  const isAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        let response = await fetch(`${URL}/user/isAuth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Including bearer token in the Authorization header
          },
        });
        response = await response.json();
        if (response.success === false) {
          navigate("/");
        } else {
          if (
            response.user.role === "admin" ||
            response.user.role === "manager"
          ) {
            await GetAllUsers();
          }
          const resp = await ChartDistribution();

          setme(response.user);
          if (resp.success) {
            setloader(false);
          }
          toast.success("Login Successfully");

          navigate("/dashboard");
        }
      } else {
        setloader(false);
        navigate("/");
      }
    } catch (error) {
      setloader(false);
      navigate("/");
    }
  };
  const sendOTP = async (email, password) => {
    try {
      let response = await fetch(`${URL}/user/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      let data = await response.json();
      if (data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const loginOTP = async (email, password, otp) => {
    try {
      let response = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password, otp: otp }),
      });
      let data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        await isAuth();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const createuser = async (
    name,
    email,
    password,
    age,
    occupation,
    address,
    state,
    country
  ) => {
    try {
      let response = await fetch(`${URL}/user/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          age: age,
          occupation: occupation,
          address: address,
          state: state,
          country: country,
        }),
      });
      let data = await response.json();
      if (data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const LogOutAPI = async () => {
    try {
      localStorage.clear();
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logged Out Failed");
    }
  };
  const GetAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`${URL}/user/getAllUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setloader(false);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const UpdateUser = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL}/user/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), // Use the 'data' parameter here
      });
      const responseData = await response.json(); // Rename 'data' to 'responseData' to avoid conflict
      if (responseData.success) {
        await GetAllUsers();
        await ChartDistribution();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };
  const DeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL}/user/updateUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: id }), // Use the 'data' parameter here
      });
      const responseData = await response.json(); // Rename 'data' to 'responseData' to avoid conflict
      if (responseData.success) {
        await GetAllUsers();
        await ChartDistribution();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };
  const ChartDistribution = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL}/user/dataforchart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setchartData(responseData.data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };
  return (
    <ContextProvider.Provider
      value={{
        sendOTP,
        loginOTP,
        createuser,
        me,
        users,
        setUsers,
        UpdateUser,
        LogOutAPI,
        DeleteUser,
        ChartDistribution,
        chartdata,
        loader,
        isAuth,
        setloader,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default WebContextProvider;

export const useWebContext = () => {
  return useContext(ContextProvider);
};
