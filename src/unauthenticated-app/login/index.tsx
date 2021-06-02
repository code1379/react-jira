import { Form, Input, Button } from "antd";

import { useAuth } from "context/auth-context";

const Login = () => {
  const { login, user } = useAuth();

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;
    login({ username, password });
  };
  return (
    <div>
      {user ? (
        <div>
          用户登陆成功 {user.name} {user.token}
        </div>
      ) : null}

      <Form onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
