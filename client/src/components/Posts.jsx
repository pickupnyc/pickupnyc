import styles from "./Forum.module.css"
import { useState } from 'react';
export default function Posts() {
    const [replyingTo, setReplyingTo] = useState(null);
    const [newPostContent, setNewPostContent] = useState('');
    
    // Example data structure
    const [posts, setPosts] = useState([
      {
        id: 1,
        username: 'user1',
        body: 'This is a main post about something interesting. What do you all think?',
        created_at: '2024-03-15T10:00:00',
        is_reply: false,
        parent_post_id: null,
        likes: 5
      },
      {
        id: 2,
        username: 'user2',
        body: 'This is a really good point! I totally agree with what you said.',
        created_at: '2024-03-15T10:05:00',
        is_reply: true,
        parent_post_id: 1,
        likes: 2
      }
    ]);
  
    const handleSubmitPost = () => {
      if (!newPostContent.trim()) return;
      
      const newPost = {
        id: posts.length + 1,
        username: 'currentUser',
        body: newPostContent,
        created_at: new Date().toISOString(),
        is_reply: Boolean(replyingTo),
        parent_post_id: replyingTo,
        likes: 0
      };
  
      setPosts([...posts, newPost]);
      setNewPostContent('');
      setReplyingTo(null);
    };
  
    // Group posts and replies
    const groupedPosts = posts.reduce((acc, post) => {
      if (!post.is_reply) {
        acc[post.id] = {
          mainPost: post,
          replies: []
        };
      } else if (acc[post.parent_post_id]) {
        acc[post.parent_post_id].replies.push(post);
      }
      return acc;
    }, {});
  
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Post Creation Form */}
        <div className="bg-white rounded-lg shadow p-4 space-y-3">
          <textarea
            placeholder={replyingTo ? "Write a reply..." : "What's on your mind?"}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSubmitPost}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {replyingTo ? 'Reply' : 'Post'}
            </button>
            {replyingTo && (
              <button
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
  
        {/* Posts and Replies */}
        <div className="space-y-6">
          {Object.values(groupedPosts).map(({ mainPost, replies }) => (
            <div key={mainPost.id} className="space-y-3">
              {/* Main Post */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">{mainPost.username}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(mainPost.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {mainPost.likes} likes
                  </div>
                </div>
                <p className="text-gray-800 mb-3">{mainPost.body}</p>
                <div className="flex space-x-4">
                  <button className="text-gray-500 hover:text-blue-500 text-sm font-medium">
                    Like
                  </button>
                  <button
                    onClick={() => setReplyingTo(mainPost.id)}
                    className="text-gray-500 hover:text-blue-500 text-sm font-medium"
                  >
                    Reply
                  </button>
                </div>
              </div>
  
              {/* Replies */}
              <div className="ml-8 space-y-3">
                {replies.map(reply => (
                  <div key={reply.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">{reply.username}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(reply.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {reply.likes} likes
                      </div>
                    </div>
                    <p className="text-gray-800 mb-3">{reply.body}</p>
                    <button className="text-gray-500 hover:text-blue-500 text-sm font-medium">
                      Like
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  