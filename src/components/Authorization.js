import { useEffect } from 'react';

export default function Authorization() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // ถ้าไม่มี token ใน localStorage ให้เปลี่ยนเส้นทางไปที่ Login
            window.location = '/Login';
            return;
        }

        // ทำการตรวจสอบการยืนยันตัวตน
        fetch('https://community-platform-backend-34e598655132.herokuapp.com/authen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
        .then((response) => {
            if (!response.ok) {
                // ถ้าการตอบกลับไม่สำเร็จ ให้แสดงข้อผิดพลาดและเปลี่ยนเส้นทางไปที่หน้า Login
                throw new Error('Authentication failed');
            }
            return response.json(); // แปลงข้อมูลที่ตอบกลับเป็น JSON
        })
        .then((data) => {
            if (data.status === 'ok') {
                console.log('Authentication successful');
            } else {
                console.log('Authentication failed');
                localStorage.removeItem('user_id');
                localStorage.removeItem('avatar_url');
                localStorage.removeItem('created');
                localStorage.removeItem('email');
                localStorage.removeItem('name');
                localStorage.removeItem('age');
                localStorage.removeItem('bio');
                localStorage.removeItem('occupation');
                localStorage.removeItem('token'); // ลบ token
                window.location = '/Login'; // เปลี่ยนเส้นทางไปที่หน้า Login
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            localStorage.removeItem('token'); // ลบ token เมื่อเกิดข้อผิดพลาด
            window.location = '/Login'; // เปลี่ยนเส้นทางไปที่หน้า Login
        });
    }, []); // ใช้ [] เพื่อให้ useEffect ทำงานแค่ครั้งเดียวเมื่อโหลดคอมโพเนนต์

    return null; // คอมโพเนนต์นี้ไม่ต้องแสดงอะไร
}

