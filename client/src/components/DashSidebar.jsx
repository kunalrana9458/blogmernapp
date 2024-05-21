import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,HiArrowRight} from 'react-icons/hi'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function DashProfile() {
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
                label={"User"}
                labelColor='dark'
                as='div' >
                    Profile
                </Sidebar.Item>
            </Link>
                <Sidebar.Item  icon={HiArrowRight}   
                className='cursor-pointer' >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
