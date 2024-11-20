import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import AppTheme from './shared-theme/AppTheme';
import Authorization from './components/Authorization';
import Profilelist from './components/Profilelist';
/*import Searchfunction from './components/Searchfunction';*/

export default function Search(props) {
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
                {/*<Searchfunction />*/}
                <Profilelist />
            </Container>
            <Footer />
        </AppTheme>
    );
}