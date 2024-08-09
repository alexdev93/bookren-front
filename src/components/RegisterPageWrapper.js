import React from 'react';
import { Box } from '@mui/material';

const RegisterPageWrapper = ({ children}) => {
    return (
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
            {/* Left Half */}
            <Box
                sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRight: '1px solid #ddd'
                }}
            >
                book photo
            </Box>

            {/* Right Half */}
            <Box
                sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default RegisterPageWrapper;
