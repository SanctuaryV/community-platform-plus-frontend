import * as React from 'react';
/*import Avatar from '@mui/material/Avatar';*/
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate

const userId = localStorage.getItem('user_id'); // ดึง userId จาก localStorage
/*const avatarUrl = localStorage.getItem('avatar_url');*/ // ดึง avatar_url จาก localStorage

const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('avatar_url');
    localStorage.removeItem('created');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('age');
    localStorage.removeItem('bio');
    localStorage.removeItem('occupation');
    localStorage.removeItem('token');
    window.location = '/Login'; // เปลี่ยนเส้นทางไปหน้า Login
};

export default function AvatarDropdownMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate(); // สร้าง instance ของ navigate

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        if (userId) {
            navigate(`/profile/${userId}`); // นำทางไปที่หน้าโปรไฟล์ด้วย userId
        }
        handleClose(); // ปิดเมนูหลังจากคลิก
    };

    return (
        <div>
            <IconButton onClick={handleClick} sx={(theme) => ({
            verticalAlign: 'bottom',
            display: 'inline-flex',
            width: { xs: '2.5rem', sm: '2.25rem', md: '2.25rem' },
            height: { xs: '2.5rem', sm: '2.25rem', md: '2.25rem' },
            borderRadius: (theme.vars || theme).shape.borderRadius,
            border: '1px solid',
            borderColor: (theme.vars || theme).palette.divider,
          })}>
                <AccountBoxIcon />
                {/*<Avatar
                    variant="rounded"
                    alt="User Avatar"
                    src={avatarUrl} 
                />*/}
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={goToProfile}> {/* ใช้ goToProfile แทน href */}
                    <Button color="primary" variant="contained" fullWidth>
                        Profile
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button color="primary" variant="outlined" fullWidth onClick={handleLogout}>
                        Logout
                    </Button>
                </MenuItem>
            </Menu>
        </div>
    );
}
