import React from 'react'
import {
    IconButton,
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAppDispatch } from '../../redux/hooks'
import type { updatedProjectObj } from '../../redux/slices/projectSlice'
import { updateProject } from '../../redux/slices/projectSlice'
import StarIcon from '@mui/icons-material/Star';

type props = {
    favorite: boolean,
    id: number
}

export default function StatusCell({ favorite, id }: props) {
    const dispatch = useAppDispatch()

    const updateValue = (val: boolean, id: number) => {

        const updatedProj: updatedProjectObj = {
            projectId: id,
            updateVariables: {
                favorite: !val
            }
        }
        dispatch(updateProject(updatedProj))

    }

    return (

        <IconButton onClick={() => updateValue(favorite, id)}>
            {favorite ?
                <StarIcon sx={{ color: 'gold' }} />
                :
                <StarBorderIcon />
            }
        </IconButton>


    )
}
