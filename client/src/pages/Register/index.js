import { Button, Form, Input, message } from "antd";
import {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlide";

const name_rules = [
  {
    required: true,
    message: "required",
  },{min: 3}
];
const email_rules = [
  {
    required: true,
    message: "required",
  },
  {
    type: "email",
    message: "Enter valid email"
  }
];
const pass_rules = [
  {
    required: true,
    message: "required",
  },{min: 8}
];
const cnfpass_rules = [
  {
    required: true,
    message: "required",
  },
  ({getFieldValue})=>({
    validator(_,value){
      if(!value || getFieldValue("password")===value){
        return Promise.resolve();
      }
      return Promise.reject(
        "Enter correct password"
      )
    }
  })
];


function Register() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetLoader(false))
      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/");
    }
  }, [])
  return (
    <div className="bg-primary h-screen flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SCRAPG - <span className="text-gray-400 text-2xl">REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={name_rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={email_rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={pass_rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item label="Confirm Password" name="cnfpassword" dependencies={["password"]} rules={cnfpass_rules}>
            <Input type="password" placeholder="Confirm Password" />
          </Form.Item>
          <Button className="mt-2" type="primary" htmlType="submit" block>
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
