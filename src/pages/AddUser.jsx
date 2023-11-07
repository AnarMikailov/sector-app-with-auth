import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import "../pages/AddUser.css";
import toast, { Toaster } from "react-hot-toast";
import { useSectorContext } from "../context/SectorsContext";
import Loader from "../components/Loader";
const AddUser = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  const { isValid, setIsValid } = useSectorContext();
  const notify = () => {
    toast.error("Please fill  all required fields!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setIsValid(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Toaster />
          <div>
            <UserForm notify={notify} />
          </div>
        </>
      )}
    </>
  );
};

export default AddUser;
