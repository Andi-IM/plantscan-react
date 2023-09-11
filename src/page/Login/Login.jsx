import { Button, Form, Input, message } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [FormLogin] = Form.useForm();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = () => {
    FormLogin?.validateFields().then(() => {
      setLoading(true);
      const loginInfo = FormLogin?.getFieldsValue();

      signInWithEmailAndPassword(auth, loginInfo?.email, loginInfo?.password)
        .then((userCredential) => {
          const user = userCredential.user;

          const LOGIN_DATA = {
            token: user?.accessToken,
            email: user?.email,
          };
          localStorage?.setItem("LOGIN_DATA", JSON.stringify(LOGIN_DATA));
          navigate("/dashboard");
          // window.location.href = "/";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          message.error({
            content: `Error msg : ${errorMessage}, errCode : ${errorCode}`,
          });
          setLoading(false);
        });
    });
  };
  return (
    <Form form={FormLogin}>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button
        htmlType="submit"
        type="primary"
        onClick={() => loginHandler()}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
    </Form>
  );
};
export default Login;
