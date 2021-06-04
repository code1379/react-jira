import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const result = keys.reduce((prev, key) => {
  //   return { ...prev, [key]: searchParams.get(key) || "" };
  // }, {} as { [key in K]: string });
  // 上面不能直接写 嵌套 useMemo，只能像下面这种写法
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    setSearchParams,
  ] as const;
};
