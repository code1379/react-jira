import { memo, useState, useEffect } from "react";
import qs from "qs";
import { cleanObject } from "utils";
import { useMount, useDebounce } from "hooks";

import SearchPanel from "./search-panel";
import List from "./list";

interface User {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

// react 中默认含有 dotenv 所以可以直接获取到
const apiUrl = process.env.REACT_APP_API_URL;
export default memo(function ProjectList() {
  // 背后的原理并不是类型推断而是，泛型
  const [params, setParams] = useState({
    // 项目名称
    name: "",
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
