import { memo, useMemo, useState } from "react";
import { useDebounce } from "hooks";
import styled from "@emotion/styled";
import SearchPanel from "./search-panel";
import List from "./list";
import { Typography } from "antd";
import { useProjects } from "hooks/projects";
import { useUsers } from "hooks/user";
import { useDocumentTitle } from "hooks/use-docuement-title";
import { useUrlQueryParam } from "hooks/useUrlQueryParam";
function ProjectList() {
  // 背后的原理并不是类型推断而是，泛型
  const [, setParams] = useState({
    // 项目名称
    name: "",
    personId: "",
  });
  const [keys, setKeys] = useState<("name" | "personId")[]>([
    "name",
    "personId",
  ]);
  const [params] = useUrlQueryParam(keys);
  const { users } = useUsers();
  const debouncedParams = useDebounce(params, 200);

  const { isLoading, error, data } = useProjects(debouncedParams);
  console.log(data);
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
}
ProjectList.whyDidYouRender = true;
export default memo(ProjectList);

const Contaienr = styled.div`
  padding: 3.2rem;
`;
