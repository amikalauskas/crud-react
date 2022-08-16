import React from 'react';
import { Paper, Button, Typography } from '@mui/material';

const Header = ({ openModal }) => (
  <Paper
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '320px',
      mt: 2,
      p: 3,
    }}
    onClick={openModal}
  >
    <Typography variant="h6">Various activities</Typography>
    <Button variant="contained" size="large" color="success">
      Create activity
    </Button>
  </Paper>
);

export default Header;
