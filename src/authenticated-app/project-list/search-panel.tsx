// import { jsx } from "@emotion/react";
import { memo } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;
export interface User {
  id: string;
  name: string;
  email?: string;
  title?: string;
  organization?: string;
  token?: string;
}

interface SearchPanelProps {
  params: {
    name: string;
    personId: string;
  };
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

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setParams({
  //     ...params,
  //     personId: e.target.value,
  //   });
  // };

  const handleAntdSelectChange = (value: string) => {
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
          value={params.name}
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Select defaultValue="" onChange={(e) => handleAntdSelectChange(e)}>
          <Option value="">请选择</Option>
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});
