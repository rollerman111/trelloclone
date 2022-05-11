import React, { useState } from 'react'
import {
    IconButton,
    Menu,
    MenuItem
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteDialog from './DeleteDialog'

type props = {
    id: number
}

export default function TableMenu({ id }: props) {
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <>
            <DeleteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} id={id} />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={() => {
                    setOpenDialog(true)
                    handleClose()
                }}>Delete</MenuItem>
                <MenuItem disabled>View members</MenuItem>

            </Menu>

            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

        </>
    )
}
