import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Divider from '../../components/Divider'
import { LoginUser } from '../../apicalls/users'
import { SetLoader } from '../../redux/loaderSlide'
import { useDispatch } from 'react-redux'

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
  },{min: 3}
];



function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onFinish= async (values)=>{
    try {
      dispatch(SetLoader(true))
      const response= await LoginUser(values);
      dispatch(SetLoader(false))
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token",response.data);
        window.location.href="/"; 
      }
      else{
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/")
    }
  }, [])
  
  return (
    <div className='bg-primary h-screen flex justify-center items-center'>
      <div className='bg-white p-5 rounded w-[450px]'>
        <h1 className='text-primary text-2xl'>SCRAPG - <span className='text-gray-400 text-2xl'>LOGIN</span></h1>
        <Divider/>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email' rules={email_rules}>
            <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item label='Password' name='password' rules={pass_rules}>
            <Input type='password' placeholder='Password'/>
          </Form.Item>
          <Button className='mt-2' type='primary' htmlType='submit' block>
            Login
          </Button>
          <div className='mt-5 text-center'>
            <span className='text-gray-500'>
              Don't have an account? <Link to='/register' className='text-primary'>Register</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login