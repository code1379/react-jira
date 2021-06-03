import { memo } from "react";
import styled from "@emotion/styled";
import logo from "../../assets/images/software-logo.svg";
import { useAuth } from "context/auth-context";
import { ReactComponent as Logo } from "../../assets/images/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { resetRoute } from "utils";
export default memo(function PageHeader() {
  const { user, logout } = useAuth();
  return (
    <HeaderWrapper>
      <div className="left">
        <Button type="link" onClick={resetRoute}>
          <Logo width={"18rem"} color={"rgb(38,132,255)"} />
        </Button>
        {/* <div className="logo"></div> */}
        <div className="item">项目</div>
        <div className="item">用户</div>
      </div>
      <div className="right">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </div>
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
      background-image: url(${logo});
      background-size: cover;
      background-repeat: no-repeat;
      width: 16rem;
      height: 2.5rem;
    }
    .item {
      min-width: 3.2rem;
      margin-left: 2rem;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
`;
