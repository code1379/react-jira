import { memo } from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
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
  // const columns = [
  //   {
  //     title: "名称",
  //     dataIndex: "projectName",
  //     key: "projectName",
  //     sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
  //   },
  //   {
  //     title: "部门",
  //     dataIndex: "organization",
  //     key: "organization",
  //   },
  //   {
  //     title: "负责人",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  // ];
  // const data: Info[] = [];
  // for (let p of list) {
  //   let info: Info = {};
  //   info.projectName = p.name;
  //   info.name = users.find((user) => user.id === p.personId)?.name || "未知";
  //   info.key = String(data.length + 1);
  //   data.push(info);
  // }

  // return <Table columns={columns} dataSource={data} pagination={false}></Table>;

  return (
    <Table
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter(a, b) {
            return a.name.localeCompare(b.name);
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          render(text, record, index) {
            return (
              <span>
                {users.find((user) => user.id === record.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
      pagination={false}
    ></Table>
  );
});
