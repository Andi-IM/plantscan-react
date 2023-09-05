import { message } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const getDocPS = async ({ collectionName, id }) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap?.exists()) {
    return docSnap?.data();
  }
  return message.error({
    content: "No Data",
  });
};
export default getDocPS;
