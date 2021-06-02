import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  // status 的缩写
  // 闲置 加载 错误 成功
  stat: "idle" | "loading" | "error" | "success";
}
const defaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};

const defaultConfig = {
  throwOnError: false,
};

// 这里的 D 是 data 中的类型
export const useAsync = <D,>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  // run 用来触发异步请求
  // 函数的参数，是一个 promise。promise 返回的类型是 D 类型
  const run = (promise: Promise<D>) => {
    // 如果传递的 D 不是 promise ，或者什么都不传递的话
    if (!promise || !promise.then) {
      // 证明不是 promise
      throw new Error("清传入 Promsie 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // catch 会消化异常
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
