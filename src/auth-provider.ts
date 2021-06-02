// 有 handleUserResponse login\register\logout 方法
// - login
// - register
// - 上面两个会调用 handleUserResponse 在用户登陆或者注册成功之后，使用 localStorage 存储 token
// - handleUserResponse 接收服务器返回的类 User接口的信息
// - logout 会删除 localStorage 中的 token
const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);
const apiUrl = process.env.REACT_APP_API_URL;

// 返回的类型为 { "id": string, "name":string; "token": string}
// ! 之前在 search-panel 中定义过
export interface User {
  id: string;
  name: string;
  email?: string;
  title?: string;
  organization?: string;
  token?: string;
}
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

interface LoginUser {
  username: string;
  password: string;
}

interface RegisterUser extends LoginUser {}

export const login = (data: LoginUser) => {
  // fetch 是 Promise 。然后 Promise
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      const result = await res.json();
      // console.log(result);
      return handleUserResponse(result);
      // return Promise.resolve(handleUserResponse(result));
    } else {
      // 实现的效果类似于  throw a new error
      return Promise.reject(await res.json());
    }
  });
};

export const register = (data: RegisterUser) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      const result = await res.json();
      // console.log(result);
      return Promise.resolve(handleUserResponse(result));
    } else {
      // 实现的效果类似于  throw a new error
      return Promise.reject(await res.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
