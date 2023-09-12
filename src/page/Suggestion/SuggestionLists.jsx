import {
  Button,
  Col,
  Row,
  Typography,
  Table,
  Spin,
  Image,
  Modal,
  message,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteDataPS from "../../helpers/deleteDataPS";
import formatSecondsToDate from "../../helpers/formatSecondsToDate";
import getDocsPS from "../../helpers/getDocsPS";

const { Column } = Table;
const SuggestionLists = () => {
  const [arrDatas, setArrDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getDataPlant = async () => {
    setLoading(true);
    getDocsPS({
      collectionName: "suggestions",
    })
      ?.then((data) => {
        setArrDatas(data);
      })
      ?.finally(() => {
        setLoading(false);
      });
  };

  const goToDetail = (id) => {
    navigate(`detail_suggestion/${id}`);
  };

  const solveHandler = (id) => {
    Modal.confirm({
      content: "Are you sure ?",
      onOk: () => {
        deleteDataPS({
          collectionName: "suggestions",
          docId: id,
          succesCb: () => {
            message.success({
              content: "Success solve",
            });
            getDataPlant();
          },
        });
      },
    });
  };

  useEffect(() => {
    getDataPlant();
  }, []);

  return (
    <Fragment>
      <Row justify="space-between">
        <Col span={12}>
          <Typography.Title>Suggestion</Typography.Title>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={24}>
          <Spin spinning={loading}>
            <Table dataSource={arrDatas} tableLayout="fixed">
              <Column
                title="Thumbnail"
                render={(record) => {
                  return <Image src={record?.images?.[0]?.url} width={150} />;
                }}
              />
              <Column dataIndex="id" title="id" />
              <Column dataIndex="description" title="Description" />
              <Column
                dataIndex="date"
                title="Updated"
                render={(date) => formatSecondsToDate(date?.seconds)}
              />
              <Column
                title="Action"
                render={(render) => {
                  return (
                    <Row justify="space-between" gutter={8}>
                      <Col span={12}>
                        <Button
                          type="primary"
                          onClick={() => goToDetail(render?.id)}
                        >
                          Detail
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button onClick={() => solveHandler(render?.id)}>
                          Solve
                        </Button>
                      </Col>
                    </Row>
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
export default SuggestionLists;
