import { memo, useState, useEffect } from "react";
import qs from "qs";
import { cleanObject } from "utils";
import SearchPanel from "./search-panel";
import List from "./list";
console.log()
// react 中默认含有 dotenv 所以可以直接获取到
const apiUrl = process.env.REACT_APP_API_URL;
export default memo(function ProjectList() {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  // 当 params 发生变化时， 应该去请求对应的接口
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(params))}`).then(
      async (res) => {
        if (res.ok) {
          const result = await res.json();
          console.log(result);
          setList(result);
        }
      }
    );
    // 当 params 发生改变时获取
  }, [params]);
  // 获取用户
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
    // 记得添加空数组，否则会只要 state 发生改变，就会重新执行
  }, []);
  return (
    <div>
      <h4>ProjectList</h4>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
});
