import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, CircularProgress, Paper, IconButton, Typography, Alert } from '@mui/material';
import { AddCircleOutline, DeleteForever } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Community() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // default is success

  // ฟังก์ชันสำหรับดึงข้อมูลกลุ่ม
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://community-platform-backend-34e598655132.herokuapp.com/getgroups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'fetch' }),
      });

      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      } else {
        console.error('Error fetching Communities');
      }
    } catch (error) {
      console.error('Error fetching Communities:', error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับการสร้างกลุ่มใหม่
  const handleCreateGroup = async () => {
    if (!name || !description) {
      setAlertMessage('Please provide both name and description for the group.');
      setAlertSeverity('error');
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('https://community-platform-backend-34e598655132.herokuapp.com/creategroups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, action: 'create' }),
      });

      if (response.ok) {
        const newGroup = await response.json();
        setGroups((prevGroups) => [...prevGroups, newGroup]);
        setName('');
        setDescription('');
        setAlertMessage('Community created successfully!');
        setAlertSeverity('success');
      } else {
        setAlertMessage('Error creating Community.');
        setAlertSeverity('error');
      }
    } catch (error) {
      setAlertMessage('Error creating Community.');
      setAlertSeverity('error');
    } finally {
      setCreating(false);
    }
  };

  // ฟังก์ชันสำหรับการลบกลุ่ม
  const handleDeleteGroup = async (groupId) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        const response = await fetch('https://community-platform-backend-34e598655132.herokuapp.com/deletegroup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupId, action: 'delete' }),
        });

        if (response.ok) {
          setGroups(groups.filter((group) => group.group_id !== groupId));
          setAlertMessage('Community deleted successfully!');
          setAlertSeverity('success');
        } else {
          setAlertMessage('Error deleting community.');
          setAlertSeverity('error');
        }
      } catch (error) {
        setAlertMessage('Error deleting community.');
        setAlertSeverity('error');
      }
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Communities
      </Typography>

      {/* แสดงการแจ้งเตือน */}
      {alertMessage && (
        <Alert severity={alertSeverity} sx={{ marginBottom: 2 }}>
          {alertMessage}
        </Alert>
      )}

      {/* แสดงการ์ดสำหรับแต่ละ Community */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.group_id}>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',  // จัดระเบียบเนื้อหาภายในการ์ด
                  height: '100%',  // ให้การ์ดมีความสูงเต็มที่
                  padding: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {group.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2, flexGrow: 1 }}>
                  {group.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link to={`/community/${group.group_id}`} style={{ textDecoration: 'none' }}>
                    <IconButton sx={{ marginLeft: 0 }}>
                      <AddCircleOutline />
                    </IconButton>
                  </Link>

                  <IconButton onClick={() => handleDeleteGroup(group.group_id)}>
                    <DeleteForever />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}

          {/* ฟอร์มสร้างกลุ่มใหม่ */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Create a New Community</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Group Name"
                  variant="standard"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Description"
                  variant="standard"
                  fullWidth
                  multiline
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateGroup}
                  disabled={creating}
                  sx={{ marginTop: 2 }}
                >
                  {creating ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Community'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
