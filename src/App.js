import { Space } from "antd";
import "./App.css";
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import PageContent from "./Components/PageContent";
import Calculate from "./Components/Calculate/Calculate";
import Data from "./Components/Data/Data";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Space>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <Calculate />
    </div>
  );
}

export default App;
