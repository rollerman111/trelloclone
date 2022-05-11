import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, List, ListItemIcon, ListItemText, Divider } from '@mui/material'

import ListAltIcon from '@mui/icons-material/ListAlt';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';


export default function Sidebar() {
    return (
        <>
            <Divider />
            <List>
                <ListItem button component={Link} to="/" >
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Starred"} />
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon>
                        <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Upcoming"} />
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Profile"} />
                </ListItem>

            </List>
            <Divider />
        </>
    )
}
