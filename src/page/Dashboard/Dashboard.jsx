import {useNavigate} from "react-router-dom";
import getDocsPS from "../../helpers/getDocsPS";
import {useEffect, useState} from "react";
import {Col, Row, Space, Spin, Table, Typography} from "antd";
import formatSecondsToDate from "../../helpers/formatSecondsToDate";
import CardData from "../../components/Dashboard/CardData";
import getUsers from "../../helpers/getUsers.js";
import formatFloatToPercent from "../../helpers/formatFloatToPercent.js";

const {Column} = Table;

function Dashboard() {
    const navigate = useNavigate();
    const [users, setUser] = useState(0)
    const [state, setState] = useState({
        arrDatas: [],
        loading: false,
    });

    const getDataHandler = () => {
        getDocsPS({
            collectionName: "detections",
        })?.then((arrDatas) => {
            setState((prev) => ({
                ...prev,
                arrDatas,
            }));
        });
    };

    const userCount = () => {
        getUsers().then(result => {
            setUser(result.data.size)
        })
    }

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
        userCount()
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
                    <CardData cardName="Users" count={users}/>
                </Col>
                <Col>
                    <CardData cardName="Detections" count={state?.arrDatas?.length}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Spin spinning={state?.loading}>
                        <Table dataSource={state?.arrDatas} tableLayout="fixed">
                            <Column title="UID" dataIndex="id"/>
                            <Column title="UserID" dataIndex="userId"/>
                            <Column
                                title="Acc"
                                dataIndex="accuracy"
                                render={(acc) => formatFloatToPercent(acc)}
                            />
                            <Column
                                title="Date"
                                dataIndex="timestamp"
                                render={(date) => formatSecondsToDate(date?.seconds)}
                            />
                            <Column title="result" dataIndex="plantRef"/>
                        </Table>
                    </Spin>
                </Col>
            </Row>
        </Space>
    );
}

export default Dashboard;
