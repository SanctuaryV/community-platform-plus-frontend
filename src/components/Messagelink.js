import * as React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';

export default function MessageLink() {
    return (
        <IconButton href='/message' sx={(theme) => ({
            verticalAlign: 'bottom',
            display: 'inline-flex',
            width: { xs: '2.5rem', sm: '2.25rem', md: '2.25rem' },
            height: { xs: '2.5rem', sm: '2.25rem', md: '2.25rem' },
            borderRadius: (theme.vars || theme).shape.borderRadius,
            border: '1px solid',
            borderColor: (theme.vars || theme).palette.divider,
          })}>
            <ChatIcon />
        </IconButton>
    )
}