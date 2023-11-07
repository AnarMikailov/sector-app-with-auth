import React, { useEffect, useState } from "react";
import { useSectorContext } from "./context/SectorsContext";
// import { db } from "./utils/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { mockData } from "./data/mockdata";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import { Route, Routes } from "react-router-dom";
function App() {
  const { getSectors } = useSectorContext();
  // const [sectors, setSectors] = useState([]);
  // const sectorCollectionsRef = collection(db, "Sectors");
  useEffect(() => {
    // const getSectors = async () => {
    //   // const data = await getDocs(sectorCollectionsRef);
    //   // const fetchedSectros = [
    //   //   ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    //   // ];
    //   // setSectors(fetchedSectros[0].sectors);
    //   // console.log(fetchedSectros[0].sectors);
    //   // console.log(mockData);
    //   // console.log(sectors);
    //   // setSectors(mockData);
    //   // console.log(
    //   //   sectors.headings.map((heading) => console.log(heading.sector_name))
    //   // );
    //   // console.log(sectors)
    // };
    getSectors();
  }, []);
  // console.log(sectors[1].headings);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
