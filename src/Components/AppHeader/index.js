import { Image, Space, Typography, Badge } from "antd";
import {
  BarsOutlined,
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
function AppHeader() {
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png"></Image>
      <Space>
        <BarsOutlined style={{ fontSize: 24 }} />
        <SearchOutlined style={{ fontSize: 24 }} />
      </Space>
      <Space>
        <Badge count={20}>
          <BellOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge>
          <SettingOutlined style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
}
export default AppHeader;
