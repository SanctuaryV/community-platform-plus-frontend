import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import AppTheme from './shared-theme/AppTheme';
import Authorization from './components/Authorization';
import Chat from './components/Chat';

export default function Message(props) {
    return (
        <AppTheme {...props}>
            <Authorization />
            <CssBaseline enableColorScheme />
            <AppAppBar />
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', overflowY: 'auto', flexDirection: 'column', mt: 16, mb: 2, gap: 4 }}
            >
                <Chat />
            </Container>
            <Footer />
        </AppTheme>
    );
}