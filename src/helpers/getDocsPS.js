import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const getDocsPS = async ({ collectionName }) => {
  const collections = collection(db, collectionName);

  try {
    const arrSnapshots = await getDocs(collections);
    const arrDatas = [];
    arrSnapshots?.forEach((data) => {
      arrDatas?.push({
        id: data?.id,
        ...data?.data(),
      });
    });

    return arrDatas;
  } catch (e) {
    return e;
  }
};
export default getDocsPS;
