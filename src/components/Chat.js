import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const socket = io('http://localhost:8000');  // เชื่อมต่อกับ Socket.IO Server

export default function ChatTabs() {
  const [value, setValue] = useState('');  // เลือกห้องที่ผู้ใช้เลือก
  const [newMessage, setNewMessage] = useState('');  // ข้อความใหม่ที่ผู้ใช้พิมพ์
  const [users, setUsers] = useState([]);  // เก็บข้อมูลผู้ใช้ทั้งหมด
  const [rooms, setRooms] = useState([]);  // เก็บห้องที่ผู้ใช้สามารถเข้าร่วม
  const [messages, setMessages] = useState([]);  // เก็บข้อความในห้องที่เลือก

  // ดึงข้อมูลผู้ใช้เมื่อ component ถูก mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  // ดึงข้อมูลห้องแชทที่ผู้ใช้สามารถเข้าร่วม (ห้องที่มีอยู่)
  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch('/api/rooms');  // ดึงห้องจาก API
        const data = await response.json();
        const user = localStorage.getItem('user');
        
        if (Array.isArray(data) && data.length === 0) {
          // ถ้าไม่มีห้อง, สร้างห้องใหม่
          const newRoomResponse = await fetch('/api/rooms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user1Id: user, user2Id: 26 }),  // ส่ง ID ของผู้ใช้ที่ต้องการสร้างห้อง
          });
          
          const newRoom = await newRoomResponse.json();
          setRooms([newRoom]);  // ตั้งค่าห้องใหม่ที่สร้างขึ้น
        } else {
          setRooms(data);  // ถ้ามีห้องแล้ว, แสดงห้อง
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
    fetchRooms();
  }, []);

  // เมื่อผู้ใช้เลือกแท็บ (เข้าร่วมห้อง)
  useEffect(() => {
    if (value) {
      socket.emit('joinRoom', value);  // เข้าร่วมห้อง
      setMessages([]);  // ล้างข้อความเก่าทุกครั้งที่เลือกห้องใหม่
    }
  }, [value]);

  // รับข้อความจาก server (Real-Time)
  useEffect(() => {
    socket.on('receive_message', (messageData) => {
      if (messageData.roomId === value) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [value]);

  // เมื่อผู้ใช้เปลี่ยนแท็บ (เลือกห้อง)
  const handleChange = (event, newValue) => {
    setValue(newValue);  // เปลี่ยนห้องที่เลือก
  };

  // เมื่อผู้ใช้ส่งข้อความ
  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && value) {
      const messageData = {
        roomId: value,
        senderId: 1,  // หรือ ID ของผู้ใช้ที่ล็อกอิน
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      // ส่งข้อความไปยังเซิร์ฟเวอร์
      socket.emit('send_message', messageData);

      // รีเซ็ตข้อความ
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 315px)' }}>
      <CssBaseline />
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="chat tabs"
          sx={{ justifyContent: 'flex-start' }}
        >
          {/* แสดงห้องที่ผู้ใช้สามารถเลือกได้ */}
          {rooms.map((room) => (
            <Tab
              key={room.roomId}
              value={room.roomId}
              label={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar alt={room.name} src={room.avatarUrl || `https://i.pravatar.cc/150?img=${room.roomId}`} />
                  <Typography variant="caption">{room.name}</Typography>
                </Box>
              }
            />
          ))}
        </Tabs>

        <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto', maxHeight: '100vh' }}>
          {messages.map((chat, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: chat.senderId === 1 ? 'flex-end' : 'flex-start',
                marginBottom: 3,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  border: '1px solid',
                  borderRadius: '20px',
                  padding: '10px 15px',
                  maxWidth: '75%',
                  position: 'relative',
                }}
              >
                <Typography sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {chat.message}
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '-23px',
                    right: '10px',
                    fontSize: '0.75rem',
                    color: 'gray',
                  }}
                >
                  {chat.timestamp}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', padding: 2, alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #ddd' }}>
          <TextField
            label="Type a message"
            variant="standard"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            multiline
            minRows={1}
            maxRows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            sx={{ marginRight: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
