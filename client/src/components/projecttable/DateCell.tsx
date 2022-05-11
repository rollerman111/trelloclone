import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import type { updatedProjectObj } from '../../redux/slices/projectSlice'
import { updateProject } from '../../redux/slices/projectSlice'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type props = {
    endDate: string,
    id: number
}

export default function DateCell({ endDate, id }: props) {
    const dispatch = useAppDispatch()
    const updateValue = (val: string) => {
        const updatedProj: updatedProjectObj = {
            projectId: id,
            updateVariables: {
                endDate: val
            }
        }
        dispatch(updateProject(updatedProj))
    }


    return (
        <>
            <DatePicker
                selected={new Date(moment(endDate).format("MM/DD/YYYY"))}
                onChange={(date: any) => updateValue(date)}
                minDate={new Date()}
                customInput={
                    <span>
                        {moment(endDate).format("MMMM DD YYYY")}
                    </span>

                }
            />
        </>

    )
}
