import { memo, useState, useEffect } from "react";
import qs from "qs";
import { cleanObject } from "utils";
import SearchPanel from "./search-panel";
import List from "./list";

import { useMount, useDebounce } from "hooks";
// react 中默认含有 dotenv 所以可以直接获取到
const apiUrl = process.env.REACT_APP_API_URL;
export default memo(function ProjectList() {
  const [params, setParams] = useState({
    // 项目名称
    name: "",
    //
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const debouncedParams = useDebounce(params, 2000);
  // 当 params 发生变化时， 应该去请求对应的接口
  useEffect(() => {
    console.log("获取项目信息");
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`
    ).then(async (res) => {
      if (res.ok) {
        const result = await res.json();
        setList(result);
      }
    });
    // 当 params 发生改变时获取
  }, [debouncedParams]);
  // 获取用户

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <h4>ProjectList</h4>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
});
