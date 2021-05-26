import React, { memo } from "react";

export default memo(function List({ list, users }) {
  console.log(list)
  return (
    <table border="1">
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name || "未知"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
