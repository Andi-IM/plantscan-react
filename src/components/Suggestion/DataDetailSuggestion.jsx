import { Col, Row, Typography } from "antd";
import { Fragment } from "react";

const DataDetailSuggestion = ({ label, value, render }) => {
  return (
    <Fragment>
      <Row gutter={[8, 8]} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Typography.Text>{label}</Typography.Text>
        </Col>
        <Col span={24}>
          {typeof render !== "undefined" ? (
            render()
          ) : (
            <Typography.Text>{value}</Typography.Text>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default DataDetailSuggestion;
