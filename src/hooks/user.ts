import { useMount } from "hooks";
import { useState } from "react";
import { useRequest } from "service/request";

export const useUsers = () => {
  const [users, setUser] = useState([]);
  const client = useRequest();

  useMount(() => {
    client("users").then(setUser);
  });

  return { users };
};
