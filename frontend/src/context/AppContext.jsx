import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-Auth`);
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      // Only show toast if it’s not the expected "Not Authorized" message
      if (message !== "Not Authorized, Please login again.") {
        toast.error(message || "Something went wrong.");
      }
      console.log(message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      // Only show toast if it’s not the expected "Not Authorized" message
      if (message !== "Not Authorized, Please login again.") {
        toast.error(message || "Something went wrong.");
      }
      console.log(message);
    }
  };

  useEffect(() => {
    const publicRoutes = ["/login", "/reset-password"];

    if (!publicRoutes.includes(location.pathname)) {
      getAuthState();
    }
  }, [location.pathname]);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
