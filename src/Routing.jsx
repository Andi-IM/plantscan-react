import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import Detail from "./Detail";
import PlantLists from "./page/Plants/PlantLists";
import AddPlants from "./page/Plants/AddPlants";
import EditPlants from "./page/Plants/EditPlants";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/detail/:id" element={<Detail />} />

      <Route path="/plant_lists" element={<PlantLists />} />
      <Route path="/plant_lists/add_plant" element={<AddPlants />} />
      <Route path="/plant_lists/detail_plant/:id" element={<EditPlants />} />

      {/* <Route path="/login" /> */}
    </Routes>
  );
};
export default Routing;
