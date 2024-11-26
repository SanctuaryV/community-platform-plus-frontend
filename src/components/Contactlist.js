import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

// ข้อมูลของผู้พัฒนา
const developers = [
  {
    name: 'Anapat Vithsupalert',
    email: 'Anapat.Vithsupalert@g.swu.ac.th',
    avatar: '/img/Anapat.png',
    role: 'Full stack Developer',
  },
  {
    name: 'Worakamon Srireangmas',
    email: 'worakamon.ploy@g.swu.ac.th',
    avatar: '/img/Worakamon.jpg',
    role: 'Full stack Developer',
  },
];

const ContactUs = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      {/* Title Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 3,
        }}
      >
        Contact Us
      </Typography>

      {/* Developer Information Section */}
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          mb: 5,
          fontStyle: 'italic',
          color: '#666',
        }}
      >
        Development started in November 2024
      </Typography>

      {/* Cards for Developers */}
      <Grid container spacing={4} sx={{ maxWidth: 1000 }}>
        {developers.map((developer, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: '0.3s',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={developer.avatar}
                    alt={developer.name}
                    sx={{ width: 64, height: 64, marginRight: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {developer.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <PersonIcon sx={{ fontSize: 16, color: '#4CAF50', mr: 1 }} />
                  <strong>Role:</strong> {developer.role}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <EmailIcon sx={{ fontSize: 16, color: '#4CAF50', mr: 1 }} />
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${developer.email}`}
                    style={{ color: '#4CAF50', textDecoration: 'none' }}
                  >
                    {developer.email}
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          textAlign: 'center',
          color: '#777',
          borderTop: '1px solid #ddd',
          paddingTop: 2,
        }}
      >
      </Box>
    </Box>
  );
};

export default ContactUs;
