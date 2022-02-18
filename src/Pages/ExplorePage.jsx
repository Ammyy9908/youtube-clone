import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

function ExplorePage() {
  const [dark, setDark] = React.useState(false);
  return (
    <div className="explore-page">
      <Header setDark={setDark} dark={dark} />
      <div
        className={`ripple ${dark ? "ripple_enable" : "ripple_disable"}`}
      ></div>

      <div className="layout">
        <Sidebar />
      </div>
    </div>
  );
}

export default ExplorePage;
