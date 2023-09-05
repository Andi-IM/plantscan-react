import { Button, Col, Form, Image, Input, Modal, Row } from "antd";
import { usePlantsFormContext } from "../../context/PlantsFormContext";

const ModalEditPhoto = () => {
  const {
    openModalImg,
    setOpenModalImg,
    objDetailImg,
    imageData,
    setImageData,
  } = usePlantsFormContext();

  const [FormEditPhotoInfo] = Form.useForm();

  const editHandler = () => {
    setImageData(
      imageData?.map((data) => {
        if (data?.id === objDetailImg?.id) {
          return {
            ...data,
            ...FormEditPhotoInfo?.getFieldsValue(),
          };
        }
        return data;
      })
    );
    setOpenModalImg(false);
  };

  return (
    <Modal
      open={openModalImg}
      title="Deskripsi Foto"
      onCancel={() => setOpenModalImg(false)}
      footer={false}
    >
      <Form form={FormEditPhotoInfo}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Image src={objDetailImg?.url} />
          </Col>
          <Col span={12}>
            <Form.Item
              name="description"
              labelCol={{ span: 24 }}
              label="Description"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="attribution"
              labelCol={{ span: 24 }}
              label="Attribution"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type="primary" onClick={() => editHandler()}>
              Edit Informasi Photo
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default ModalEditPhoto;
