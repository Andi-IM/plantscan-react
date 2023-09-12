import { Button, Layout, Menu, message, Modal } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCheckLogin from "../hooks/useCheckLogin";

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const { pathname } = useLocation();
  const { isLogin } = useCheckLogin();

  const navigate = useNavigate();
  const auth = getAuth();
  const [loadingLogout, setLoadingLogout] = useState(false);

  const logOutHandler = () => {
    setLoadingLogout(true);
    Modal.confirm({
      content: "Are you sure to logout ?",
      onOk: () => {
        signOut(auth)
          ?.then(() => {
            localStorage?.removeItem("LOGIN_DATA");
          })
          ?.catch((error) => {
            message?.error({
              content: JSON.stringify(error),
            });
          })
          ?.finally(() => {
            setLoadingLogout(false);
          });
      },
      onCancel: () => {
        setLoadingLogout(false);
      },
      okButtonProps: {
        danger: true,
      },
      okText: "Logout",
    });
  };

  const SidebarList = [
    {
      key: "dashboard",
      label: "Dashboard",
    },
    {
      key: "plant_lists",
      label: "Plant Lists",
    },
    {
      key: "suggestion_lists",
      label: "Suggestion",
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Layout
          style={{
            padding: "24px 0",
          }}
        >
          {isLogin && (
            <Sider width={200}>
              <Menu
                mode="inline"
                selectedKeys={[`${pathname?.split("/")?.[1]}`]}
                style={{
                  height: "100%",
                }}
                onClick={({ key }) => {
                  navigate(key);
                }}
                items={SidebarList}
              />
              <Button
                block
                loading={loadingLogout}
                disabled={loadingLogout}
                danger
                onClick={() => logOutHandler()}
              >
                Logout
              </Button>
            </Sider>
          )}
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Sidebar;
