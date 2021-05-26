import React, { memo, useEffect, useState } from "react";

export default memo(function SearchPanel() {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const handleInputChange = (e) => {
    setParams(...params, {
      name: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setParams(...params, {
      personId: e.target.value,
    });
  };

  // 当 params 发生变化时， 应该去请求对应的接口
  useEffect(() => {
    fetch("").then((res) => {
      if (res.ok) {
        setList(res.json());
      }
    });
    // 当 params 发生改变时获取
  }, [params]);

  return (
    <form action="">
      <input
        type="text"
        placeholder="项目名"
        value={params.name}
        onChange={(e) => handleInputChange(e)}
      />
      <select value={params.personId} onChange={(e) => handleSelectChange}>
        <option value="0" default>
          负责人
        </option>
        {users.map((user) => (
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
    </form>
  );
});
