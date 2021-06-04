import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "utils";

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
    // 我写的类型，每次都不对。。。
    // ({}: {key in K}?: string) => setSearchParams(),
    // (params: {key in K}?: string) => setSearchParams(),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};
