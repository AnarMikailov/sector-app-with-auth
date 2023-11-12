import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const sectorCollectionsRef = collection(db, "Sectors");
  const [user, setUser] = useState(null);
  const userCollectionsRef = collection(db, "users");
  const [sectors, setSectors] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [editinisValid, setEditinisValid] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
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
  //===============================================
  // Handle user authentication state changes
  //===============================================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  //===============================================
  // User login
  //===============================================

  const logIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const currentUser = userCredential.user;
      if (currentUser) {
        // Set the authenticated user in the state
        console.log(currentUser);
        setUser(currentUser);
        notifySucces();
        navigateTo("/users");
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
    }
  };

  //===============================================
  // User logout
  //===============================================
  const logOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
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

  const handleInputChange = (event) => {
    setUserInfo((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

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
        handleInputChange,
        userInfo,
        setUserInfo,
        addUser,
        userList,
        handleEditUser,
        handleDeleteUser,
        handleEditInputChange,
        isValid,
        setIsValid,
        isChecked,
        setIsChecked,
        editinisValid,
        setEditinisValid,
        notifySucces,
        notifyError,
        fecthUsers,
        username,
        setUsername,
        password,
        setPassword,
        logIn,
        logOut,
        user,
      }}
    >
      {children}
    </SectorContext.Provider>
  );
};

export const useSectorContext = () => useContext(SectorContext);
