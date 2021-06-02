import { memo } from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
  pin?: boolean;
}

// interface ListProps {
//   list: Project[];
//   users: User[];
//   loading: boolean;
// }

interface ListProps extends TableProps<Project> {
  users: User[];
}

export default memo(function List({ users, ...props }: ListProps) {
  console.log(props);
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
      rowKey={(r) => r.id}
      pagination={false}
      {...props}
    ></Table>
  );
});
