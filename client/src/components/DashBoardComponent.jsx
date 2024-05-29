import React, { useEffect, useState } from "react";
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import {Button,Table} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function DashBoardComponent() {
  const [user, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [lastMonthUser, setLastMonthUser] = useState(0);
  const [lastMonthPost, setLastMonthPost] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUser(data.lastMonthUser);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("api/post/getPosts");
        const data = await res.json();

        if (res.ok) {
          setPosts(data.post);
          setTotalPosts(data.totalPost);
          setLastMonthPost(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("api/comment/getComments");
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full
      rounded-sm shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-300 text-md uppercase" >Total Users</h3>
            <p className="text-2xl" > {totalUsers} </p> 
          </div>
            <HiOutlineUserGroup  className="bg-teal-600 text-white rounded-full
            text-5xl shadow-lg p-3" />
        </div>
          <div className="flex gap-2 text-sm ">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUser}
            </span>
            <div className="text-gray-500">
              Last Month
            </div>
          </div>
      </div>

      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full
      rounded-sm shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-300 text-md uppercase" >Total Posts</h3>
            <p className="text-2xl" > {totalPosts} </p> 
          </div>
            <HiOutlineUserGroup  className="bg-indigo-600 text-white rounded-full
            text-5xl shadow-lg p-3" />
        </div>
          <div className="flex gap-2 text-sm ">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPost}
            </span>
            <div className="text-gray-500">
              Last Month
            </div>
          </div>
      </div>

      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full
      rounded-sm shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-300 text-md uppercase" >Total Comments</h3>
            <p className="text-2xl" > {totalComments} </p> 
          </div>
            <HiDocumentText  className="bg-lime-600 text-white rounded-full
            text-5xl shadow-lg p-3" />
        </div>
          <div className="flex gap-2 text-sm ">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">
              Last Month
            </div>
          </div>
      </div>
      </div>
      <div className="flex flex-wrap py-3 mx-auto justify-center gap-2">
        <div className="flex flex-col w-full md:w-auto shadow-md mt-2 p-2 rounded-md
        dark:bg-gray-800">
          <div className="flex justify-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone='purpleToPink'> 
               <Link to={'/dashboard?tab=users'}>
                  See All
               </Link>              
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {
              user && user.map((u) => 
                <Table.Body key={u._id} className="divide-y">
                  <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                      className="h-10 w-10 rounded-full bg-gray-500"
                      src={u.profilePicture}
                      alt="user" />
                    </Table.Cell>
                    <Table.Cell> {u.username} </Table.Cell>
                  </Table.Row>
                </Table.Body>
              )
            }
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md mt-2 p-2 rounded-md
        dark:bg-gray-800">
          <div className="flex justify-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone='purpleToPink'> 
               <Link to={'/dashboard?tab=comments'}>
                  See All
               </Link>              
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Cotent</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {
              comments && comments.map((comment) => 
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="ww-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell> {comment.numberOfLikes} </Table.Cell>
                  </Table.Row>
                </Table.Body>
              )
            }
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md mt-2 p-2 rounded-md
        dark:bg-gray-800">
          <div className="flex justify-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone='purpleToPink'> 
               <Link to={'/dashboard?tab=posts'}>
                  See All
               </Link>              
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {
              posts && posts.map((post) => 
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                      className="h-10 w-14 rounded-md bg-gray-500"
                      src={post.image}
                      alt="user" />
                    </Table.Cell>
                    <Table.Cell className="w-96"> {post.title} </Table.Cell>
                    <Table.Cell className="w-5"> {post.category} </Table.Cell>
                  </Table.Row>
                </Table.Body>
              )
            }
          </Table>
        </div>
      </div>
    </div>
  )
}
