import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons/lib/icons";
import {
  Badge,
  Button,
  Col,
  Form,
  Image,
  Modal,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataDetailSuggestion from "../../components/Suggestion/DataDetailSuggestion";
import ModalDetailImgSuggestion from "../../components/Suggestion/ModalDetailImgSuggestion";
import getDocPS from "../../helpers/getDocPS";

const SuggestionDetail = ({ type }) => {
  const [FormInstance] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageData, setImageData] = useState([]);
  const [openModalImg, setOpenModalImg] = useState(false);
  const [objDetailImg, setObjDetailImg] = useState({
    url: "",
    desc: "",
    attribution: "",
  });
  const [loading, setLoading] = useState(false);

  const [objDetailSuggest, setObjDetailSuggest] = useState({});

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

  const getDetailSuggestions = () => {
    setLoading(true);
    getDocPS({
      collectionName: "suggestions",
      id,
    })
      ?.then((objData) => {
        setObjDetailSuggest(objData);
        setImageData(objData?.images);
      })
      ?.finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDetailSuggestions();
  }, []);

  return (
    <Spin spinning={loading}>
      <div style={{ background: "white", padding: 20, borderRadius: 10 }}>
        <Row align="middle">
          <Col span={2}>
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                navigate("/suggestion_lists");
              }}
            />
          </Col>

          <Col span={22}>
            <Typography.Title>Detail Suggestion</Typography.Title>
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
              <DataDetailSuggestion
                label="Plant Name"
                value={objDetailSuggest?.name || "-"}
              />
              <DataDetailSuggestion
                label="Species"
                value={objDetailSuggest?.species || "-"}
              />
              <DataDetailSuggestion
                label="Other Name"
                render={() => {
                  if (objDetailSuggest?.common_name?.length) {
                    return (
                      <ul>
                        {objDetailSuggest?.common_name?.map((cmnName, key) => (
                          <li key={key}>{cmnName?.name}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <Typography.Text>No Other Name</Typography.Text>;
                }}
              />
              <DataDetailSuggestion
                label="Description"
                value={objDetailSuggest?.description}
              />
            </Col>
            <Col span={12}>
              <DataDetailSuggestion
                label="Genus"
                value={objDetailSuggest?.taxonomy?.genus || "-"}
              />
              <DataDetailSuggestion
                label="Class"
                value={objDetailSuggest?.taxonomy?.class || "-"}
              />
              <DataDetailSuggestion
                label="Family"
                value={objDetailSuggest?.taxonomy?.family || "-"}
              />
              <DataDetailSuggestion
                label="Order"
                value={objDetailSuggest?.taxonomy?.order || "-"}
              />
              <DataDetailSuggestion
                label="Phylum"
                value={objDetailSuggest?.taxonomy?.phylum || "-"}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Space size="large" wrap>
                <DataDetailSuggestion
                  label="Images"
                  render={() => {
                    if (imageData?.length) {
                      return (
                        <>
                          {imageData?.map((dataPreview, idx) => (
                            <Tooltip
                              title={dataPreview?.desc || "Tidak ada informasi"}
                              key={idx}
                            >
                              <Badge
                                count={
                                  <Button
                                    icon={
                                      <CloseCircleOutlined
                                        style={{
                                          cursor: "pointer",
                                          fontSize: 28,
                                        }}
                                      />
                                    }
                                    shape="circle"
                                    danger
                                    onClick={() =>
                                      deleteImgHandler(dataPreview?.id)
                                    }
                                    style={{
                                      background: "transparent",
                                      border: 0,
                                    }}
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
                        </>
                      );
                    }
                    return <Typography.Text>No Images</Typography.Text>;
                  }}
                />
              </Space>
            </Col>
          </Row>
        </Form>
      </div>

      <ModalDetailImgSuggestion
        open={openModalImg}
        setOpen={setOpenModalImg}
        objDetailImg={objDetailImg}
      />
    </Spin>
  );
};
export default SuggestionDetail;
