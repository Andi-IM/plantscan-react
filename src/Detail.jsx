import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./firebase";

const Detail = () => {
  const { id } = useParams();
  const [stateDetail, setStateDetail] = useState({
    name: "",
  });

  const [inputState, setInputState] = useState("");

  const navigate = useNavigate();

  const getDetail = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap?.exists) {
      setStateDetail((prev) => ({
        ...prev,
        name: docSnap?.data()?.name,
      }));
      setInputState(docSnap?.data()?.name);
    } else {
      alert("data g ada");
    }
  };

  const updateData = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, {
        name: inputState,
      });

      navigate("/");
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  useEffect(() => {
    getDetail(id);
  }, []);

  return (
    <Fragment>
      <button onClick={() => navigate("/")}>back</button>
      name:{stateDetail?.name}
      <form>
        <label>
          name
          <input
            type="text"
            defaultValue={inputState}
            value={inputState}
            onChange={({ target: { value } }) => {
              setInputState(value);
            }}
          />
        </label>

        <input
          type="button"
          value="Submit"
          onClick={() => {
            updateData(id);
          }}
        />
      </form>
    </Fragment>
  );
};
export default Detail;
