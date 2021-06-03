import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { Card, Divider, Button, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "../assets/images/logo.svg";
import left from "../assets/images/left.svg";
import right from "../assets/images/right.svg";

export default function UnAuthenticatedApp() {
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Background />
      <Header />
      <Button
        onClick={() => {
          throw new Error("点击抛出一个异常");
        }}
      >
        抛出异常
      </Button>
      <ShadowCard>
        <Title>{isRegisterPage ? "注册" : "登录"}</Title>
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}

        {isRegisterPage ? (
          <Register onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <Divider />
        <Button
          type="link"
          onClick={() => {
            setIsRegisterPage(!isRegisterPage);
            setError(null);
          }}
        >
          {isRegisterPage ? "已经有账号了？直接登陆" : "没有账号，注册账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
}

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  /* align-items: center; */
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0%.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  text-align: center;
`;
