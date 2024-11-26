import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// สร้างธีมที่กำหนดฟอนต์ Georgia
const theme = createTheme({
    typography: {
        fontFamily: '"Georgia", serif',
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 8,
    boxShadow: theme.shadows[3],
}));

function StoryPolicy() {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <StyledPaper sx={{ maxWidth: 800, width: '100%' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    color= '#4CAF50'
                >
                    <LockIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Privacy Policy
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body1" paragraph>
                    <strong>What the Privacy Policy Covers</strong>
                </Typography>
                <Typography variant="body2">
                    <ul>
                        <li>Device Information Collected: Characteristics of the device and software on the device (such as phone, computer)</li>
                        <li>Information about location</li>
                        <li>Information about the network you connect to, such as IP address</li>
                        <li>Information from cookies and similar technologies</li>
                        <li>Cross-Border Data Processing</li>
                    </ul>
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                    Data Collection
                </Typography>
                <Typography variant="body2" paragraph>
                    We collect information when you use our services, including personal details and browsing data.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                    Usage of Data
                </Typography>
                <Typography variant="body2" paragraph>
                    Your data is used to improve our services, ensure security, and provide a personalized experience.
                </Typography>
                <Typography variant="body2" paragraph>
                    To provide services in accordance with the terms of use, such as allowing you to share information and connect with family and friends, even from different countries.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="body2" paragraph>
                    <strong>This policy aims to give users control over their data and transparency regarding data practices.</strong>
                </Typography>
                <Divider sx={{ my: 3 }} />
            </StyledPaper>
        </Box>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <StoryPolicy />
        </ThemeProvider>
    );
}
