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

const PlantsLeftForm = () => {
  const { imageData, setImageData } = usePlantsFormContext();

  return (
    <>
      <Form.Item
        rules={[{ required: true }]}
        name="plantName"
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

      <Form.Item name="desc" label="Description" labelCol={{ span: 24 }}>
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item>
        <Upload
          rules={[{ required: true }]}
          showUploadList={false}
          beforeUpload={async (file) => {
            if (imageData?.length >= 5) {
              message.error("Sudah ada batas");
            } else {
              const previewTemp = await getBase64(file);

              setImageData([
                ...imageData,
                {
                  id: Date.now(),
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
    </>
  );
};
export default PlantsLeftForm;
