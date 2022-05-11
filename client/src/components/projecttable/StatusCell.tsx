import React from 'react'
import {
    Typography,
    Menu,
    MenuItem
} from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import type { updatedProjectObj } from '../../redux/slices/projectSlice'
import { updateProject } from '../../redux/slices/projectSlice'

type props = {
    status: "Not Active" | "In Progress" | "Completed",
    id: number
}

export default function StatusCell({ status, id }: props) {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const updateValue = (val: "Not Active" | "In Progress" | "Completed", id: number) => {

        if (val === status) {
            handleClose()
            return
        }

        const updatedProj: updatedProjectObj = {
            projectId: id,
            updateVariables: {
                status: val
            }
        }

        dispatch(updateProject(updatedProj))
        handleClose()


    }

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
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
                <MenuItem onClick={() => updateValue("Not Active", id)}>Not Active</MenuItem>
                <MenuItem onClick={() => updateValue("In Progress", id)}>In Progress</MenuItem>
                <MenuItem onClick={() => updateValue("Completed", id)}>Completed</MenuItem>
            </Menu>

            <Typography component={'span'} onClick={handleClick}>

                {status}

            </Typography>
        </>

    )
}
