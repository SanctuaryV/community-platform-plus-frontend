import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { axiosInstance, ENDPOINTS} from '../api';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Connect Socket.IO to configured backend base URL (or relative '/')
const socket = io('/', {
  path: '/socket.io',
  transports: ['websocket','polling'],
  withCredentials: true,
}); // เชื่อมต่อกับ Socket.IO Server

export default function ChatTabs() {
  const [value, setValue] = useState(''); // ผู้ที่เราติดตามที่เลือก
  const [newMessage, setNewMessage] = useState(''); // ข้อความใหม่
  const [following, setFollowing] = useState([]); // เก็บผู้ที่เราติดตาม
  const [messages, setMessages] = useState([]); // เก็บข้อความ
  const [roomId, setRoomId] = useState(''); // เก็บ roomId แยกต่างหาก

  const getOrCreateRoom = async (userId, otherUserId) => {
    try {
  const response = await axiosInstance.post(ENDPOINTS.ROOM, { userId, otherUserId });
  const data = response.data;
  return data.roomId; // คืนค่า roomId ที่ได้หรือสร้างใหม่
    } catch (error) {
      console.error('Error fetching room:', error);
    }
  };

  useEffect(() => {
    if (roomId) {
      // ดึงข้อความเก่าจากฐานข้อมูลเมื่อเข้าห้องแชท
      async function fetchMessages() {
        try {
          const response = await axiosInstance.post(ENDPOINTS.MESSAGES, { roomId });
          const data = response.data;

          // แปลงเวลาทุกข้อความให้แสดงแค่ชั่วโมง:นาที และเปลี่ยน sender_id เป็น senderId
          const updatedMessages = data.map(message => ({
            ...message,
            timestamp: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));

          setMessages(updatedMessages); // เก็บข้อความที่แปลงเวลาแล้ว
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }

      fetchMessages();
    }
  }, [roomId]); // ดึงข้อมูลเมื่อ roomId เปลี่ยนแปลง


  useEffect(() => {
    // Scroll to bottom when messages change
    const messageList = document.getElementById('message-list');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight; // เลื่อนข้อความไปยังด้านล่าง
    }
  }, [messages]); // ทำการเลื่อนเมื่อ messages เปลี่ยนแปลง



  // ดึงข้อมูลผู้ที่เราติดตาม
  useEffect(() => {
    async function fetchFollowing() {
      try {
        const userId = localStorage.getItem('user_id'); // ดึง userId จาก localStorage

  const response = await axiosInstance.post(ENDPOINTS.FOLLOWING, { userId });

  const data = response.data;
  setFollowing(data); // เก็บข้อมูลที่ได้มาใน state
  // auto-select first contact when following list arrives
  if (data && data.length > 0) {
    setValue(String(data[0].userId));
  }
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    }
    fetchFollowing();
  }, []);

  // เมื่อเลือกผู้ที่เราติดตาม
  useEffect(() => {
    if (value) {
      const userId = localStorage.getItem('user_id');
      const otherUserId = value;

      // ดึงห้องแชทหรือสร้างใหม่ถ้ายังไม่มี
      async function fetchRoom() {
        const room = await getOrCreateRoom(userId, otherUserId);
        setRoomId(room); // ตั้งค่า roomId แยกต่างหาก

        if (room) {
          socket.emit('joinRoom', room); // เข้าร่วมห้องแชท
          setMessages([]); // ล้างข้อความเก่าเมื่อเปลี่ยนคนที่เลือก
        }
      }

      fetchRoom();
    }
  }, [value]);

  // รับข้อความแบบเรียลไทม์
  useEffect(() => {
    socket.on('receive_message', (messageData) => {
      if (messageData.roomId === roomId) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, messageData];
          return updatedMessages;
        });
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [roomId]); // เปลี่ยนการทำงานของ useEffect ตาม roomId แทน value

  const handleChange = async (event, newValue) => {
    // If the same contact was clicked again, do nothing
    if (newValue === value) return;
    setValue(newValue); // เปลี่ยนคนที่เลือกเป็น newValue (otherUserId)

    const userId = localStorage.getItem('user_id');
    const room = await getOrCreateRoom(userId, newValue); // ดึงห้องหรือสร้างห้องใหม่
    setRoomId(room); // ตั้งค่า roomId แยกต่างหาก

    if (room) {
      socket.emit('joinRoom', room); // เข้าร่วมห้องแชท
    }
  };

  const handleSendMessage = () => {
    const senderId = localStorage.getItem('user_id'); // ดึง userId จาก localStorage
    if (newMessage.trim() !== '' && roomId) {
      const messageData = {
        roomId: roomId,
        senderId: senderId,  // ใช้ userId ที่ดึงมาแทน 1
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      socket.emit('send_message', messageData); // ส่งข้อความไปยังเซิร์ฟเวอร์
      setNewMessage(''); // ล้างข้อความ
    }
  };

  // ดึง userId จาก localStorage
  const userId = localStorage.getItem('user_id');
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 80px)', paddingTop: 2, paddingBottom: 2, overflow: 'hidden' }}>
  {/* Left sidebar (contacts) */}
  <Box sx={{ width: 220, minWidth: 180, bgcolor: 'background.paper', borderRadius: 1, p: 1, height: 'calc(100vh - 140px)', overflowY: 'auto' }}>
          <Tabs
            orientation="vertical"
            value={value || false}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="chat tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ height: '100%', alignItems: 'flex-start' }}
          >
            {following.map((follow) => (
              <Tab
                key={follow.userId}
                value={String(follow.userId)}
                sx={{ alignItems: 'flex-start', textTransform: 'none', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                label={
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Avatar alt={follow.name} src={follow.avatarUrl || ''} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      <Typography variant="body2" sx={{ fontWeight: '600' }}>{follow.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{follow.lastMessage || ''}</Typography>
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>

        {/* Right: chat column */}
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, bgcolor: 'transparent', height: 'calc(100vh - 140px)' }}>
          {/* Messages Section */}
          <Box id="message-container" sx={{ flex: 1, p: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Box id="message-list" sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', pb: 6 }}>

              {/* wrapper so content sits at bottom when few messages, but scrolls when overflow */}
              <Box id="messages-wrapper" sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto', px: 1 }}>

                {messages.length === 0 ? (
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray' }}>
                      No messages yet.
                    </Typography>
                  </Box>
                ) : (
                  messages.map((chat, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: chat.senderId === userId ? 'flex-end' : 'flex-start' }}>
                      <Box sx={{ display: 'flex', justifyContent: chat.senderId === userId ? 'flex-end' : 'flex-start', width: '100%' }}>
                        <Box
                          sx={{
                            borderRadius: '20px',
                            padding: '8px 14px',
                            maxWidth: '65%',
                            bgcolor: chat.senderId === userId ? 'primary.main' : 'background.paper',
                            color: chat.senderId === userId ? 'primary.contrastText' : 'text.primary',
                            boxShadow: chat.senderId === userId ? 3 : 0,
                            display: 'inline-block',
                          }}
                        >
                          <Typography sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: 1.4 }}>
                            {chat.message}
                          </Typography>
                        </Box>
                      </Box>
                      {/* timestamp shown outside bubble, small and muted */}
                      <Typography variant="caption" sx={{ color: 'gray', mt: 0.5, mb: 0.5, alignSelf: chat.senderId === userId ? 'flex-end' : 'flex-start' }}>
                        {chat.timestamp}
                      </Typography>
                    </Box>
                  ))
                )}

              </Box>
            </Box>
          </Box>

          {/* Input ส่งข้อความ */}
            <Box sx={{ display: 'flex', padding: 1.5, alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', bgcolor: 'background.paper', position: 'sticky', bottom: 0, zIndex: 2, boxShadow: '0 -6px 20px rgba(0,0,0,0.6)' }}>
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
        </Box>
      </Container>
    </Box>
  );
}
