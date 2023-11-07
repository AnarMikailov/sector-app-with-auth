import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
const Users = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Toaster />
          <UserList />
        </>
      )}
    </>
  );
};

export default Users;
