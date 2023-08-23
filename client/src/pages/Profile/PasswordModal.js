import { Form, Input, Modal, message } from 'antd';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loaderSlide';
import { ChangeUserPassword } from '../../apicalls/users';

function PasswordModal({ showPassModal, setShowPassModal }) {
    const {user}=useSelector((state)=>state.users);
    const formRef=useRef(null);
    const rules=[{
        required: true,
        message: "Required"
    }]
    const dispatch=useDispatch();
    const onFinish=async(values)=>{
        try {
            dispatch(SetLoader(true));
            const { oldpassword, newpassword } = values; 
            const response=await ChangeUserPassword(user.email,oldpassword, newpassword);
            dispatch(SetLoader(false));
            if(response.success){
                message.success("Password Changed");
            }
            setShowPassModal(false);
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoader(false));
        }
    }
  return (
    <Modal onCancel={() => setShowPassModal(false)} open={showPassModal} 
    width={600}
    onOk={()=>formRef.current.submit()}
    centered>
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">Change Password</h1>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Email" name='email' rules={rules}>
                <Input type='email'/>
            </Form.Item>

            <Form.Item label="Old Password" name='oldpassword' rules={rules}>
            <Input type='password'/>
            </Form.Item>
            <Form.Item label="New Password" name='newpassword' rules={rules}>
                <Input type='password'/>
            </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default PasswordModal