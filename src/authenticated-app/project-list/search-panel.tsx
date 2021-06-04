// import { jsx } from "@emotion/react";
import { memo } from "react";
import { Form, Input, Select } from "antd";
import { Project } from "./list";
import UserSelect from "components/user-select";

const { Option } = Select;
export interface User {
  id: number;
  name: string;
  email?: string;
  title?: string;
  organization?: string;
  token?: string;
}

interface SearchPanelProps {
  params: Partial<Pick<Project, "name" | "personId">>;
  // setParams: (params: { name: string; personId: string }) => void;
  setParams: (params: SearchPanelProps["params"]) => void;
  users: User[];
}

export default memo(function SearchPanel({
  params,
  setParams,
  users,
}: SearchPanelProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, name: e.target.value });
  };
  const handleInputChange = handleInput;

  const handleAntdSelectChange = (value: number) => {
    setParams({
      ...params,
      personId: value,
    });
  };
  return (
    // <Form layout="inline" css={{ marginBottom: "2rem", "<*": "" }}>
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="项目名"
          value={params.name || ""}
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></Input>
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={params.personId}
          defaultOptionName={"负责人"}
          onChange={(e) => handleAntdSelectChange(Number(e))}
        />
      </Form.Item>
    </Form>
  );
});
