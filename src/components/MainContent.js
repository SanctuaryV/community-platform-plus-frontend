import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';

export default function MainContent() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://community-platform-plus-backend.onrender.com/main'); // ดึงข้อมูลโพสต์จาก backend
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      {/* แสดงข้อความต้อนรับ */}
      <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
          Welcome to the Community Platform
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2, color: 'text.secondary' }}>
          Share your hobbies and connect with others!
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {posts.map((post) => (
            <Paper
              key={post.post_id}
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: '8px',
                width: '100%', // ความกว้างเต็ม
                maxWidth: '600px', // จำกัดความกว้างสูงสุด
                margin: '0 auto' // กำหนดให้อยู่ตรงกลาง
              }}
            >
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
                <Box sx={{ marginLeft: 'auto' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                    {new Date(post.post_created_at).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                    {new Date(post.post_created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Box>

              {post.image_url && (
                <img
                  src={post.image_url}
                  alt="Post"
                  style={{
                    width: '100%', // ใช้ความกว้างเต็ม
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              )}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {post.content}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
