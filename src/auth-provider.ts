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
};

interface LoginUser {
  username: string;
  password: string;
}

interface RegisterUser extends LoginUser {}

export const login = (data: LoginUser) => {
  fetch(`${apiUrl}/login`, {
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
    }
  });
};

export const register = (data: RegisterUser) => {
  fetch(`${apiUrl}/register`, {
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
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorageKey);
