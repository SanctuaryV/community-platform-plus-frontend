import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField, Grid, Box, CircularProgress, Paper, Typography, IconButton, Alert } from '@mui/material';
import { DeleteForever, AddPhotoAlternate, Edit, ThumbUp, ChatBubble, Send } from '@mui/icons-material';

import { useParams } from 'react-router-dom';

export default function CommunityPage() {
    const { communityId } = useParams();
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State for image
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [editingPost, setEditingPost] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedImage, setEditedImage] = useState(null);
    const [likes/*, setLikes*/] = useState({});
    const [comments, setComments] = useState({}); // Store comments for each post
    const [newComment, setNewComment] = useState({}); // Temp storage for adding a comment


    // Fetch posts when component loads or communityId changes
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`/${communityId}`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
                const commentsData = {};

                // Populate the comments state with post ID as the key
                data.forEach(post => {
                    commentsData[post.id] = post.comments;
                });

                setComments(commentsData); // Update the comments state
            } else {
                console.error('Error fetching posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }, [communityId]);



    // Handle creating a new post
    const handleCreatePost = async () => {
        if (!content && !image) {
            setAlertMessage('Please provide content or an image for the post.');
            setAlertSeverity('error');
            return;
        }

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            setAlertMessage('User not logged in');
            setAlertSeverity('error');
            return;
        }

        setCreating(true);
        try {
            const formData = new FormData();
            formData.append('content', content);
            formData.append('group_id', communityId);
            formData.append('user_id', userId);  // Add user_id to the post data
            if (image) {
                formData.append('image', image); // Add image to request if exists
            }

            const response = await fetch('/createPost', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newPost = await response.json();  // Receive full post data including user info
                setPosts([newPost, ...posts]);  // Add the new post including name, avatar, date
                setContent('');
                setImage(null); // Reset image after post
                setAlertMessage('Post created successfully!');
                setAlertSeverity('success');
            } else {
                setAlertMessage('Error creating post.');
                setAlertSeverity('error');
            }
        } catch (error) {
            setAlertMessage('Error creating post.');
            setAlertSeverity('error');
        } finally {
            setCreating(false);
        }
    };

    // Handle deleting a post
    const handleDeletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`/deletePost`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ post_id: postId }),
                });

                if (response.ok) {
                    setPosts(posts.filter(post => post.id !== postId));
                    setAlertMessage('Post deleted successfully!');
                    setAlertSeverity('success');
                } else {
                    setAlertMessage('Error deleting post.');
                    setAlertSeverity('error');
                }
            } catch (error) {
                setAlertMessage('Error deleting post.');
                setAlertSeverity('error');
            }
        }
    };

    // Handle saving edited post
    const handleSaveEditedPost = async () => {
        if (!editedContent && !editedImage) {
            setAlertMessage('Please provide content or upload an image to save the post.');
            setAlertSeverity('error');
            return;
        }

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            setAlertMessage('User not logged in');
            setAlertSeverity('error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('content', editedContent);
            formData.append('post_id', editingPost.id);
            formData.append('user_id', userId);

            if (editedImage) {
                formData.append('image', editedImage);
            }

            const response = await fetch('/updatePost', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Updated Post:', data);

                // อัปเดต posts ใน state
                setPosts((prevPosts) => {
                    const updatedPosts = prevPosts.map((post) =>
                        post.id === Number(data.post_id)
                            ? { ...post, content: data.content, image_url: data.image_url }
                            : post
                    );
                    console.log('Updated Posts:', updatedPosts);
                    return [...updatedPosts]; // บังคับสร้างอาร์เรย์ใหม่
                });

                setEditingPost(null); // ออกจากโหมดแก้ไข
                setEditedContent('');
                setEditedImage(null);

                setAlertMessage(data.message || 'Post updated successfully!');
                setAlertSeverity('success');
            } else {
                setAlertMessage('Error updating post');
                setAlertSeverity('error');
            }
        } catch (error) {
            setAlertMessage('Error updating post');
            setAlertSeverity('error');
        }
    };

    const handleImagePostChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);  // Use setImage here
        } else {
            setAlertMessage('Please select a valid image file.');
            setAlertSeverity('error');
        }
    };


    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setEditedImage(file);
        } else {
            setAlertMessage('Please select a valid image file.');
            setAlertSeverity('error');
        }
    };

    // Handle post editing
    const handleEditPost = (post) => {
        setEditingPost(post);  // Set the state for the post being edited
        setEditedContent(post.content);  // Set the initial content for editing
        setEditedImage(null);  // Reset so that a new image can be uploaded
    };

    // Handle Like Post
    /*const handleLikePost = async (postId) => {
        try {
            const response = await fetch(`/addLike`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId, user_id: localStorage.getItem('user_id') }),
            });

            if (response.ok) {
                const updatedLikes = await response.json();
                setLikes((prev) => ({ ...prev, [postId]: updatedLikes.likes }));
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };*/

    // Handle Add Comment
    const handleAddComment = async (postId) => {
        if (!newComment[postId]) return;

        try {
            const response = await fetch(`/addComment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_id: postId,
                    user_id: localStorage.getItem('user_id'), // ดึง user_id จาก localStorage
                    avatar_url: localStorage.getItem('avatar_url'), // ดึง avatar_url จาก localStorage
                    content: newComment[postId], // คอมเมนต์ใหม่
                }),
            });

            if (response.ok) {
                const comment = await response.json();
                setComments((prev) => ({
                    ...prev,
                    [postId]: [...(prev[postId] || []), comment],
                }));
                setNewComment((prev) => ({ ...prev, [postId]: '' })); // Clear input field
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };


    // Load posts when component mounts
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);


    return (
        <Box sx={{ padding: 3 }}>

            {alertMessage && (
                <Alert severity={alertSeverity} sx={{ marginBottom: 2 }}>
                    {alertMessage}
                </Alert>
            )}

            <Paper sx={{
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                marginBottom: 3,
                maxWidth: '600px',
                margin: '0 auto',
            }}>
                <Typography variant="h6" gutterBottom>Create a New Post</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* แสดงภาพตัวอย่าง */}
                    {image && (
                        <Box sx={{ marginBottom: 2 }}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                            />
                        </Box>
                    )}

                    {/* ช่องกรอกเนื้อหาของโพสต์ */}
                    <TextField
                        label="Post Content"
                        variant="standard"
                        fullWidth
                        multiline
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* แถวปุ่มอัปโหลดภาพและปุ่มสร้างโพสต์ */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {/* ปุ่มอัปโหลดภาพ */}
                        <IconButton component="label">
                            <AddPhotoAlternate />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImagePostChange}
                            />
                        </IconButton>

                        {/* ปุ่มสร้างโพสต์ */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreatePost}
                            disabled={creating}
                            sx={{ flexGrow: 1 }} // ทำให้ปุ่มขยายเต็มพื้นท
                        >
                            {creating ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Post'}
                        </Button>
                    </Box>
                </Box>
            </Paper>


            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container justifyContent="center">
                    {/*ในส่วนของการแสดงผล:*/}
                    {posts.map((post) => (
                        <Grid sx={{ marginTop: 2 }} item xs={12} key={post.id}>
                            <Paper sx={{
                                padding: 2,
                                boxShadow: 3,
                                borderRadius: '8px',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}>
                                {/* Display avatar and name */}
                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                    <img
                                        src={post.avatar_url || 'default-avatar-url'}
                                        alt="Avatar"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {post.name || 'Anonymous'}
                                    </Typography>

                                    {/* Display time (aligned right) */}
                                    <Box sx={{ marginLeft: 'auto' }}>
                                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                                            {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Display post image */}
                                {post.image_url && (
                                    <img
                                        src={post.image_url}
                                        alt="Post"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                )}

                                {/* Display post content */}
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    {post.content}
                                </Typography>

                                {/* Show edit form only for the post being edited */}
                                {editingPost?.id === post.id && (
                                    <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2, marginBottom: 3 }}>
                                        <Typography variant="h6" gutterBottom>Edit Post</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {editedImage && (
                                                <Box sx={{ marginBottom: 2 }}>
                                                    <img
                                                        src={URL.createObjectURL(editedImage)}
                                                        alt="Preview"
                                                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                                                    />
                                                </Box>
                                            )}

                                            <TextField
                                                label="Post Content"
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                value={editedContent}
                                                onChange={(e) => setEditedContent(e.target.value)}
                                            />

                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                <IconButton component="label">
                                                    <AddPhotoAlternate />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        hidden
                                                        onChange={handleImageChange}
                                                    />
                                                </IconButton>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleSaveEditedPost}
                                                    sx={{ flexGrow: 1 }}
                                                >
                                                    Save Changes
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Paper>
                                )}



                                {/* ฟอร์มเพิ่มคอมเมนต์ */}
                                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                                    <TextField
                                        value={newComment[post.id] || ''}
                                        onChange={(e) =>
                                            setNewComment((prev) => ({ ...prev, [post.id]: e.target.value }))
                                        }
                                        fullWidth
                                        placeholder="Add a comment..."
                                        size="small"
                                    />
                                    <IconButton onClick={() => handleAddComment(post.id)}>
                                        <Send />
                                    </IconButton>
                                </Box>

                                {/* Show comments */}
                                <Box sx={{ marginTop: 2 }}>
                                    {comments[post.id] && comments[post.id].length > 0 ? (
                                        [...comments[post.id]] // สร้างสำเนาอาร์เรย์เพื่อลดผลกระทบข้างเคียง
                                            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // จัดเรียงจากเก่าไปใหม่
                                            .map((comment, index) => {
                                                // Format the time for the comment
                                                const commentTime = new Date(comment.created_at);
                                                const hours = commentTime.getHours().toString().padStart(2, '0');
                                                const minutes = commentTime.getMinutes().toString().padStart(2, '0');
                                                const time = `${hours}:${minutes}`;

                                                return (
                                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                                        <img
                                                            src={comment.avatar_url}
                                                            alt={`Avatar of user ${comment.user_id}`}
                                                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
                                                        />
                                                        <Typography variant="body2" sx={{ marginRight: 1 }}>
                                                            {comment.content} {/* Comment content */}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {/* Time */}
                                                            {time}
                                                        </Typography>
                                                    </Box>
                                                );
                                            })
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            No comments yet.
                                        </Typography>
                                    )}
                                </Box>



                                {/* เพิ่มส่วนของปุ่มไลค์และคอมเมนต์ */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        {/* ปุ่มไลค์ */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton /*onClick={() => handleLikePost(post.id)}*/>
                                                <ThumbUp />
                                            </IconButton>
                                            <Typography>{likes[post.id] || post.likes || 0} </Typography>
                                        </Box>

                                        {/* จำนวนคอมเมนต์ */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <ChatBubble color="action" />
                                            <Typography>{(comments[post.id]?.length || post.comment_count || 0) }</Typography>
                                        </Box>
                                    </Box>

                                    {/* Edit and delete buttons */}
                                    {String(post.user_id) === String(localStorage.getItem('user_id')) && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <IconButton onClick={() => handleEditPost(post)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeletePost(post.id)}>
                                                <DeleteForever />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>

                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
