import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'; // Import Link
import TextField from '@mui/material/TextField'; // Import TextField from MUI

export default function Profilelist() {
  const [userData, setUserData] = useState([]); // Store all user data
  const [filteredData, setFilteredData] = useState([]); // Store filtered user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Store search query

  const currentUserId = localStorage.getItem('user_id'); // Get the current user's ID from localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        // Filter data to exclude the current user
        const filteredData = data.users.filter(user => String(user.user_id) !== String(currentUserId)); // Convert both to strings

        setUserData(filteredData); // Update the state with the filtered data
        setFilteredData(filteredData); // Set filtered data to be displayed
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]); // Depend on currentUserId to refetch data when the user changes

  // Handle search filtering
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = userData.filter(user =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      user.email.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(filtered); // Update the filtered data
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      {/* Search input for users */}
      <TextField
        label="Search"
        variant="standard"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 2, maxWidth: 600 }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <CircularProgress />
      </Box>
      ) : error ? (
        <Typography variant="h6" color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredData.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.user_id}>
              <Link to={`/profile/${user.user_id}`} style={{ textDecoration: 'none' }}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s', // เพิ่ม transition สำหรับการเคลื่อนไหวที่นุ่มนวล
                    '&:hover': {
                      transform: 'scale(1.05)', // ขยายขนาดเล็กน้อย
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // เพิ่มเงา
                    },
                  }}
                >
                  <Avatar
                    alt={user.name}
                    src={user.avatar_url || ''}
                    sx={{ width: 120, height: 120, margin: '0 auto', border: '4px solid #ddd' }}
                  />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>{user.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    Joined on: {new Date(user.created_at).toLocaleDateString()}
                  </Typography>
                  <Grid container sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                      <Typography variant="body2">Posts</Typography>
                      <Typography variant="body2">{user.posts_count}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">Followers</Typography>
                      <Typography variant="body2">{user.followers_count}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">Following</Typography>
                      <Typography variant="body2">{user.following_count}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
