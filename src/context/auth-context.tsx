import React, { useState, ReactNode } from "react";

import * as auth from "auth-provider";
import { request } from "../service/request";
import { useMount } from "hooks";
import { useAsync } from "hooks/use-async";
import MaskLoading from "components/mask-loading";
import ErrorPage from "components/error-page";
// auth 中有 handleUserResponse login\register\logout 方法
// - login
// - register
// - 上面两个会调用 handleUserResponse 在用户登陆或者注册成功之后，使用 localStorage 存储 token
// - handleUserResponse 接收服务器返回的类 User接口的信息
// - logout 会删除 localStorage 中的 token
interface AuthForm {
  username: string;
  password: string;
}

const AuthContext =
  React.createContext<
    | {
        user: auth.User | null;
        // 不知道为什么老师下面的类型都是 Promise<void>
        // login: (form: AuthForm) => void;
        login: (form: AuthForm) => Promise<void>;
        register: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined);
// 主要是用在 devtool 中，项目中实际上没什么意义
AuthContext.displayName = "AuthContext";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await request("me", { token });
    user = data.user;
  }
  return user;
};

// https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext
// 返回 React XXXContext.Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 进行主要的逻辑处理
  // TODO user 为 localStorage 中存储的用户性
  const {
    data: user,
    setData: setUser,
    setError,
    error,
    isIdle,
    isLoading,
    isError,
    run,
  } = useAsync<auth.User | null>();

  useMount(() => {
    run(bootstrapUser());
  });
  // 当用户点击 login 的时候
  const login = (form: AuthForm) => {
    // 将表单的数据传递个 auth 的 login 方法
    // point free
    return auth.login(form).then(setUser);
  };
  // 当用户点击 注册 的时候
  const register = (form: AuthForm) => {
    // auth.register(form).then((user) => {
    //   setUser(user);
    // });
    return auth.register(form).then(setUser);
  };

  // 当用户退出
  const logout = () => auth.logout().then(() => setUser(null));

  if (isIdle || isLoading) {
    return <MaskLoading />;
  }
  if (isError) {
    return <ErrorPage error={error}></ErrorPage>;
  }
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register }}
      children={children}
    ></AuthContext.Provider>
  );
};

// 自定义 hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider中使用");
  }
  return context;
};
