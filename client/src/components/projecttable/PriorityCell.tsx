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
    priority: string,
    id: number
}

export default function PriorityCell({ priority, id }: props) {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const updateValue = (val: "Critical" | "High" | "Medium" | "Low", id: number) => {

        if (val === priority) {
            handleClose()
            return
        }

        const updatedProj: updatedProjectObj = {
            projectId: id,
            updateVariables: {
                priority: val
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
                <MenuItem onClick={() => updateValue("Critical", id)}>Critical</MenuItem>
                <MenuItem onClick={() => updateValue("High", id)}>High</MenuItem>
                <MenuItem onClick={() => updateValue("Medium", id)}>Medium</MenuItem>
                <MenuItem onClick={() => updateValue("Low", id)}>Low</MenuItem>
            </Menu>

            <Typography component={'span'} onClick={handleClick}>

                {priority}

            </Typography>
        </>

    )
}
