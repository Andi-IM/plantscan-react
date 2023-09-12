import { Col, Image, Modal, Row } from "antd";
import DataDetailSuggestion from "./DataDetailSuggestion";

const ModalDetailImgSuggestion = ({ open, setOpen, objDetailImg }) => {
  return (
    <Modal open={open} onCancel={() => setOpen(false)} title="Deskripsi Foto">
      <Row gutter={16} align="middle">
        <Col span={12}>
          <Image />
        </Col>
        <Col span={12}>
          <DataDetailSuggestion
            label="Description"
            value={objDetailImg?.description}
          />
          <DataDetailSuggestion
            label="Attribution"
            value={objDetailImg?.attribution}
          />
        </Col>
      </Row>
    </Modal>
  );
};
export default ModalDetailImgSuggestion;
