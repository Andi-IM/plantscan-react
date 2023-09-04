import { Form, Input } from "antd";
import { Fragment } from "react";

const PlantsRightForm = () => {
  return (
    <Fragment>
      <Form.Item
        rules={[{ required: true }]}
        label="Genus"
        name="genus"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        label="Class"
        name="class"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        label="Family"
        name="family"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        label="Order"
        name="order"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        label="Phylum"
        name="phylum"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
    </Fragment>
  );
};
export default PlantsRightForm;
