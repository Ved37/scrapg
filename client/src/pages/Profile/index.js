import React, { useState } from 'react'
import { Button, Tabs } from 'antd'
import Products from './Products'
import UserBids from './UserBids'
import { useSelector } from 'react-redux'
import moment from 'moment';
import PasswordModal from './PasswordModal'
function Profile() {
    const {user}=useSelector((state)=>state.users);
  const [showChangePass,setShowChangePass]=useState(false);
  return (
    <div>
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab="Items" key="1">
                <Products/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="My Bids" key="2">
                <UserBids/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="General" key="3">
                <div className="flex flex-col w-1/3">
                    <span className='text-xl flex justify-between'>
                        Name: <span className='text-xl'>{user.name}</span>
                    </span>
                    <span className='text-xl flex justify-between'>
                        Email: <span className='text-xl'>{user.email}</span>
                    </span>
                    <span className='text-xl flex justify-between'>
                        Created At: <span className='text-xl'>{moment(user.createdAt).format("MMM D, YYYY hh:mm A")}</span>
                    </span>
                </div>
                    <div className='flex'><Button className='bg-primary text-white'
                    onClick={()=>setShowChangePass(!showChangePass)}
                    >Change Password</Button></div>
            </Tabs.TabPane>
        </Tabs>
        {showChangePass && <PasswordModal
          showPassModal={showChangePass}
          setShowPassModal={setShowChangePass}
          />}
    </div>
  )
}

export default Profile