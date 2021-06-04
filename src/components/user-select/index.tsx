import React, { memo } from "react";
import IdSelect from "components/id-select";
import { useUsers } from "hooks/user";

export default memo(function UserSelect(
  props: React.ComponentProps<typeof IdSelect>
) {
  const { users } = useUsers();
  return <IdSelect options={users || []} {...props}></IdSelect>;
});
