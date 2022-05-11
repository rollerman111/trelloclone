import React from 'react'
import {
    Box,
    Typography,
    Paper
} from '@mui/material';

export default function SideBackground() {

    return (
        <Paper sx={{
            position: 'relative',
            color: '#fff',
            backgroundSize: 'cover',
            backgroundImage: `linear-gradient(
          #3a8dffdb, 
          #86B9FF99), 
          url(https://res.cloudinary.com/dudegkgw9/image/upload/v1651386319/Banner-image-The-Importance-of-Project-Management_qygo2n.webp)`,
            height: '100vh',
            opacity: 0.85
        }}>


            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>

                <Typography variant="h4" sx={{
                    position: 'relative'
                }} align="center">
                    <img alt="banner" src={'https://res.cloudinary.com/dudegkgw9/image/upload/v1651386691/icons8-project-64_rbfeip.png'} style={{
                        marginBottom: '20px',
                        width: '100px',
                        height: '100px'
                    }} /> <br />

                    Plan out your next project <br />
                    with us!
                </Typography>
            </Box>

        </Paper>
    );

}