import { Card, Col, Row, Typography } from "antd";

const CardData = ({ count, cardName }) => {
  return (
    <Card style={{ width: 400 }}>
      <Row align="middle" gutter={8} justify="space-between">
        <Col>Icon</Col>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 24 }} strong>
              {count}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 24 }} strong>
              {cardName}
            </Typography.Text>
          </Col>
        </Row>
      </Row>
    </Card>
  );
};

export default CardData;
