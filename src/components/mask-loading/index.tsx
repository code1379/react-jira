import styled from "@emotion/styled";
import { Spin } from "antd";
import ReactDOM from "react-dom";

export default function MaskLoading() {
  return ReactDOM.createPortal(
    <MaskWrapper>
      <Spin size="large" />
    </MaskWrapper>,
    document.getElementsByTagName("body")[0]
  );
}

const MaskWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
