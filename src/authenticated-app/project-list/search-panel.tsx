import { memo } from "react";

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams({
      ...params,
      personId: e.target.value,
    });
  };

  return (
    <form action="">
      <input
        type="text"
        placeholder="项目名"
        value={params.name}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <select
        value={params.personId}
        onChange={(e) => {
          handleSelectChange(e);
        }}
      >
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
});
