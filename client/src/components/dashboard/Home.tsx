
import React, { useEffect, useState, useCallback } from 'react'
import {
  Typography,
  Box,
  Button
} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import type { user } from '../../redux/slices/authSlice'
import CreateModalForm from '../projecttable/CreateModalForm'
import { getProjects } from '../../redux/slices/projectSlice'
import CircularProgress from '@mui/material/CircularProgress';
import ProjectTable from '../projecttable/ProjectTable'

type totals = {
  completed: number,
  inProgress: number,
  notActive: number
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const user = useAppSelector(state => state.auth.user) as user
  const projects = useAppSelector(state => state.project.projects)
  const projectFetching = useAppSelector(state => state.project.projectFetching)
  const dispatch = useAppDispatch()
  const [totals, setTotals] = useState<totals>({ completed: 0, inProgress: 0, notActive: 0 })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAll = async () => {
      await dispatch(getProjects())
    }
    fetchAll()
  }, [dispatch])

  const updateTotals = useCallback(() => {
    const totalsCopy: { completed: number, inProgress: number, notActive: number } = {
      completed: 0,
      inProgress: 0,
      notActive: 0
    }
    for (const o of projects) {
      if (o.status === "Completed") {
        totalsCopy.completed += 1
      } else if (o.status === "Not Active") {
        totalsCopy.notActive += 1
      } else {
        totalsCopy.inProgress += 1
      }
    }
    setTotals(totalsCopy)

  }, [projects])

  useEffect(() => {
    updateTotals()
  }, [projects, updateTotals])

  return (
    <>

      <CreateModalForm open={open} handleClose={handleClose} />

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h4">
          Welcome back {user.username}
        </Typography>

        <Button variant="outlined" onClick={handleClickOpen}>Create new project</Button>
      </Box>

      {projectFetching ?

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%'
        }}>
          <CircularProgress />

        </Box>
        :

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5
        }}>

          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {projects.length} projects, {totals.completed} completed, {totals.inProgress} in progress, {totals.notActive} not active
          </Typography>

          <ProjectTable projects={projects} />


        </Box>
      }

    </>
  )
}

