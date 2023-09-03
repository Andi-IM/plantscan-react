import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const SidebarList = [
    {
      key: "dashboard",
      label: "Dashboard",
    },
    {
      key: "plant_lists",
      label: "Plant Lists",
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
          </Sider>
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
