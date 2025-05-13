import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
      {/* <NotFound /> */}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
