import { CloseCircleFilled } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons/lib/icons";
import {
  Badge,
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import ModalEditPhoto from "../../components/Plants/ModalEditPhoto";
import PlantsLeftForm from "../../components/Plants/PlantsLeftForm";
import PlantsRightForm from "../../components/Plants/PlantsRightForm";
import PlantsFormContext from "../../context/PlantsFormContext";

const AddPlants = () => {
  const [FormInstance] = Form.useForm();

  const [imageData, setImageData] = useState([]);
  const [openModalImg, setOpenModalImg] = useState(false);

  const [objDetailImg, setObjDetailImg] = useState({
    url: "",
    desc: "",
    attribusi: "",
  });

  const deleteImgHandler = (id) => {
    Modal.confirm({
      content: "Apakah yakin untuk hapus ?",
      onOk: () => {
        setImageData(imageData?.filter((data) => data?.id !== id));
      },
      okText: "Hapus",
      okButtonProps: {
        danger: true,
      },
    });
  };

  return (
    <div style={{ background: "white", padding: 20, borderRadius: 10 }}>
      <PlantsFormContext.Provider
        value={{
          imageData,
          setImageData,
          openModalImg,
          setOpenModalImg,
          objDetailImg,
          setObjDetailImg,
        }}
      >
        <Row>
          <Col span={24}>
            <Typography.Title>Tambah Plant</Typography.Title>
          </Col>
        </Row>

        <Form
          initialValues={{
            otherName: [""],
          }}
          form={FormInstance}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <PlantsLeftForm />
            </Col>
            <Col span={12}>
              <PlantsRightForm />
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button type="primary">Update</Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Space size="large" wrap>
                {imageData?.map((dataPreview, idx) => (
                  <Tooltip
                    title={
                      dataPreview?.desc || "Klik untuk menambahkan informasi"
                    }
                    key={idx}
                  >
                    <Badge
                      count={
                        <Button
                          icon={
                            <CloseCircleOutlined
                              style={{ cursor: "pointer", fontSize: 28 }}
                            />
                          }
                          shape="circle"
                          danger
                          onClick={() => deleteImgHandler(dataPreview?.id)}
                          style={{ background: "transparent", border: 0 }}
                        />
                      }
                    >
                      <Image
                        style={{ cursor: "pointer" }}
                        src={dataPreview?.url}
                        width={100}
                        height={100}
                        preview={false}
                        onClick={() => {
                          setObjDetailImg({
                            ...dataPreview,
                          });
                          setOpenModalImg(true);
                        }}
                      />
                    </Badge>
                  </Tooltip>
                ))}
              </Space>
            </Col>
          </Row>
        </Form>

        <ModalEditPhoto />
      </PlantsFormContext.Provider>
    </div>
  );
};
export default AddPlants;
