import React, { useState } from 'react'
import {
    Box,
    TextField,
    MenuItem,
    Button
} from '@mui/material'
import { addTaskToDatabase } from '../../redux/slices/taskSlice'
import { useAppDispatch } from '../../redux/hooks'

type props = {
    statusId: number,
    projectId: number,
    setReplyFormStatus: (statusId: number | null) => void
}

export default function AddCard({ statusId, projectId, setReplyFormStatus }: props) {
    const [type, setType] = useState<"Bug Fix" | "Feature" | "Prototype" | "Documentation" | "Other">("Bug Fix")
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch()

    const onSubmit = (event: any) => {
        event.preventDefault()
        dispatch(addTaskToDatabase({ statusId, projectId, type, content }))
        setReplyFormStatus(null)
    }

    return (
        <Box component="form" onSubmit={onSubmit} sx={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxSizing: 'border-box',
            cursor: 'pointer',
            marginTop: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'


        }}>

            <TextField
                select
                name="type"
                onChange={(event: any) => setType(event.target.value)}
                fullWidth
                value={type}
                placeholder="type"
                required

            >

                <MenuItem value="Bug Fix">
                    Bug Fix
                </MenuItem>
                <MenuItem value="Feature">
                    Feature
                </MenuItem>
                <MenuItem value="Prototype">
                    Prototype
                </MenuItem>

                <MenuItem value="Documentation">
                    Documentation
                </MenuItem>

                <MenuItem value="Other">
                    Other
                </MenuItem>
            </TextField>

            <TextField
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={3}
                multiline
                name="content"
                fullWidth
                placeholder="content"
                inputProps={{
                    maxLength: 250,
                    minLength: 4
                }}
                required
            />

            <Button type="submit">Add Card</Button>

        </Box>
    );
}