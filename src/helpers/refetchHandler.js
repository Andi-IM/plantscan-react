import { getDocs } from "firebase/firestore";

const refetchHandler = async ({ collections, tempArrDatas }) => {
  const getSnapshots = await getDocs(collections);

  getSnapshots?.forEach((data) => {
    tempArrDatas?.push({
      id: data?.id,
      ...data?.data(),
    });
  });

  return tempArrDatas;
};

export default refetchHandler;
