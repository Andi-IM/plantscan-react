import {Col, Image, Modal, Row} from "antd";

const ModalDetailImgSuggestion = ({open, setOpen, objDetailImg}) => {
    return (
        <Modal open={open} onCancel={() => setOpen(false)} title="Deskripsi Foto">
            <Row gutter={16} align="middle">
                <Col span={12}>
                    <Image src={objDetailImg?.url}/>
                </Col>
            </Row>
        </Modal>
    );
};
export default ModalDetailImgSuggestion;
