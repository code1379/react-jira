import { DevTools } from "jira-dev-tool";
import { Typography } from "antd";
import styled from "@emotion/styled";

export default function ErrorPage({ error }: { error: Error | null }) {
  return (
    <Wrapper>
      <DevTools />
      <Typography.Text type="danger">{error?.message}</Typography.Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
