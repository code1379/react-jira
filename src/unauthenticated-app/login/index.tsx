import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const { login, user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target);
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username: username, password: password });
  };
  return (
    <div>
      {user ? (
        <div>
          用户登陆成功 {user.name} {user.token}
        </div>
      ) : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id="username" />
        </div>

        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
};
export default Login;
