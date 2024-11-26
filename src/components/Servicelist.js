import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// สร้างธีมที่กำหนดฟอนต์ Georgia
const theme = createTheme({
    typography: {
        fontFamily: '"Georgia", serif',
    },
});

// Custom Styling for the Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 8,
    boxShadow: theme.shadows[3],
    maxWidth: 800,
    margin: 'auto',
}));

export default function TermsOfService() {

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                }}
            >
                <StyledPaper>
                    {/* Title Section */}
                    <Typography
                        variant="h4"
                        color= '#4CAF50'
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        <AssignmentIcon sx={{ mr: 1 }} />
                        Terms of Service
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Content Section */}
                    <Typography variant="body1" paragraph>
                        <strong>Welcome to Our Platform!</strong> These terms and conditions outline the rules and regulations for the use of our services. By accessing our platform, you accept these terms in full.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        1. General Terms
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Users praise their friends in the community.<br />
                        - Unauthorized use of this website may give rise to a claim for damages or be a criminal offense.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        2. User Responsibilities
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - You are responsible for maintaining the confidentiality of your account.<br />
                        - Do not misuse the service for illegal purposes or violate any applicable laws.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        3. Privacy Policy
                    </Typography>
                    <Typography variant="body2" paragraph>
                        - Your privacy is important to us. Please review our Privacy Policy to understand how we handle your information.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Acknowledgment */}
                    <Typography variant="body2" align="center" sx={{ fontStyle: 'italic' }}>
                    <strong>By continuing to use our services, you agree to be bound by these terms.</strong>
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                </StyledPaper>
            </Box>
        </ThemeProvider>
    );
}
