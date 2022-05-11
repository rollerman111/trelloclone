import React, { useRef } from 'react'
import {
    Box,
    Typography,
    IconButton,
} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Card from './Card'
import type { itemInterface } from '../../redux/slices/taskSlice'
import { useDrop } from "react-dnd";
import { onDrop } from '../../redux/slices/taskSlice'
import { useAppDispatch } from '../../redux/hooks'
import AddCard from './AddCard'

type props = {
    title: string,
    tasks: {
        task: itemInterface,
        idx: number
    }[],
    statusId: number,
    setReplyFormStatus: (statusId: number | null) => void,
    replyForm: number | null,
    projId: number
}

export default function Column({ title, tasks, statusId, setReplyFormStatus, replyForm, projId }: props) {
    const dispatch = useAppDispatch()
    const columnRef: any = useRef(null)

    const handleClickOpen = () => {
        setReplyFormStatus(statusId)
    };

    const [, drop]: any = useDrop({
        accept: 'item',
        canDrop: ({ dragStatusId }: { dragStatusId: number }, monitor) => {
            return dragStatusId !== statusId
        },
        drop: ({ id, dragStatusId, projectId }: { id: number, dragStatusId: number, projectId: number }) => {
            dispatch(onDrop([id, dragStatusId, statusId, projectId]))
        }
    })

    drop(columnRef)

    return (
        <Box ref={columnRef} sx={{
            display: 'flex',
            flexDirection: 'column',
            width: "18rem",
            backgroundColor: '#ebecf0',
            p: 1

        }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography variant="subtitle1" sx={{ pl: 2 }}>
                    {title}
                </Typography>

                <IconButton onClick={() => handleClickOpen()}>
                    <AddBoxIcon />
                </IconButton>

            </Box>

            {replyForm === statusId &&
                <AddCard statusId={statusId} projectId={projId} setReplyFormStatus={setReplyFormStatus} />
            }


            {tasks.map(({ task, idx }) => {
                if (task.statusId === statusId) {
                    return <Card index={idx} key={task.id} task={task} />
                }
                return <></>
            }
            )}


        </Box>
    )
}
