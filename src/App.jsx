import React, { useEffect, useState } from "react";
import { useSectorContext } from "./context/SectorsContext";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const { getSectors } = useSectorContext();
  useEffect(() => {
    getSectors();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
