import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Dispatch } from 'redux';
import axios from "axios"
const API_URL = process.env.REACT_APP_API_HOST_URL || ""

export interface itemInterface {
    id?: number,
    projectId: number
    statusId: number,
    type: "Bug Fix" | "Feature" | "Prototype" | "Documentation" | "Other",
    content: string,
    userId?: number,

}

export interface statusInterface {
    id: number,
    name: "open" | "in progress" | "in review" | "done"

}

export interface taskState {
    tasks: itemInterface[],
    statuses: statusInterface[],
    isFetching: boolean,
}

const initialState: taskState = {
    tasks: [],
    statuses: [],
    isFetching: true,
}

const moveTasks = async (taskId: number, statusId: number, projectId: number) => {
    try {
        const body = {
            taskId: taskId,
            statusId: statusId,
            projectId: projectId
        }
        await axios.patch(`${API_URL}/api/tasks/`, body)

    } catch (err) {
        console.log(err)
    }
}

export const getTasks = createAsyncThunk<
    { tasks: itemInterface[], statuses: statusInterface[] },
    number,
    { rejectValue: void }
>(
    'api/tasks',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/tasks/${id}`);
            const tasks = response.data.tasks
            const statuses = response.data.statuses
            return { tasks, statuses }

        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const taskSlice = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {

        addTask: (state, action: PayloadAction<itemInterface>) => {
            state.tasks.push(action.payload)
        },

        deleteTask: (state, action: PayloadAction<[number]>) => {
            const [taskId] = action.payload
            state.tasks = state.tasks.filter((item: itemInterface) => item.id !== taskId)

        },

        assignUser: (state, action: PayloadAction<[number, number]>) => {
            const [taskId, userId] = action.payload
            state.tasks = state.tasks.map(task => {
                if (task.id === taskId && task.userId !== userId) {
                    task.userId = userId
                } else if (task.id === taskId && task.userId === userId) {
                    task.userId = undefined
                }
                return task
            })

        },

        onDrop: (state, action: PayloadAction<[number, number, number, number]>) => {
            const [id, dragStatusId, statusId, projectId] = action.payload
            moveTasks(id, statusId, projectId)
            state.tasks = state.tasks.map((item: itemInterface) => {
                if (item.id === id && item.statusId === dragStatusId) {
                    item.statusId = statusId
                }
                return item
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, state => {
            state.isFetching = true
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload.tasks
            state.statuses = action.payload.statuses
            state.isFetching = false

        })
        builder.addCase(getTasks.rejected, (state, action) => {
            console.log(action.payload)
        })
    }

})

export const addTaskToDatabase = (data: itemInterface) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/api/tasks`, data)
        const task: itemInterface = response.data.task
        dispatch(addTask(task))
    } catch (err) {
        console.log(err)
    }
}

export const deleteTaskFromDatabase = (taskId: number, projectId: number) => async (dispatch: Dispatch) => {
    try {
        const data: { data: { taskId: number, projectId: number } } = { data: { taskId, projectId } }
        await axios.delete(`${API_URL}/api/tasks`, data)

        dispatch(deleteTask([taskId]))


    } catch (err) {
        console.log(err)
    }
}

export const assignUserDatabase = (taskId: number, projectId: number, userId: number) => async (dispatch: Dispatch) => {
    try {
        const data: { taskId: number, projectId: number } = { taskId, projectId }
        await axios.put(`${API_URL}/api/tasks`, data)
        dispatch(assignUser([taskId, userId]))
    } catch (err) {
        console.log(err)
    }
}

export const { onDrop, addTask, deleteTask, assignUser } = taskSlice.actions

export default taskSlice.reducer