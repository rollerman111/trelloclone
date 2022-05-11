import React from 'react'
import { Toolbar, IconButton, Typography, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import constants from '../../constants/Constants'
import AccountMenu from './AccountMenu'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import type { user } from '../../redux/slices/authSlice'
import { authLogout } from '../../redux/slices/authSlice'
const { drawerWidth } = constants


type props = {
  open: boolean,
  handleDrawerOpen: () => void
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen }: props) {
  const user = useAppSelector(state => state.auth.user) as user
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    if (user && user.id) {
      console.log("reached-logout")
      await dispatch(authLogout(user.id)).unwrap()

    }
  }


  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Project Management
        </Typography>

        <Box sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>

          <AccountMenu handleLogout={handleLogout} photoUrl={user.photoUrl} />




        </Box>




      </Toolbar>
    </AppBar>
  )
}
