import React, { useEffect, useRef, useState } from 'react'
import {
    Box,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem
} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useDrag } from "react-dnd";
import type { itemInterface } from "../../redux/slices/taskSlice"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteTaskFromDatabase, assignUserDatabase } from '../../redux/slices/taskSlice'
import type { user as userType } from '../../redux/slices/authSlice'
import { getUserWithId } from '../../redux/slices/authSlice'

type props = {
    task: itemInterface
    index: number
}

export default function Card({ index, task }: props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [curUser, setCurUser] = useState<userType | undefined>(undefined)
    const open = Boolean(anchorEl);
    const user = useAppSelector(state => state.auth.user) as userType

    const dispatch = useAppDispatch()
    const ref: any = useRef(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async (taskId: number, projectId: number) => {
        await dispatch(deleteTaskFromDatabase(taskId, projectId))
        handleClose()
    }

    const handleAssign = async (taskId: number, projectId: number) => {
        await dispatch(assignUserDatabase(taskId, projectId, user.id))
        handleClose()

    }

    useEffect(() => {

        const getTaskUser = async () => {
            setCurUser(await dispatch(getUserWithId(task.userId as number)))
        }

        if (task.userId != null) {
            getTaskUser()
        }

        if (task.userId == null) {
            setCurUser(undefined)
        }


    }, [task?.userId, dispatch])


    const [{ isDragging }, drag] = useDrag(() => ({
        type: "item",
        item: { id: task.id, dragStatusId: task.statusId, index: index, projectId: task.projectId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    drag((ref))

    return (
        <Box ref={ref} sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            backgroundColor: isDragging ? '#3b3f50' : 'white',
            borderRadius: '0.5rem',
            boxSizing: 'border-box',
            cursor: 'pointer',
            marginTop: '0.75rem',
        }}>

            <Box sx={{
                visibility: isDragging ? 'hidden' : 'visible'
            }}>


                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={() => handleAssign(task.id as number, task.projectId as number)}>
                        {task.userId === user.id ? <span>unassign</span> : <span>assign</span>}
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(task.id as number, task.projectId as number)}>delete</MenuItem>
                </Menu>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                    <Typography variant="caption">
                        <Box component="span" sx={{
                            backgroundColor: 'rgba(236,72,153)',
                            fontWeight: 700,
                            borderRadius: '9999px',
                            fontSize: '.75rem',
                            p: 0.5,
                            opacity: 0.5,
                        }}>
                            {task.type}
                        </Box>

                    </Typography>

                    <IconButton size="small" onClick={handleClick}>
                        <MoreVertIcon />

                    </IconButton>
                </Box>


                <Typography sx={{ marginTop: '0.75rem', lineHeight: '1.25rem', fontSize: '0.85rem', wordWrap: 'break-word' }}>
                    {task.content}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>

                    {curUser != null &&
                        <>
                            <Typography sx={{ fontSize: '.85rem', fontWeight: 900 }}>
                                {curUser.username}
                            </Typography>

                            <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src={curUser.photoUrl} />
                        </>
                    }
                </Box>

            </Box>

        </Box>

    )
}
