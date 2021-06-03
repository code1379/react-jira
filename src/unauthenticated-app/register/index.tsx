import { useAuth } from "context/auth-context";

import { Form, Input, Button } from "antd";
import { useAsync } from "hooks/use-async";
const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  // cpassword 不参与服务器的交互
  // 服务器值传递 用户名和密码
  // 这里只做个相等判断
  const onFinish = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      return onError(new Error("两次输入的密码不一致"));
    }
    const { username, password } = values;

    try {
      await run(register({ username, password }));
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
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="cpassword"
          rules={[{ required: true, message: "请确认密码" }]}
        >
          <Input.Password placeholder="确认密码" />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} block type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
