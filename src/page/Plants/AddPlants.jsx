import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { Fragment, useState } from "react";
import getBase64 from "../../helpers/getBase64";

const AddPlants = () => {
  const [imageData, setImageData] = useState([]);
  const [openModalImg, setOpenModalImg] = useState(false);

  const [objDetailImg, setObjDetailImg] = useState({
    url: "",
    desc: "",
    attribusi: "",
  });

  const [FormInstance] = Form.useForm();

  return (
    <Fragment>
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
        <Row>
          <Col span={12}>
            <Typography.Text strong>Plant Details</Typography.Text>
            <Form.Item
              name="plantName"
              label="Plant Name"
              labelCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
            <Form.Item name="spesies" label="Spesies" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Typography.Text>Other Name</Typography.Text>
              </Col>
              <Col>
                <Form.List name="otherName">
                  {(fields, { add, remove }) => {
                    return (
                      <Fragment>
                        {fields?.map((field) => {
                          return (
                            <Row key={field?.name} gutter={[16, 16]}>
                              <Col>
                                <Form.Item>
                                  <Input name={[field?.name, "name"]} />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Button onClick={add}>Tambah</Button>
                              </Col>
                              {fields?.length > 1 ? (
                                <Col>
                                  <Button onClick={() => remove(field?.name)}>
                                    Remove
                                  </Button>
                                </Col>
                              ) : (
                                <Fragment />
                              )}
                            </Row>
                          );
                        })}
                      </Fragment>
                    );
                  }}
                </Form.List>
              </Col>
            </Row>

            <Form.Item name="desc" label="Description" labelCol={{ span: 24 }}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Upload
                beforeUpload={async (file) => {
                  if (imageData?.length >= 5) {
                    message.error("Sudah ada batas");
                  } else {
                    const previewTemp = await getBase64(file);

                    setImageData([
                      ...imageData,
                      {
                        url: previewTemp,
                        desc: "",
                        attribusi: "",
                      },
                    ]);
                  }
                  return false;
                }}
                accept="image/*"
              >
                <Button block>Upload Image</Button>
              </Upload>
            </Form.Item>
            <Space size="large">
              {imageData?.map((dataPreview, idx) => (
                <Tooltip title="Tes" key={idx}>
                  <Image
                    style={{ cursor: "pointer" }}
                    src={dataPreview?.url}
                    width={300}
                    height={300}
                    preview={false}
                    onClick={() => {
                      setObjDetailImg({
                        url: dataPreview?.url,
                        desc: dataPreview?.desc,
                        attribusi: dataPreview?.attribusi,
                      });
                      setOpenModalImg(true);
                    }}
                  />
                </Tooltip>
              ))}
            </Space>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Form>

      <Modal
        open={openModalImg}
        title="Deskripsi Foto"
        onCancel={() => setOpenModalImg(false)}
      >
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Image src={objDetailImg?.url} />
            </Col>
            <Col span={12}>
              <Form.Item
                name="desc"
                labelCol={{ span: 24 }}
                label="Description"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="attribusi"
                labelCol={{ span: 24 }}
                label="Attribusi"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default AddPlants;
