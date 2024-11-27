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

const socket = io('/'); // เชื่อมต่อกับ Socket.IO Server

export default function ChatTabs() {
  const [value, setValue] = useState(''); // ผู้ที่เราติดตามที่เลือก
  const [newMessage, setNewMessage] = useState(''); // ข้อความใหม่
  const [following, setFollowing] = useState([]); // เก็บผู้ที่เราติดตาม
  const [messages, setMessages] = useState([]); // เก็บข้อความ
  const [roomId, setRoomId] = useState(''); // เก็บ roomId แยกต่างหาก

  const getOrCreateRoom = async (userId, otherUserId) => {
    try {
      const response = await fetch('/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, otherUserId }), // ส่งข้อมูล userId และ otherUserId
      });

      if (response.ok) {
        const data = await response.json();
        return data.roomId; // คืนค่า roomId ที่ได้หรือสร้างใหม่
      } else {
        console.error('Error getting or creating room:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching room:', error);
    }
  };

  useEffect(() => {
    if (roomId) {
      // ดึงข้อความเก่าจากฐานข้อมูลเมื่อเข้าห้องแชท
      async function fetchMessages() {
        try {
          const response = await fetch('/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId })
          });

          if (response.ok) {
            const data = await response.json();

            // แปลงเวลาทุกข้อความให้แสดงแค่ชั่วโมง:นาที และเปลี่ยน sender_id เป็น senderId
            const updatedMessages = data.map(message => ({
              ...message,
              timestamp: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }));

            setMessages(updatedMessages); // เก็บข้อความที่แปลงเวลาแล้ว
          } else {
            console.error('Error fetching messages:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }

      fetchMessages();
    }
  }, [roomId]); // ดึงข้อมูลเมื่อ roomId เปลี่ยนแปลง


  useEffect(() => {
    // Scroll to bottom when messages change
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight; // เลื่อนข้อความไปยังด้านล่าง
    }
  }, [messages]); // ทำการเลื่อนเมื่อ messages เปลี่ยนแปลง



  // ดึงข้อมูลผู้ที่เราติดตาม
  useEffect(() => {
    async function fetchFollowing() {
      try {
        const userId = localStorage.getItem('user_id'); // ดึง userId จาก localStorage

        const response = await fetch('/following', { // ส่งข้อมูลไปยัง /api/following
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // ส่ง userId ใน body ของ request
        });

        // เช็คว่า response ถูกต้องหรือไม่
        if (response.ok) {
          const data = await response.json();
          setFollowing(data); // เก็บข้อมูลที่ได้มาใน state
        } else {
          console.error('Error fetching following:', response.statusText);
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
    setValue(newValue); // เปลี่ยนคนที่เลือกเป็น newValue (otherUserId)

    const userId = localStorage.getItem('user_id');
    const room = await getOrCreateRoom(userId, newValue); // ดึงห้องหรือสร้างห้องใหม่
    setRoomId(room); // ตั้งค่า roomId แยกต่างหาก

    if (room) {
      socket.emit('joinRoom', room); // เข้าร่วมห้องแชท
      setMessages([]); // ล้างข้อความเก่าเมื่อเปลี่ยนคนที่เลือก
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 315px)' }}>
      <CssBaseline />
      <Container>
        {/* Tabs แสดงคนที่เราติดตาม */}
        <Tabs
          value={value || false}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="chat tabs"
          variant="scrollable" // เปิดการเลื่อน
          scrollButtons="auto" // เพิ่มปุ่มเลื่อนถ้าจำเป็น
          sx={{
            overflowX: 'auto', // เปิดการเลื่อนแนวนอน
            whiteSpace: 'nowrap', // ป้องกันการบรรทัดใหม่
          }}
        >
          {following.map((follow) => (
            <Tab
              key={follow.userId}
              value={follow.userId}
              sx={{
                minWidth: '120px', // กำหนดความกว้างขั้นต่ำแต่ละ Tab
                textAlign: 'center', // จัดข้อความให้อยู่กลาง
              }}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt={follow.name}
                    src={follow.avatarUrl || ''}
                  />
                  <Typography variant="caption">{follow.name}</Typography>
                </Box>
              }
            />
          ))}
        </Tabs>

        {/* Messages Section */}
        <Box
          id="message-container"  // เพิ่ม id นี้เพื่ออ้างอิงใน useEffect
          sx={{
            flexGrow: 1,
            padding: 2,
            overflowY: 'auto',  // ให้สามารถเลื่อนข้อความได้
            height: '435px', // ค่า default
            '@media (max-width: 600px)': {
              height: 'calc(100vh - 470px)', // ปรับความสูงสำหรับมือถือ
            }
          }}
        >

          {/* ถ้าไม่มีข้อความ ให้แสดงข้อความ 'No messages yet' */}
          {messages.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px', color: 'gray' }}>
              No messages yet.
            </Typography>
          ) : (
            messages.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: chat.senderId === userId ? 'flex-end' : 'flex-start',
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
                    {chat.message} {/* ข้อความที่ส่ง */}
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
                    {chat.timestamp} {/* เวลา */}
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Input ส่งข้อความ */}
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
