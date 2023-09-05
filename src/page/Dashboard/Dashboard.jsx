import { useNavigate } from "react-router-dom";
import getDocsPS from "../../helpers/getDocsPS";
import addDataPS from "../../helpers/addDataPS";
import { useState, useEffect, Fragment } from "react";
import deleteDataPS from "../../helpers/deleteDataPS";
import { Card, Col, Row, Space, Spin, Table, Typography } from "antd";
import formatSecondsToDate from "../../helpers/formatSecondsToDate";
import CardData from "../../components/Dashboard/CardData";

const { Column } = Table;
function Dashboard() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    arrDatas: [],
    loading: false,
  });

  const getDataHandler = () => {
    getDocsPS({
      collectionName: "history",
    })?.then((arrDatas) => {
      setState((prev) => ({
        ...prev,
        arrDatas,
      }));
    });
  };

  // const addDataHandler = () => {
  //   addDataPS({
  //     collectionName: "admin",
  //     formData: {
  //       administrator: false,
  //       authProvider: "Email",
  //       name: "Admin",
  //     },
  //   })?.then((newData) => {
  //     setState((prev) => ({ ...prev, arrDatas: newData }));
  //   });
  // };

  // const deleteDataHandler = (id) => {
  //   deleteDataPS({
  //     collectionName: "admin",
  //     docId: id,
  //   })?.then((newData) => {
  //     setState((prev) => ({ ...prev, arrDatas: newData }));
  //   });
  // };

  useEffect(() => {
    getDataHandler();
  }, []);

  return (
    <Space direction="vertical" size="large">
      <Row>
        <Col span={24}>
          <Typography.Title>Dashboard</Typography.Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>
          <CardData cardName="Users" count={69} />
        </Col>
        <Col>
          <CardData cardName="Detections" count={state?.arrDatas?.length} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Spin spinning={state?.loading}>
            <Table dataSource={state?.arrDatas} tableLayout="fixed">
              <Column title="UID" dataIndex="UID" />
              <Column title="Acc" dataIndex="Acc" />
              <Column
                title="Date"
                dataIndex="Date"
                render={(date) => formatSecondsToDate(date?.seconds)}
              />
              <Column title="Instance" dataIndex="Instance" />
            </Table>
          </Spin>
        </Col>
      </Row>
    </Space>
  );
}

export default Dashboard;
