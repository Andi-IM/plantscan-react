import { Button, Col, Row, Typography, Table, Spin, Image } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatSecondsToDate from "../../helpers/formatSecondsToDate";
import getDocsPS from "../../helpers/getDocsPS";

const { Column } = Table;
const PlantLists = () => {
  const [arrDatas, setArrDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getDataPlant = async () => {
    setLoading(true);
    getDocsPS({
      collectionName: "plants",
    })
      ?.then((data) => {
        setArrDatas(data);
      })
      ?.finally(() => {
        setLoading(false);
      });
  };

  const goToDetail = (id) => {
    navigate(`detail_plant/${id}`);
  };

  useEffect(() => {
    getDataPlant();
  }, []);

  return (
    <Fragment>
      <Row justify="space-between">
        <Col span={12}>
          <Typography.Title>Data Bunga Didukung</Typography.Title>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              navigate("add_plant");
            }}
          >
            Tambah Bunga
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Spin spinning={loading}>
            <Table dataSource={arrDatas} tableLayout="fixed">
              <Column
                title="Thumbnail"
                render={(record) => {
                  return <Image src={record?.images?.[0]?.url} width={150} />;
                }}
              />
              <Column dataIndex="name" title="Name" />
              <Column dataIndex="ID" title="ID" />
              <Column
                dataIndex="Updated"
                title="Updated"
                render={(date) => formatSecondsToDate(date?.seconds)}
              />
              <Column
                title="Action"
                render={(render) => {
                  return (
                    <Button
                      type="primary"
                      onClick={() => goToDetail(render?.id)}
                    >
                      Detail
                    </Button>
                  );
                }}
              />
            </Table>
          </Spin>
        </Col>
      </Row>
    </Fragment>
  );
};
export default PlantLists;
