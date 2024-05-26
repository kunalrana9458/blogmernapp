import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {TiTick} from 'react-icons/ti';
import { ImCross } from "react-icons/im";

export default function DashUsers() {
  const {currentUser} = useSelector((state) => state.user);
  const [users,setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [userIdToDelete,setUserIdToDelete] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json();
        if(res.ok){
          setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchUsers();
    }
  },[currentUser._id])

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/deleteusers/${userIdToDelete}`,{
        method:'DELETE'
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      } else{
        users((prev) => (
          prev.filter((user) => user._id !== userIdToDelete)
        ))
      }
    } catch (error) {
      
    } 
  }
  
  console.log(users);

  const handleShowMore = async() => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => [...prev,...data.user]);
        if(data.users.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100'> 
       {
        currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
            <Table.Head>
               <Table.HeadCell>Date Created</Table.HeadCell>
               <Table.HeadCell>User Image</Table.HeadCell>
               <Table.HeadCell>USer Name</Table.HeadCell>
               <Table.HeadCell>User Email</Table.HeadCell>
               <Table.HeadCell>Admin</Table.HeadCell>
               <Table.HeadCell>Delete Account</Table.HeadCell>
            </Table.Head>
            {
              users.map((user) => (
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/user/${user.slug}`}>
                        <img 
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-20 h-20 object-cover bg-gray rounded-full'
                         />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='font-medium text-gray-900 dark:text-white' to={`/user/${user.slug}`}>
                         {user.username}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='font-medium text-gray-900 dark:text-white' to={`/user/${user.slug}`}>
                         {user.email}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {
                        user.isAdmin ? (<TiTick className='text-teal-500' />) : (<ImCross className='text-red-500' />)
                      }
                    </Table.Cell>
                    <Table.Cell>
                      <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }} 
                      className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            }
            </Table>
            {
              showMore && (
                <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7'>Show more</button>
              )
            }
          </>
        ) : (
          <p>You have no user Yet</p>
        )
       }
       <Modal show={showModal}
       onClose={() => setShowModal(false)}
       popup
       size='md' >

       <Modal.Header />

       <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
          dark:text-gray-200 mb-4 mx-auto' />
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
            Are You Sure you want to delete this user ?
          </h3>
          <div className='flex justify-between'>
            <Button color='failure' onClick={handleDeleteUser}>
               Yes, I'm Sure
            </Button>
            <Button color='gray' onClick={() => setShowModal(false)}>
              No, Cancel
            </Button>
          </div>
        </div>
       </Modal.Body>

       </Modal>
    </div>
  )
}
