import {ArrowLeftOutlined, CloseCircleOutlined,} from "@ant-design/icons/lib/icons";
import {Badge, Button, Col, Form, Image, Modal, Row, Space, Spin, Tooltip, Typography,} from "antd";
import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import DataDetailSuggestion from "../../components/Suggestion/DataDetailSuggestion";
import ModalDetailImgSuggestion from "../../components/Suggestion/ModalDetailImgSuggestion";
import getDocPS from "../../helpers/getDocPS";
import getUserById from "../../helpers/getUserById.js";

const SuggestionDetail = ({type}) => {
    const [FormInstance] = Form.useForm();
    const {id} = useParams();
    const navigate = useNavigate();

    const [imageData, setImageData] = useState([]);
    const [userData, setUserData] = useState(null)
    const [openModalImg, setOpenModalImg] = useState(false);
    const [objDetailImg, setObjDetailImg] = useState({
        url: "",
        desc: "",
        attribution: "",
    });
    const [loading, setLoading] = useState(false);

    const [objDetailSuggest, setObjDetailSuggest] = useState({});

    const deleteImgHandler = (id) => {
        Modal.confirm({
            content: "Apakah yakin untuk hapus ?",
            onOk: () => {
                setImageData(imageData?.filter((data) => data?.id !== id));
            },
            okText: "Hapus",
            okButtonProps: {
                danger: true,
            },
        });
    };

    const getDetailSuggestions = () => {
        setLoading(true);
        getDocPS({
            collectionName: "suggestions",
            id,
        })
            ?.then((objData) => {
                setObjDetailSuggest(objData);
                getUser(objData?.userId)
                setImageData(objData?.images);
            })
            ?.finally(() => {
                setLoading(false);
            });
    };

    const getUser = (id) => {
        if (id !== null) {
            getUserById(id)
                .then(result => {
                    setUserData(result)
                });
        }
    }

    useEffect(() => {
        getDetailSuggestions();
    }, []);

    return (
        <Spin spinning={loading}>
            <div style={{background: "white", padding: 20, borderRadius: 10}}>
                <Row align="middle">
                    <Col span={2}>
                        <Button
                            shape="circle"
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => {
                                navigate("/suggestion_lists");
                            }}
                        />
                    </Col>

                    <Col span={22}>
                        <Typography.Title>Detail Suggestion</Typography.Title>
                    </Col>
                </Row>

                <Form
                    initialValues={{
                        ...(type === "add" && {
                            common_name: [""],
                        }),
                    }}
                    form={FormInstance}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <DataDetailSuggestion
                                label="User"
                                value={objDetailSuggest?.userId || "-"}
                            />
                            <DataDetailSuggestion
                                label="email"
                                value={userData?.data.email || "-"}
                            />
                            <DataDetailSuggestion
                                label="Description"
                                value={objDetailSuggest?.description || "-"}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Space size="large" wrap>
                                <DataDetailSuggestion
                                    label="Images"
                                    render={() => {
                                        if (imageData?.length) {
                                            return (
                                                <>
                                                    {imageData?.map((dataPreview, idx) => (
                                                        <Tooltip
                                                            title={dataPreview?.desc || "Tidak ada informasi"}
                                                            key={idx}>
                                                            <Badge
                                                                count={
                                                                    <Button
                                                                        icon={
                                                                            <CloseCircleOutlined
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                    fontSize: 28,
                                                                                }}
                                                                            />
                                                                        }
                                                                        shape="circle"
                                                                        danger
                                                                        onClick={() =>
                                                                            deleteImgHandler(dataPreview?.id)
                                                                        }
                                                                        style={{
                                                                            background: "transparent",
                                                                            border: 0,
                                                                        }}
                                                                    />
                                                                }>
                                                                <Image
                                                                    style={{cursor: "pointer"}}
                                                                    src={dataPreview?.url}
                                                                    width={100}
                                                                    height={100}
                                                                    preview={false}
                                                                    onClick={() => {
                                                                        setObjDetailImg({
                                                                            ...dataPreview,
                                                                        });
                                                                        setOpenModalImg(true);
                                                                    }}
                                                                />
                                                            </Badge>
                                                        </Tooltip>
                                                    ))}
                                                </>
                                            );
                                        }
                                        return <Typography.Text>No Images</Typography.Text>;
                                    }}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </div>

            <ModalDetailImgSuggestion
                open={openModalImg}
                setOpen={setOpenModalImg}
                objDetailImg={objDetailImg}
            />
        </Spin>
    );
};
export default SuggestionDetail;
