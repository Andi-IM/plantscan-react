import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import refetchHandler from "./refetchHandler";

const addDataPS = async ({ collectionName, formData, successCb }) => {
  const tempArrDatas = [];
  if (collectionName && Object.keys(formData)?.length) {
    const collections = collection(db, collectionName);

    try {
      await addDoc(collections, formData);

      if (successCb) {
        successCb();
      } else {
        alert("success");
      }

      const newArrDatas = await refetchHandler({
        collections,
        tempArrDatas,
      });

      return newArrDatas;
    } catch (e) {
      return e;
    }
  } else {
    return "Masukkan collectionName atau formData";
  }
};

export default addDataPS;
