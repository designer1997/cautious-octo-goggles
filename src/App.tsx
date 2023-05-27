import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/global/Header/Header.components";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
