import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import refetchHandler from "./refetchHandler";

const deleteDataPS = async ({ collectionName, docId, succesCb }) => {
  const tempArrDatas = [];
  const docRef = doc(db, collectionName, docId);
  const collections = collection(db, collectionName);

  try {
    await deleteDoc(docRef, collectionName, docId);

    if (succesCb) {
      succesCb();
    } else {
      alert("delete success");
    }

    const newArrDatas = await refetchHandler({
      collections,
      tempArrDatas,
    });

    return newArrDatas;
  } catch (e) {
    return e;
  }
};
export default deleteDataPS;
