import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateDataPS = async ({ collectionName, id, formData, successCb }) => {
  const docRef = doc(db, collectionName, id);
  updateDoc(docRef, formData)
    ?.then(() => {
      if (successCb) {
        successCb();
      } else {
        alert("masukkan succesCb");
      }
    })
    ?.catch((e) => {
      return e;
    });
};
export default updateDataPS;
