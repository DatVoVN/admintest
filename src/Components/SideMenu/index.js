import { HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Quantity from "../Home/Quantity";

function SideMenu() {
  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {}}
        items={[
          {
            label: "Home",
            icon: <HomeOutlined />,
            key: "/",
            children: [
              {
                label: "Quantity",
                key: "/quantity",
              },
            ],
          },
          {
            label: "Project",
            icon: <HomeOutlined />,
          },
          {
            label: "Calculate",
            icon: <HomeOutlined />,
            key: "/calculate",
          },
          {
            label: "Chart",
            icon: <HomeOutlined />,
            key: "/chart",
          },
          {
            label: "Calendar",
            icon: <HomeOutlined />,
            key: "/calendar",
          },
        ]}></Menu>
      <Content />
    </div>
  );
}
function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quantity" element={<Quantity />}></Route>
      </Routes>
    </div>
  );
}
export default SideMenu;
