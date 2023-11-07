import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";
import { useSectorContext } from "../context/SectorsContext";
import "../components/UserList.css";
const UserList = () => {
  const navigateTo = useNavigate();
  const {
    userList,
    setUserInfo,
    setIsValid,
    setSelectedCategory,
    setSelectedSectorOptions,
    setIsChecked,
    fecthUsers,
  } = useSectorContext();
  const [editingItemId, setEditingItemId] = useState(null);
  useEffect(() => {
    fecthUsers();
  }, []);

  // Function to toggle editing for a specific item
  const toggleEditing = (itemId) => {
    setEditingItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  const handleAddUser = () => {
    setUserInfo({
      name: "",
      id: "",
      category: "",
      sector_name: "",
    });
    setIsValid(true);
    setSelectedCategory("");
    setSelectedSectorOptions("");
    setIsChecked(false);

    navigateTo("/");
  };
  return (
    <div className="userlist-container">
      <button onClick={handleAddUser} className="button-add-user">
        Add User
      </button>
      <div className="user-container">
        {userList.map((user) => (
          <UserItem
            name={user.name}
            category={user.category}
            sector_name={user.sector_name}
            key={user.id}
            id={user.id}
            isEditing={user.id === editingItemId} // Check if this item is being edited
            toggleEditing={() => toggleEditing(user.id)} // Pass the toggleEditing function
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
