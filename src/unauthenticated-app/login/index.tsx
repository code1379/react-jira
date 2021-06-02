import { Form, Input, Button } from "antd";

import { useAuth } from "context/auth-context";
import { useAsync } from "hooks/use-async";

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const onFinish = async (values: { username: string; password: string }) => {
    const { username, password } = values;
    try {
      // await login({ username, password });
      await run(login({ username, password }));
    } catch (e) {
      console.log(e);
      onError(e);
    }
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
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
