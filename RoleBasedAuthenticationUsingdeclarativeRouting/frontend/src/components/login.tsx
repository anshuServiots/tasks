import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  userEmail?: string;
  userPassword?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate(); 

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    const res = await fetch("http://localhost:2001/loginUser", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      method: "POST",
    });

    console.log("res.status-----", res.status);
    const hi = await res.json();
    console.log("hiii", hi);

    if (res.status === 200) {
      alert("You are now logged in");
      window.localStorage.setItem("token", hi?.data);

      navigate("/employeeDashboard"); 
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1>Log In</h1>
      <Form.Item<FieldType>
        label="UserEmail"
        name="userEmail"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>


      <Form.Item<FieldType>
        label="Password"
        name="userPassword"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { Login };
