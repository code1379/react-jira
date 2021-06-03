import { memo, useState } from "react";
import { useDebounce } from "hooks";
import styled from "@emotion/styled";
import SearchPanel from "./search-panel";
import List from "./list";
import { Typography } from "antd";
import { useProjects } from "hooks/projects";
import { useUsers } from "hooks/user";
import { useDocumentTitle } from "hooks/use-docuement-title";

export default memo(function ProjectList() {
  // 背后的原理并不是类型推断而是，泛型
  const [params, setParams] = useState({
    // 项目名称
    name: "",
    personId: "",
  });
  const { users } = useUsers();
  const debouncedParams = useDebounce(params, 200);

  const { isLoading, error, data } = useProjects(debouncedParams);
  useDocumentTitle("项目列表", false);
  return (
    <Contaienr>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List dataSource={data || []} users={users} loading={isLoading} />
    </Contaienr>
  );
});
const Contaienr = styled.div`
  padding: 3.2rem;
`;
