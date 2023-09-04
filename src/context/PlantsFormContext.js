import { createContext, useContext } from "react";

const PlantsFormContext = createContext({});
export const usePlantsFormContext = () => useContext(PlantsFormContext);
export default PlantsFormContext;
