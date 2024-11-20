import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { LogoNav } from '../CustomIcons';
import Avatar from './Avatar';
import MessageLink from './Messagelink';

const handleLogout = (event) => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('avatar_url');
  localStorage.removeItem('created');
  localStorage.removeItem('email');
  localStorage.removeItem('name');
  localStorage.removeItem('token');
  window.location = '/Login';
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const userId = localStorage.getItem('user_id');  // ดึง userId จาก localStorage

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <LogoNav />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" href='/'>
                Features
              </Button>
              <Button variant="text" color="info" size="small" href='/'>
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small" href='/'>
                Highlights
              </Button>
              <Button variant="text" color="info" size="small" href='/'>
                Pricing
              </Button>
              <Button variant="text" color="info" size="small" href='/profilelist'>
                Profilelist
              </Button>
              <Button variant="text" color="info" size="small" href='/'>
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <ColorModeIconDropdown />
            <MessageLink />
            <Avatar />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <MessageLink />
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>
                  <Button sx={{ display: 'flex', justifyContent: 'flex-start' }} href='/'>
                    Features
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ display: 'flex', justifyContent: 'flex-start' }} href='/'>
                    Testimonials
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ display: 'flex', justifyContent: 'flex-start' }} href='/'>
                    Highlights
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ display: 'flex', justifyContent: 'flex-start' }} href='/'>
                    Pricing
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ display: 'flex', justifyContent: 'flex-start' }} href='/profilelist'>
                    Profilelist
                  </Button>
                </MenuItem>
                <MenuItem >
                  <Button sx={{ display: 'flex', justifyContent: 'flex-start' }} href='/'>
                    Blog
                  </Button>
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth href={`/profile/${userId}`}>
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth onClick={handleLogout}>
                    Logout
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
