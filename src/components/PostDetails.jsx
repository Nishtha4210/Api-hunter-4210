import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../features/postSlice";
import LoadingSpinner from "./LoadingSpinner";

function PostDetails() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-between p-4 bg-red-800 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-bold">Error: {error}</h3>
        <button 
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentPost) {
    return null;
  }

  return (
    <div className="flex items-start justify-between p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Post Content */}
      <div className="flex-1 space-y-3">
        <h1 className="text-xl font-bold">{currentPost.title}</h1>
        <p className="text-gray-300">{currentPost.body}</p>
        <span className="text-sm text-gray-400">Posted by: {currentPost.userId}</span>
      </div>

      {/* Comments Section */}
      <div className="flex-1 space-y-3 ml-8 border-l border-gray-700 pl-6">
        <h2 className="text-lg font-semibold">Comments</h2>
        {currentPost.comments?.map((comment) => (
          <div key={comment.id} className="p-3 bg-gray-800 rounded-md">
            <h4 className="text-sm font-semibold">{comment.name}</h4>
            <h4 className="text-xs text-gray-400">{comment.email}</h4>
            <p className="text-gray-300">{comment.body}</p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button 
        className="ml-8 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}

export default PostDetails;