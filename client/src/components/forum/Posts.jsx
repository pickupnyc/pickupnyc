import styles from "./Forum.module.css";
import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";

export default function Posts() {
    const [replyingTo, setReplyingTo] = useState(null);
    const [newPostContent, setNewPostContent] = useState("");
    const [groupedPosts, setGroupedPosts] = useState({});
    const { user } = useUser();

    const [posts, setPosts] = useState([]);

    const handleSubmitPost = () => {
        if (!newPostContent.trim()) return;

        const newPost = {
            creator_id: user.user_id,
            body: newPostContent,
            created_at: new Date().toISOString(),
            is_reply: Boolean(replyingTo),
            parent_post_id: replyingTo,
            likes: 0,
        };
        const handleSubmit = async () => {
            const results = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            const post = await results.json();
            setPosts([...posts, post]);
            setNewPostContent("");
            setReplyingTo(null);
        };
        handleSubmit();
    };

    const handleLike = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to like post");
            }

            const updatedPost = await response.json();

            setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    useEffect(() => {
        const getPosts = async () => {
            const results = await fetch("/api/posts");
            const posts = await results.json();
            setPosts(posts);
        };
        getPosts();
    }, []);

    useEffect(() => {
        // Group posts and replies
        const groupedPostsObj = posts.reduce((acc, post) => {
            if (!post.is_reply) {
                acc[post.id] = {
                    mainPost: post,
                    replies: [],
                };
            } else if (acc[post.parent_post_id]) {
                acc[post.parent_post_id].replies.push(post);
            }
            return acc;
        }, {});
        setGroupedPosts(groupedPostsObj);
    }, [posts]);

    return (
        <div className="mx-auto max-w-2xl space-y-6 p-4">
            {/* Post Creation Form */}
            <div className="space-y-3 rounded-lg bg-offWhite p-4 shadow">
                <textarea
                    placeholder={replyingTo ? "Write a reply..." : "What's on your mind?"}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full resize-none rounded-lg border p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-darkGreen"
                    rows={3}
                />
                <div className="flex space-x-2">
                    <button
                        onClick={handleSubmitPost}
                        className="rounded-lg border-2 border-darkGreen bg-darkGreen px-4 py-2 text-white hover:bg-offWhite hover:text-darkGreen focus:outline-none focus:ring-2 focus:ring-darkGreen focus:ring-offset-2"
                    >
                        {replyingTo ? "Reply" : "Post"}
                    </button>
                    {replyingTo && (
                        <button
                            onClick={() => setReplyingTo(null)}
                            className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
                        <div className="rounded-lg bg-offWhite p-4 shadow">
                            <div className="mb-3 flex items-start justify-between">
                                <div>
                                    <div className="font-semibold text-gray-900">{mainPost.username}</div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(mainPost.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">{mainPost.likes} likes</div>
                            </div>
                            <p className="mb-3 text-gray-800">{mainPost.body}</p>
                            <div className="flex space-x-4">
                                <button
                                    className="text-sm font-medium text-gray-500 hover:text-green-500"
                                    onClick={() => handleLike(mainPost.id)}
                                >
                                    Like
                                </button>
                                <button
                                    onClick={() => setReplyingTo(mainPost.id)}
                                    className="text-sm font-medium text-gray-500 hover:text-blue-500"
                                >
                                    Reply
                                </button>
                            </div>
                        </div>

                        {/* Replies */}
                        <div className="ml-8 space-y-3">
                            {replies.map((reply) => (
                                <div key={reply.id} className="rounded-lg bg-offWhite p-4 shadow">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <div className="font-semibold text-gray-900">{reply.username}</div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(reply.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">{reply.likes} likes</div>
                                    </div>
                                    <p className="mb-3 text-gray-800">{reply.body}</p>
                                    <button
                                        className="text-sm font-medium text-gray-500 hover:text-green-500"
                                        onClick={() => handleLike(reply.id)}
                                    >
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
}
