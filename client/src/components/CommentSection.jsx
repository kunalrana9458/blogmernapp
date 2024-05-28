import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

  console.log(postId);

  console.log(comments);
  console.log(comment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.length > 200) {
        return;
      }
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data,...comments])
      }
    } catch (error) {
      console.log("Error Occured");
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div>
      <div className="max-w-2xl mx-auto w-full p-3">
        {currentUser ? (
          <div className="flex items-center gap-1 my-5 text-gray-500">
            <p>Signed in as:</p>
            <img
              className="h-5 w-5 object-cover rounded-s-full"
              src={currentUser.profilePicture}
              alt=""
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-xs text-cyan-600
                hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div
            className="text-sm text-teal-500 my-5
            flex gap-1"
          >
            You Must be signed to the comment.
            <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
              Sign in
            </Link>
          </div>
        )}
        {currentUser && (
          <form
            onSubmit={handleSubmit}
            className="border border-teal-500 rounded-md p-3"
          >
            <Textarea
              placeholder="Add a Comment..."
              rows="3"
              maxLength="200"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <div
              className="flex justify-between items-center
                mt-5"
            >
              <p className="text-gray-500 text-sm">
                {200 - comment.length} Charcters Remaining
              </p>
              <Button outline gradientDuoTone="purpleToBlue" type="submit">
                Submit
              </Button>
            </div>
            {commentError && (
              <Alert color="failure" className="mt-5">
                {commentError}
              </Alert>
            )}
          </form>
        )}
      </div>
      {
        comments.length === 0 ? (
        <p className="text-sm my-5">No Comments Yet!</p>
        ) : (
            <>
            <div className="text-sm my-5 flex items-center">
                <p>Comments</p>
                <div className="border border-gray-400 py-1 px-2 rounded-sm">
                    <p>{comments.length}</p>
                </div>
            </div>
            {
                comments.map(comment => (
                    <Comment key={comment._id}
                    comment={comment} />
                ))
            }
            </>
        )
      }
    </div>
  );
}
