import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
export default function UnAuthenticatedApp() {
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  return (
    <div>
      {isRegisterPage ? <Register /> : <Login />}
      <button onClick={() => setIsRegisterPage(!isRegisterPage)}>
        切换到 {isRegisterPage ? "登陆" : "注册"}
      </button>
    </div>
  );
}
