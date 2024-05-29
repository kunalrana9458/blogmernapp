import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import {Button, Textarea} from 'flowbite-react'


export default function Comment({ comment, onLike,onEdit,onDelete }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent,setEditedContent] = useState(comment.content)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(editedContent)
  };

  const handleSave = async() => {
    console.log("Hanlde Save executed");
    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`,{
        method:'PUT',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          content:editedContent
        })
      });

      if(res.ok){
        setIsEditing(false);
        onEdit(comment,editedContent);
      }

    } catch (error) {
      console.log(error.message); 
    }
  }

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous User"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
         <>
         <Textarea
            className="w-full p-2 text-gray-700 bg-gray-200 rounded-sm resize-none focus:outline-none
            focus:bg-gray-100"
            rows="3"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 text-xs mt-2">
            <Button
            className=''
            size='sm'
            gradientDuoTone='purpleToBlue'
            onClick={handleSave} >
            Save
            </Button>
            <Button
            className=''
            size='sm'
            gradientDuoTone='purpleToBlue'
            outline
            onClick={() =>  setIsEditing(false)}
            >
            Cancel</Button>
          </div>
         </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div>
              <button
                type="button"
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "!text-blue-500"
                    : ""
                }`}
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes > 1 ? "likes" : "like")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                <div className="flex  gap-2">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-green-500"
                  >
                  Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(comment._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                  Delete
                  </button>
                </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
