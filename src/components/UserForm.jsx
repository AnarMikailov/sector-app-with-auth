import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSectorContext } from "../context/SectorsContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import "../components/UserForm.css";

const UserForm = ({ notify }) => {
  const navigateTo = useNavigate();
  const {
    userInfo,
    isValid,
    isChecked,
    setIsChecked,
    username,
    setUsername,
    password,
    setPassword,
    logIn,
    user,
  } = useSectorContext();

  const checkCheckboxState = () => {
    setIsChecked(!isChecked);
  };

  const handleSaveClick = async () => {
    try {
      if (username.trim() === "" || password.trim() === "" || !isChecked) {
        notify();
      } else {
        logIn();
        // navigateTo("/users");
        console.log(user);
        // Check if authentication was successful
        if (user) {
          // Authentication successful, navigate to the "/users" page
        } else {
          // Authentication failed
          notify();
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="user-form-container fade-in">
      <h2>User Form</h2>
      <div className="form">
        <form action="">
          <label> Your Name*</label>
          <input
            className={`user-form-input ${
              !isValid && userInfo.name === "" ? "error" : ""
            }`}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
          />
          <label>Password*</label>
          <input
            className={`user-form-input ${
              !isValid && userInfo.name === "" ? "error" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
        </form>
      </div>
      {
        <>
          <div className="checkbox-container">
            <input
              className="checkbox-input"
              onChange={checkCheckboxState}
              type="checkbox"
            />
            <span
              className={`${!isValid && !isChecked ? "error-bottom " : ""}`}
            >
              Agree to terms*
            </span>
          </div>
        </>
      }
      <button className="submit-button" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

export default UserForm;
