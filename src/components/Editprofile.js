import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { axiosInstance } from '../api';

export default function EditProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        occupation: '',
        bio: '',
        avatar: null, // เก็บไฟล์รูปโปรไฟล์
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // เก็บข้อความ error

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); // ตั้งค่า loading เป็น true ก่อนที่จะเริ่มดึงข้อมูล
            try {
                const response = await axiosInstance.get(`/profile/${userId}`);
                setFormData({
                    name: response.data.user.name || '',
                    email: response.data.user.email || '',
                    age: response.data.user.age || '',
                    occupation: response.data.user.occupation || '',
                    bio: response.data.user.bio || '',
                    avatar: response.data.user.avatar_url || null,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data. Please try again.');
            } finally {
                setLoading(false); // ตั้งค่า loading เป็น false หลังจากดึงข้อมูล
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, avatar: file }); // เก็บไฟล์จริง
        } else {
            // If no file is selected (input cleared), do not change avatar
            // Do nothing, keep current avatar
        }
    };
    
    const handleFormSubmit = async (e) => {
    e.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('age', formData.age ? formData.age : '0'); // ใช้ 0 ถ้าค่าว่าง
        formDataToSubmit.append('occupation', formData.occupation);
        formDataToSubmit.append('bio', formData.bio);
        console.log('Submitting formData:', formDataToSubmit);

        // Only append avatar if user selected a new file
        if (formData.avatar instanceof File) {
            formDataToSubmit.append('avatar', formData.avatar);
        }
    
        try {
            const response = await axiosInstance.put(`/edit-profile/${userId}`, formDataToSubmit, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            if (response.status === 200) {
                alert('Profile updated successfully!');
                navigate(`/profile/${userId}`);
                const avatarUrl = response.data.avatar;
    
                // Update localStorage
                localStorage.setItem('name', formData.name);
                localStorage.setItem('email', formData.email);
                localStorage.setItem('age', formData.age ? formData.age : '0'); // Update localStorage ด้วย 0 ถ้าค่าว่าง
                localStorage.setItem('avatar_url',avatarUrl);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response) {
                setError(`Failed to update profile: ${error.response.data.message}`);
            } else if (error.request) {
                setError('No response from server. Please try again.');
            } else {
                setError('Error in request. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    // ตรวจสอบว่าค่า avatar เป็นไฟล์จริงหรือไม่
    const avatarUrl = formData.avatar instanceof File
        ? URL.createObjectURL(formData.avatar) // ถ้าเป็นไฟล์จริง สร้าง URL
        : formData.avatar || '/default-avatar-url'; // ถ้าไม่ใช่ให้ใช้ URL ที่ตั้งไว้

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 500, padding: 4, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center' }}>
                    Edit Profile
                </Typography>

                {/* Avatar Section */}
                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', marginBottom: 2 }}>
                    <Avatar
                        alt="Profile Avatar"
                        src={avatarUrl} // ใช้ avatarUrl แทน
                        sx={{
                            width: 120,
                            height: 120,
                            cursor: 'pointer',
                            transition: '0.3s ease',
                            '&:hover': {
                                opacity: 0.7,
                            },
                        }}
                        onClick={() => document.getElementById('avatar-upload').click()}
                    />
                    <input
                        id="avatar-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </Box>

                {error && (
                    <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        variant="standard"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="standard"
                        value={formData.email}
                        disabled
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Age"
                        name="age"
                        variant="standard"
                        value={formData.age}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Occupation"
                        name="occupation"
                        variant="standard"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        variant="standard"
                        value={formData.bio}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        multiline
                        minRows={1}
                        sx={{ overflow: 'auto', wordWrap: 'break-word' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button variant="contained" color="secondary" onClick={() => navigate(`/profile/${userId}`)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Save Changes
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
