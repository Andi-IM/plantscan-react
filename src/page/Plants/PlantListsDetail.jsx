import { doc, getDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";

const PlantListsDetail = () => {
  const { id } = useParams();

  const [objDetailPlant, setObjDetailPlant] = useState({});

  const navigate = useNavigate();

  const getDetailPlants = async () => {
    const docRef = await doc(db, "plantDetails", id);

    const dataSnap = await getDoc(docRef);
    if (dataSnap?.exists) {
      setObjDetailPlant({
        ...dataSnap?.data(),
      });
    } else {
      alert("no data");
    }
  };

  useEffect(() => {
    getDetailPlants();
  }, []);

  return (
    <Fragment>
      <button onClick={() => navigate("/plant_lists")}>Back</button>
      <h1>Detail</h1>
      <div>
        <label>
          name plant
          <input type="text" />
        </label>
      </div>
      <div>
        <label>
          name plant
          <input type="text" />
        </label>
      </div>

      <div>
        <label>
          description
          <textarea value={objDetailPlant?.description} />
        </label>
      </div>
      {/* <p>classification : {objDetailPlant?.classification}</p> */}
    </Fragment>
  );
};
export default PlantListsDetail;
