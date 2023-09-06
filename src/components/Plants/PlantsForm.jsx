import { CloseCircleOutlined } from "@ant-design/icons/lib/icons";
import {
  Badge,
  Button,
  Col,
  Form,
  Image,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlantsFormContext from "../../context/PlantsFormContext";
import addDataPS from "../../helpers/addDataPS";
import deleteDataPS from "../../helpers/deleteDataPS";
import getDocPS from "../../helpers/getDocPS";
import updateDataPS from "../../helpers/updateDataPS";
import ModalEditPhoto from "./ModalEditPhoto";
import PlantsLeftForm from "./PlantsLeftForm";
import PlantsRightForm from "./PlantsRightForm";

const PlantsForm = ({ type }) => {
  const [FormInstance] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // add
  const [imageData, setImageData] = useState([]);
  const [openModalImg, setOpenModalImg] = useState(false);
  const [objDetailImg, setObjDetailImg] = useState({
    url: "",
    desc: "",
    attribution: "",
  });
  const [loading, setLoading] = useState(false);

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

  const getDetailPlants = () => {
    setLoading(true);
    getDocPS({
      collectionName: "plants",
      id,
    })
      ?.then((objData) => {
        setImageData(objData?.images);
        delete objData["images"];
        FormInstance?.setFieldsValue(objData);
        FormInstance.setFieldsValue({
          genus: objData?.taxonomy?.genus,
          class: objData?.taxonomy?.class,
          family: objData?.taxonomy?.family,
          order: objData?.taxonomy?.order,
          phylum: objData?.taxonomy?.phylum,
        });
      })
      ?.finally(() => {
        setLoading(false);
      });
  };
  const addDataHandler = (formData) => {
    addDataPS({
      collectionName: "plants",
      formData,
      successCb: () => {
        message.success({
          content: "Sukses menambahkan data",
          onClose: () => {
            navigate("/plant_lists");
          },
          duration: 0.5,
        });
      },
    })?.catch((e) => {
      message.error({
        content: JSON.stringify(e),
      });
      setLoading(false);
    });
  };
  const updateDataHandler = (formData) => {
    updateDataPS({
      collectionName: "plants",
      formData,
      id,
      successCb: () => {
        message.success({
          content: "Sukses menambahkan data",
          onClose: () => {
            navigate("/plant_lists");
          },
          duration: 0.5,
        });
      },
    })?.catch((e) => {
      message.error({
        content: JSON.stringify(e),
      });
      setLoading(false);
    });
  };

  const submitHandler = () => {
    setLoading(true);
    const formData = {
      ...FormInstance?.getFieldsValue(),
      common_name: FormInstance?.getFieldValue("common_name")?.map((data) => ({
        name: data?.name,
      })),
      images: imageData,
      Updated: Timestamp.now(),
      taxonomy: {
        class: FormInstance?.getFieldValue("class"),
        family: FormInstance?.getFieldValue("family"),
        genus: FormInstance?.getFieldValue("genus"),
        order: FormInstance?.getFieldValue("order"),
        phylum: FormInstance?.getFieldValue("phylum"),
      },
      thumbnail: imageData?.[0]?.url,
    };

    const arrExcludeKey = ["class", "family", "genus", "order", "phylum"];
    arrExcludeKey?.forEach((key) => {
      delete formData[key];
    });

    if (type === "add") {
      addDataHandler(formData);
    } else {
      updateDataHandler(formData);
    }
  };

  const deleteHandler = () => {
    Modal.confirm({
      content: "Apakah yakin untuk hapus data ini ?",
      okText: "Hapus",
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        setLoading(true);

        deleteDataPS({
          collectionName: "plants",
          docId: id,
          succesCb: () => {
            message.success({
              content: "Sukses menghapus data",
              onClose: () => {
                navigate("/plant_lists");
              },
              duration: 0.5,
            });
          },
        })?.catch((e) => {
          message.error({
            content: JSON.stringify(e),
          });
          setLoading(false);
        });
      },
    });
  };

  useEffect(() => {
    if (type === "edit") {
      getDetailPlants();
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <div style={{ background: "white", padding: 20, borderRadius: 10 }}>
        <PlantsFormContext.Provider
          value={{
            imageData,
            setImageData,
            openModalImg,
            setOpenModalImg,
            objDetailImg,
            setObjDetailImg,
            FormInstance,
            loading,
            setLoading,
          }}
        >
          <Row>
            <Col span={24}>
              <Typography.Title>
                {type === "add" ? "Tambah Plant" : "Edit Plant"}
              </Typography.Title>
            </Col>
          </Row>

          <Form
            initialValues={{
              ...(type === "add" && {
                common_name: [""],
              }),
            }}
            form={FormInstance}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <PlantsLeftForm />
              </Col>
              <Col span={12}>
                <PlantsRightForm />
                <Row gutter={[16, 16]}>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Button
                      loading={loading}
                      type="primary"
                      onClick={() => {
                        FormInstance?.validateFields()?.then(() => {
                          submitHandler();
                        });
                      }}
                    >
                      {type === "add" ? "Add" : "Update"}
                    </Button>
                  </Col>
                  {type === "edit" && (
                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button
                        loading={loading}
                        type="primary"
                        danger
                        onClick={() => {
                          deleteHandler();
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  )}
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
    </Spin>
  );
};
export default PlantsForm;
