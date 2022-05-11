import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { createProject } from '../../redux/slices/projectSlice'
import type { user } from '../../redux/slices/authSlice'

type props = {
  open: boolean,
  handleClose: () => void
}

export default function CreateModalForm({ open, handleClose }: props) {
  const [date, setDate] = useState<Date>(new Date())
  const [status, setStatus] = useState<'Not Active' | 'In Progress' | 'Completed'>('Not Active')
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('Low')
  const user = useAppSelector(state => state.auth.user) as user
  const dispatch = useAppDispatch()

  const onSubmit = (event: any) => {

    event.preventDefault()
    const form = event.target
    const title = form.title.value
    const description = form.description.value

    const projectObject = {
      createdBy: user.id,
      title: title,
      description: description,
      endDate: date.toISOString(),
      priority: priority,
      status: status,
      progress: 0,
      favorite: false,

    }

    dispatch(createProject(projectObject))
    form.reset()
    closeModal()
  }

  const closeModal = () => {
    setStatus("Not Active")
    setPriority("Low")
    setDate(new Date())
    handleClose()

  }

  return (

    <Dialog open={open} onClose={closeModal}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>


        <DialogTitle>Create project form</DialogTitle>
        <IconButton onClick={() => closeModal()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>

        <Box component="form" onSubmit={onSubmit} autoComplete="off" sx={{
          display: 'flex',
          gap: 10
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              name="title"
              variant="outlined"
              placeholder="title"
              fullWidth
              required
              inputProps={{ maxLength: 25 }}
            />

            <TextField
              name="description"
              variant="outlined"
              label="description"
              multiline
              rows={6}
              fullWidth
              required
              inputProps={{ maxLength: 280 }}
            />

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disablePast
                label="Due date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={(newDate: any) => setDate(newDate)}
                renderInput={(params: any) => <TextField required {...params} fullWidth name="date" />}

              />
            </LocalizationProvider>

            <TextField
              select
              name="priority"
              label="priority"
              fullWidth
              required
              value={priority}
              onChange={(e: any) => setPriority(e.target.value)}
            >

              <MenuItem value="Low">
                Low
              </MenuItem>
              <MenuItem value="Medium" >
                Medium
              </MenuItem>
              <MenuItem value="High" >
                High
              </MenuItem>
              <MenuItem value="Critical" >
                Critical
              </MenuItem>

            </TextField>

            <TextField
              select
              name="status"
              label="status"
              fullWidth
              required
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}



            >

              <MenuItem value="Not Active" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Not active
                <Box component="span" sx={{ borderRadius: '50%', width: '20px', height: '20px', bgcolor: 'red' }}></Box>
              </MenuItem>
              <MenuItem value="In Progress" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                In progress
                <Box component="span" sx={{ borderRadius: '50%', width: '20px', height: '20px', bgcolor: 'blue' }}></Box>
              </MenuItem>
              <MenuItem value="Completed" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Completed
                <Box component="span" sx={{ borderRadius: '50%', width: '20px', height: '20px', bgcolor: 'green' }}></Box>
              </MenuItem>

            </TextField>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

              <Button type="submit" sx={{ color: 'green' }}>Create</Button>
              <Button onClick={() => closeModal()} sx={{ color: 'red' }}>Close</Button>
            </Box>
          </Box>

        </Box>

      </DialogContent>
    </Dialog>

  );
}
