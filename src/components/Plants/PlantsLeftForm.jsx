import {
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons/lib/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Typography,
  Upload,
} from "antd";
import { Fragment } from "react";
import { usePlantsFormContext } from "../../context/PlantsFormContext";
import getBase64 from "../../helpers/getBase64";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

const PlantsLeftForm = () => {
  const { imageData, setImageData, FormInstance } = usePlantsFormContext();

  const beforeUploadHandler = async (file) => {
    if (file?.type?.includes("image")) {
      FormInstance?.validateFields(["name"])?.then(async () => {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `/orchids/${FormInstance?.getFieldValue("name")}/${file?.name}`
        );

        if (imageData?.length >= 5) {
          message.error("Sudah ada batas");
        } else {
          const previewTemp = await getBase64(file);
          uploadString(storageRef, previewTemp, "data_url")
            .then((snapshot) => {
              getDownloadURL(snapshot.ref).then((downloadURL) => {
                setImageData([
                  ...imageData,
                  {
                    id: Date.now(),
                    url: downloadURL,
                    desc: "",
                    attribution: "",
                  },
                ]);
              });
            })
            ?.catch((e) =>
              message.error({
                content: JSON.stringify(e),
              })
            );
        }
      });
    } else {
      message.error({
        content: "Please upload image file",
      });
    }
    return false;
  };
  return (
    <>
      <Form.Item
        rules={[{ required: true }]}
        name="name"
        label="Plant Name"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="spesies"
        label="Spesies"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Text>Other Name</Typography.Text>
        </Col>
        <Col span={24}>
          <Form.List name="common_name">
            {(fields, { add, remove }) => {
              return (
                <Fragment>
                  {fields?.map((field) => {
                    return (
                      <Row key={field?.name} gutter={[16, 16]}>
                        <Col>
                          <Form.Item name={[field?.name, "name"]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        {field?.name !== 1 && (
                          <Col>
                            <Button
                              onClick={add}
                              icon={<PlusCircleOutlined />}
                              type="primary"
                            />
                          </Col>
                        )}
                        {fields?.length > 1 ? (
                          <Col>
                            <Button
                              onClick={() => remove(field?.name)}
                              icon={<MinusCircleOutlined />}
                            />
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

      <Form.Item name="description" label="Description" labelCol={{ span: 24 }}>
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item name="images">
        <Upload
          rules={[{ required: true }]}
          showUploadList={false}
          beforeUpload={beforeUploadHandler}
          accept="image/*"
        >
          <Button block>Upload Image</Button>
        </Upload>
      </Form.Item>
    </>
  );
};
export default PlantsLeftForm;
