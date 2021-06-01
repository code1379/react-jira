const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const register = (user: { username: string; password: string }) => {
    fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (res) => {
      if (res.ok) {
        const result = await res.json();
        console.log(result);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target);
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username: username, password: password });
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id="username" />
        </div>

        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">注册</button>
      </form>
    </div>
  );
};
export default Register;
