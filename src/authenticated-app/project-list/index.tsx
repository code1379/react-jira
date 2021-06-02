import { memo, useState, useEffect } from "react";
import { cleanObject } from "utils";
import { useMount, useDebounce } from "hooks";
import { useRequest } from "../../service/request";
import styled from "@emotion/styled";
import SearchPanel from "./search-panel";
import List from "./list";
import { Typography } from "antd";

export default memo(function ProjectList() {
  // 背后的原理并不是类型推断而是，泛型
  const [params, setParams] = useState({
    // 项目名称
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const debouncedParams = useDebounce(params, 200);
  const client = useRequest();
  // 当 params 发生变化时， 应该去请求对应的接口
  useEffect(() => {
    console.log("获取项目信息");
    setLoading(true);
    client("projects", { data: cleanObject(debouncedParams) })
      .then((res) => {
        setList(res);
        if (error) {
          setError(null);
        }
      })
      .catch((error) => {
        setError(error);
        setList([]);
      })
      .finally(() => setLoading(false));
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`
    // ).then(async (res) => {
    //   if (res.ok) {
    //     const result = await res.json();
    //     setList(result);
    //   }
    // });
    // 当 params 发生改变时获取
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams]);
  // 获取用户

  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (res) => {
    //   if (res.ok) {
    //     setUsers(await res.json());
    //   }
    // });
  });

  return (
    <Contaienr>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list} users={users} loading={loading} />
    </Contaienr>
  );
});
const Contaienr = styled.div`
  padding: 3.2rem;
`;
