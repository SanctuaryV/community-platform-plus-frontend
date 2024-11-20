import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ProfileCard() {
  const { userId } = useParams(); // ดึง userId จาก URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    avatar_url: null,
    name: 'User Name',
    email: 'User Email',
    age: null,
    occupation: 'Occupation',
    bio: 'This is the user bio',
    followers_count: 0,
    following_count: 0,
    followers: [],
    following: [],
  });
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false); // Track follow status

  useEffect(() => {
    if (!userId) {
      console.error('UserId is missing');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // แปลง followers_ids และ following_ids จาก String เป็น Array
        const followersIds = response.data.user.followers_ids || [];
        const followingIds = response.data.user.following_ids || [];

        // สร้าง followers และ following (สามารถแปลงเป็น object หรือ array ที่มี id ได้ตามต้องการ)
        const followers = followersIds.map(id => ({ id: id.toString() }));  // แปลง id ให้เป็นสตริง
        const following = followingIds.map(id => ({ id: id.toString() }));  // แปลง id ให้เป็นสตริง

        setUserData({
          avatar_url: response.data.user.avatar_url || null,
          name: response.data.user.name || 'User Name',
          email: response.data.user.email || 'User Email',
          age: response.data.user.age || 'N/A',
          occupation: response.data.user.occupation || 'Occupation',
          bio: response.data.user.bio || 'This is the user bio',
          followers_count: response.data.user.followers_count || 0,
          following_count: response.data.user.following_count || 0,
          followers,  // ส่ง followers ที่เป็นอาเรย์
          following,  // ส่ง following ที่เป็นอาเรย์
        });

        // ตรวจสอบสถานะการติดตาม
        const currentUserId = localStorage.getItem('user_id');
        const isFollowingStatus = followers.some(f => f.id === currentUserId);  // เปรียบเทียบ id ใน followers กับ currentUserId
        setIsFollowing(isFollowingStatus); // กำหนดสถานะการติดตาม
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    

    fetchData();
  }, [userId]);

  const handleFollow = async () => {
    try {
      const currentUserId = localStorage.getItem('user_id'); // user_id จาก localStorage
      const response = await axios.post(
        `/follow/${userId}`,
        { followerId: currentUserId, followeeId: userId }  // ส่งข้อมูลที่ต้องการ
      );
      console.log('Follow success:', response.data);
      setIsFollowing(true);
      setUserData(prevData => ({
        ...prevData,
        followers_count: prevData.followers_count + 1,
        followers: [...prevData.followers, { id: currentUserId }] // เพิ่มผู้ที่ติดตาม
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    const currentUserId = localStorage.getItem('user_id'); // user_id จาก localStorage
    try {
      const response = await axios.post(
        `/unfollow/${userId}`,  // ส่งไปที่ endpoint ของ unfollow
        { followerId: currentUserId }  // ส่ง body เพื่อระบุผู้ติดตาม
      );
      console.log('Unfollow success:', response.data);
      setIsFollowing(false);
      setUserData(prevData => ({
        ...prevData,
        followers_count: prevData.followers_count - 1,
        followers: prevData.followers.filter(f => f.id !== currentUserId)  // ลบผู้ที่ยกเลิกการติดตาม
      }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleEditProfile = () => {
    navigate(`/edit-profile/${userId}`);
  };

  const currentUserId = localStorage.getItem('user_id'); // user_id จาก localStorage

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const { avatar_url, name, email, age, occupation, bio, followers_count, following_count } = userData;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Avatar
          alt={name}
          src={avatar_url || 'default-avatar-url'}
          sx={{
            width: 120,
            height: 120,
            margin: '0 auto',
            border: '3px solid #ddd',
          }}
        />
        <Typography variant="h3" sx={{ marginTop: 2 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1 }}>
          {email}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          About me
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Age: {age}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Occupation: {occupation}
          </Typography>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            {bio}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: 2 }} justifyContent="center">
          <Grid item xs={6}>
            <Typography variant="body2" fontWeight="bold" sx={{ textAlign: 'center' }}>
              Followers
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {followers_count}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" fontWeight="bold" sx={{ textAlign: 'center' }}>
              Following
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {following_count}
            </Typography>
          </Grid>
        </Grid>

        {/* Show Edit Profile button only if user_id matches */}
        {currentUserId === userId ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
        ) : isFollowing ? (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginTop: 3 }}
            onClick={handleUnfollow}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={handleFollow}
          >
            Follow
          </Button>
        )}
      </Paper>
    </Box>
  );
}
