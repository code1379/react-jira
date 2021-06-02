import { memo } from "react";
import styled from "@emotion/styled";
import headerLogo from "../../assets/images/software-logo.svg";
import { useAuth } from "context/auth-context";

export default memo(function PageHeader() {
  const { user } = useAuth();
  console.log(user);
  return (
    <HeaderWrapper>
      <div className="left">
        <div className="logo"></div>
        <div className="item">项目</div>
        <div className="item">用户</div>
      </div>
      <a className="right">Hi, {user?.name}</a>
    </HeaderWrapper>
  );
});

const HeaderWrapper = styled.div`
  display: flex;
  height: 6rem;
  box-shadow: 0px 0px 0.3rem rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  padding: 0 5rem;
  .left {
    display: flex;
    align-items: center;
    .logo {
      background-image: url(${headerLogo});
      background-size: cover;
      background-repeat: no-repeat;
      width: 16rem;
      height: 2.5rem;
    }
    .item {
      margin-left: 2rem;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
`;
