import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { Card } from "antd";
export default function UnAuthenticatedApp() {
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegisterPage ? <Register /> : <Login />}{" "}
        <button onClick={() => setIsRegisterPage(!isRegisterPage)}>
          切换到 {isRegisterPage ? "登陆" : "注册"}
        </button>
      </Card>
    </div>
  );
}
