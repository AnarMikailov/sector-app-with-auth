import React, { useState } from "react";
import { useSectorContext } from "../context/SectorsContext";
import { Link } from "react-router-dom";
import "../components/UserItem.css"; // Import your CSS file for additional styling
import toast, { Toaster } from "react-hot-toast";
const UserItem = ({
  name,
  sector_name,
  category,
  id,
  isEditing,
  toggleEditing,
}) => {
  const {
    categoryOptions,
    handleEditUser,
    handleEditCategoryChange,
    handleEditSectorChange,
    handleEditInputChange,
    editedUserInfo,
    editedCategory,
    editedSectorOptions,
    editedheadingOptions,
    setEditedUserInfo,
    handleDeleteUser,
    editinisValid,
    setEditinisValid,
    notifySucces,
    notifyError,
  } = useSectorContext();
  const notify = () => {
    setEditinisValid(false);
    toast.error("Please fill all required fields!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleEditClick = () => {
    setEditedUserInfo({
      name: name,
      category: category,
      sector_name: sector_name,
    });
    toggleEditing(id);
  };

  const handleSaveClick = (id) => {
    if (
      editedUserInfo.name.trim() === "" ||
      editedUserInfo.category === "Select Category" ||
      editedUserInfo.sector_name === "Select Heading"
    ) {
      // Display an error message or perform some action to inform the user that fields are empty or not properly selected
      notify();
    } else {
      handleEditUser(id);
      toggleEditing(id);

      toast.success("User Successfully edited!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="user-card fade-in-bottom">
      {isEditing ? (
        <div>
          <label>Name:</label>
          <input
            className={`user-input  ${
              !editinisValid && editedUserInfo.name === "" ? " error" : ""
            }`}
            onChange={handleEditInputChange}
            type="text"
            required
            placeholder="Your name"
            value={editedUserInfo.name}
          />
          <div>
            <label>Select a Category:</label>
            <select
              className={`category-select  ${
                !editinisValid && editedUserInfo.category === "Select Category"
                  ? " error"
                  : ""
              }`}
              name="category"
              value={editedUserInfo.category}
              onChange={handleEditCategoryChange}
            >
              <option>Select Category</option>
              {categoryOptions}
            </select>
          </div>
          <div>
            <label>Select a Heading:</label>
            <select
              className={`heading-select  ${
                !editinisValid &&
                editedUserInfo.sector_name === "Select Heading"
                  ? " error"
                  : ""
              }`}
              value={editedUserInfo.sector_name}
              onChange={handleEditSectorChange}
              name="sector_name"
            >
              <option>Select Heading</option>
              {editedheadingOptions}
            </select>
          </div>
          <button
            className=" button save-button"
            onClick={() => handleSaveClick(id)}
          >
            Save Changes
          </button>
          <button className="button cancel-button" onClick={toggleEditing}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3>Name</h3> <p>{name}</p>
          <h3>Category</h3> <p>{category}</p>
          <h3>Sector</h3> <p>{sector_name}</p>
          <button
            className=" button edit-button"
            type="button"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className=" button delete-button"
            type="button"
            onClick={() => handleDeleteUser(id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserItem;
