import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import AppTheme from './shared-theme/AppTheme';
import Authorization from './components/Authorization';
import Postlist from './components/Postlist';

export default function Post(props) {
  return (
    <AppTheme {...props}>
      <Authorization />
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Postlist /> 
      </Container>
      <Footer />
    </AppTheme>
  );
}
