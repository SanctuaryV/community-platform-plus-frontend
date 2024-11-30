module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',  // ใช้ babel-jest แปลงไฟล์ .js, .jsx
    },
    testEnvironment: 'jsdom', // สภาพแวดล้อมการทดสอบ
  };
  