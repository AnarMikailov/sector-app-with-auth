import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
const SectorContext = createContext();

export const ContextProvider = ({ children }) => {
  const sectorCollectionsRef = collection(db, "Sectors");
  const userCollectionsRef = collection(db, "users");
  const [sectors, setSectors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSectorOptions, setSelectedSectorOptions] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedSectorOptions, setEditedSectorOptions] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [editinisValid, setEditinisValid] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    category: "",
    sector_name: "",
  });
  const [editedUserInfo, setEditedUserInfo] = useState({
    name: "",
    // id: "",
    category: "",
    sector_name: "",
  });

  const [userList, setUserList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const notifySucces = () => {
    toast.success("User Successfully added!", {
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
  const notifyError = () => {
    toast.error("Something went wrong!", {
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
  //=========================================================
  // Fetching all categories and sectors from databse
  //=========================================================
  const getSectors = async () => {
    try {
      const data = await getDocs(sectorCollectionsRef);
      const fetchedSectros = [
        ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ];
      setSectors(fetchedSectros[0].sectors);
      // setSectors(mockData);
    } catch {
      notifyError();
    }
  };

  //=========================================
  // Taking data from Form and adding it to userInfo State.And then we will send userInfo to database
  //=========================================================================================
  const selectedSector = sectors.find(
    (sector) => sector.category === selectedCategory
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setUserInfo((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };
  const handleSectorChange = (event) => {
    setSelectedSectorOptions(event.target.value);
    setUserInfo((prev) => ({
      ...prev,
      sector_name: event.target.value,
      id: Math.random(),
    }));
  };
  const handleInputChange = (event) => {
    setUserInfo((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };
  const categoryOptions = sectors.map((sector) => (
    <option key={sector.value}>{sector.category}</option>
  ));

  const headingOptions = selectedSector?.headings.map((heading) => (
    <option key={heading.value} id={heading.value}>
      {heading.label}
    </option>
  ));
  const editedheadingOptions = editedCategory
    ? sectors
        .find((sector) => sector.category === editedCategory)
        ?.headings.map((heading) => (
          <option key={heading.value} id={heading.value}>
            {heading.label}
          </option>
        ))
    : null;

  //===============================================
  //Sending userInfo to Database
  //===============================================
  const addUser = async () => {
    try {
      await addDoc(userCollectionsRef, userInfo);
      fecthUsers();

      notifySucces();
    } catch {
      notifyError();
    }
  };
  //=====================================
  //Taking currentUsers from databse
  //=====================================
  const fecthUsers = async () => {
    try {
      const users = await getDocs(userCollectionsRef);
      const fetchedUsers = [
        ...users.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ];
      setUserList(fetchedUsers);
    } catch (error) {
      notifyError();
    }
  };

  //================================
  // Updating User(Edit user)
  //================================

  const handleEditCategoryChange = (event) => {
    setEditedCategory(event.target.value);
    setEditedUserInfo((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };
  const handleEditSectorChange = (event) => {
    setEditedSectorOptions(event.target.value);
    setEditedUserInfo((prev) => ({
      ...prev,
      sector_name: event.target.value,
      // id: userInfo.id,
    }));
  };
  const handleEditInputChange = (event) => {
    setEditedUserInfo((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleEditUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, editedUserInfo);
      fecthUsers();
    } catch {
      notifyError();
    }
  };

  //===================================
  //Deleting Users
  //===================================
  const handleDeleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      await fecthUsers();
      toast.success("User Successfully deleted!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      notifyError();
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SectorContext.Provider
      value={{
        sectors,
        getSectors,
        selectedSector,
        selectedCategory,
        handleCategoryChange,
        categoryOptions,
        headingOptions,
        handleSectorChange,
        selectedSectorOptions,
        setSelectedSectorOptions,
        setEditedSectorOptions,
        setSelectedCategory,
        handleInputChange,
        userInfo,
        setUserInfo,
        addUser,
        userList,
        handleEditUser,
        handleDeleteUser,
        handleEditCategoryChange,
        handleEditSectorChange,
        handleEditInputChange,
        editedUserInfo,
        editedCategory,
        editedSectorOptions,
        editedheadingOptions,
        setEditedUserInfo,
        isValid,
        setIsValid,
        isChecked,
        setIsChecked,
        editinisValid,
        setEditinisValid,
        notifySucces,
        notifyError,
        fecthUsers,
      }}
    >
      {children}
    </SectorContext.Provider>
  );
};

export const useSectorContext = () => useContext(SectorContext);
