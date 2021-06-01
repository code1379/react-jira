import { useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from "../auth-provider";
const apiUrl = process.env.REACT_APP_API_URL;
// http://localhost:8080
// endpoint 就是后缀 /api 啥的
interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const request = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "content-type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    // 401 未授权
    // z
    if (res.status === 401) {
      // ?这里为什么没有使用 useAuth 呢？
      // * 1. 首先这个不在组件内部，但是我使用的时候，在组件内部啊？？？为什么不用？
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "清重新登陆" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useRequest = () => {
  const { user } = useAuth();
  // TODO 讲解 ts 操作符
  // return (...[endpoint, config]: [string, Config]) =>
  return (...[endpoint, config]: Parameters<typeof request>) =>
    request(endpoint, { ...config, token: user?.token });
};
