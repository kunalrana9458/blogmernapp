import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard';

export default function Home() {

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    console.log("Executed");
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.post);
    }
    fetchPosts();
  },[])


  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to My blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'> 
        Here you'll find a variety of articles and enhance you knowledge
        article related to tech 
        </p>
      <Link to='/search'
      className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View All Post
      </Link>
      <p>More Projects Coming Soon...</p>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
         {
          posts && posts.length > 0 && (
            <div>
              <h2 className='text-2xl mb-4 font-semibold text-center'>Recent Posts</h2>
              <div className='flex flex-wrap justify-center gap-4'>
                {
                  posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                }
              </div>
              <Link to='/search' 
              className='text-lg text-teal-500 hover:underline'>
                View All Post
              </Link>
            </div>
          )
         }
      </div>
    </div>
  )
}
