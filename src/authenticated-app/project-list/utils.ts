import { useMemo } from "react";
import { useUrlQueryParam } from "hooks/useUrlQueryParam";
// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParam(["name", "personId"]);
  // 因为我们不想要为 0 的  personId
  return [
    useMemo(
      () => ({
        ...params,
        personId: Number(params.personId) || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
