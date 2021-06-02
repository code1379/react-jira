import { Project } from "authenticated-app/project-list/list";
import { useEffect } from "react";
import { useRequest } from "service/request";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";

export const useProjects = (debouncedParams: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useRequest();

  // 当 params 发生变化时， 应该去请求对应的接口
  useEffect(() => {
    run(client("projects", { data: cleanObject(debouncedParams) }));
    // eslint-disable-next-line
  }, [debouncedParams]);

  return result;
};
