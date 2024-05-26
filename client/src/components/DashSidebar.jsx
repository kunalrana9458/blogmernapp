import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,HiArrowRight, HiDocumentText, HiOutlineUserGroup} from 'react-icons/hi'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'



export default function DashProfile() {
  const {currentUser} = useSelector((state) => state.user)
  const location = useLocation();
  const [tab,setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
  },[location.search])
  return (
    <Sidebar className='w-full md:'>
        <Sidebar.Items>
            <Sidebar.ItemGroup> 
            <Link to='/dashboard?tab=profile'>
                <Sidebar.Item 
                active={tab === 'profile'} 
                icon={HiUser} 
                label={currentUser.isAdmin ? 'Admin' : 'User'}
                labelColor='dark'
                as='div' >
                    Profile
                </Sidebar.Item>
            </Link>
           {
            currentUser.isAdmin && (
              <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
              active={tab === 'posts'}
              icon={HiDocumentText}
              as='div'>
               Posts
              </Sidebar.Item>
            </Link>
            )
           }
           {
            currentUser.isAdmin && (
              <Link to='/dashboard?tab=users'>
              <Sidebar.Item
              active={tab === 'users'}
              icon={HiOutlineUserGroup}
              as='div'>
               Users
              </Sidebar.Item>
            </Link>
            )
           }
                <Sidebar.Item  icon={HiArrowRight}   
                className='cursor-pointer' >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
