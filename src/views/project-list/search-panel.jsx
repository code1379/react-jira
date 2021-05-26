import { memo } from "react";
import { debounce } from "utils";
export default memo(function SearchPanel({ params, setParams, users }) {
  const handleInput = (e) => {
    console.log("handleInput");
    console.log(e.target.value)
    setParams({ ...params, name: e.target.value });
  };
  const handleInputChange = handleInput;
  // const handleInputChange = debounce(handleInput);

  const handleSelectChange = (e) => {
    console.log("handleSelectChange", e.target.value);
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
        onChange={(e) => handleInputChange(e)}
      />
      <select value={params.personId} onChange={(e) => handleSelectChange(e)}>
        <option value="0" default>
          负责人
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
});
