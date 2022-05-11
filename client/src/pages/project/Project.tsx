import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/dashboard/Header'
import SidebarContainer from '../../components/dashboard/SidebarContainer'
import Trello from '../../components/trelloboard/Trello'
import { Main, DrawerHeader } from '../dashboard/StyledComponents'

export default function Project() {

    const { id } = useParams()
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <SidebarContainer open={open} handleDrawerClose={handleDrawerClose} />
            <Main open={open}>
                <DrawerHeader />
                <Trello id={parseInt(id as string, 10) as number} />

            </Main>
        </Box>
    );
}

