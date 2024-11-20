import React, { useState } from 'react';
import ProfileList from './Profilelist';
import { TextField, Button, Typography } from '@mui/material';

export default function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // ทำการค้นหาตาม query (สามารถเชื่อมต่อ API ตามต้องการ)
    console.log('Searching for users with query:', query);
  };

  return (
    <div>
      <TextField
        label="Search Users"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {query && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Showing results for: {query}
        </Typography>
      )}

      <ProfileList />  {/* แสดงผลลัพธ์ */}
    </div>
  );
}
