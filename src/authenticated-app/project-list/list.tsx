import { memo } from "react";
import { User } from "./search-panel";
import { Table } from "antd";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
  pin?: boolean;
}

interface ListProps {
  list: Project[];
  users: User[];
}

interface Info {
  [propName: string]: string;
}

export default memo(function List({ list, users }: ListProps) {
  const columns = [
    {
      title: "名称",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "负责人",
      dataIndex: "name",
      key: "name",
    },
  ];
  const data: Info[] = [];
  for (let p of list) {
    let info: Info = {};
    info.projectName = p.name;
    info.name = users.find((user) => user.id === p.personId)?.name || "未知";
    info.key = String(data.length + 1);
    data.push(info);
  }

  return <Table columns={columns} dataSource={data} pagination={false}></Table>;

  // return (
  //   <Table
  //     columns={[
  //       {
  //         title: "名称",
  //         dataIndex: "name",
  //         sorter(a, b) {
  //           return a.name.localeCompare(b.name);
  //         },
  //       },
  //       {
  //         title: "负责人",
  //         render(text, record, index) {
  //           return (
  //             <span>
  //               {users.find((user) => user.id === record.personId)?.name ||
  //                 "未知"}
  //             </span>
  //           );
  //         },
  //       },
  //     ]}
  //     dataSource={list}
  //     pagination={false}
  //   ></Table>
  // );
});
