import React, { useEffect, useState } from 'react'
import {
    Typography,
    Box,
    Button
} from '@mui/material'
import Column from './Column'
import type { statusInterface } from '../../redux/slices/taskSlice'
import { getTasks } from '../../redux/slices/taskSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

type props = {
    id: number
}

export default function Trello({ id }: props) {
    const [fetching, setFetching] = useState(true)
    const [replyForm, setReplyForm] = useState<number | null>(null)
    const { tasks, statuses } = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetch = async () => {
            await dispatch(getTasks(id)).unwrap()
            setFetching(false)
        }

        fetch()

    }, [dispatch, id])

    const setReplyFormStatus = (statusId: number | null) => {
        setReplyForm(statusId)
    }

    if (fetching) {
        return <Box>Loading...</Box>
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 32px - 80px)',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Team Project Board

                <Button sx={{ ml: 5 }} disabled component="span" variant="outlined">Add members</Button>
            </Typography>



            <Box sx={{
                display: 'flex',
                flexGrow: 1,
                mt: 2,
                gap: '20px'
            }}>
                {statuses.map((status: statusInterface) => {
                    const atasks = tasks.map((task, idx) => { return { task, idx } })
                    return <Column
                        projId={id}
                        key={status.id}
                        tasks={atasks}
                        title={status.name}
                        statusId={status.id}
                        replyForm={replyForm}
                        setReplyFormStatus={setReplyFormStatus}
                    />
                })}

            </Box>

        </Box>


    )
}
