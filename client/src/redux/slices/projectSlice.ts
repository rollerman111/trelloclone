import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Dispatch } from 'redux';
import axios from "axios"
const API_URL = process.env.REACT_APP_API_HOST_URL || ""

export type projectObj = {
    id?: number
    createdBy?: number,
    title: string,
    description: string,
    endDate: string,
    priority: 'Critical' | 'High' | 'Medium' | 'Low',
    status: 'Not Active' | 'In Progress' | 'Completed',
    progress: number,
    favorite: boolean
}

export type updatedProjectObj = {
    projectId: number,
    updateVariables: {
        title?: string,
        description?: string,
        endDate?: string,
        priority?: 'Critical' | 'High' | 'Medium' | 'Low',
        status?: 'Not Active' | 'In Progress' | 'Completed',
        progress?: number,
        favorite?: boolean
    }
}

interface projectState {
    projects: projectObj[],
    projectFetching: boolean
}

const initialState: projectState = {
    projects: [],
    projectFetching: false

}

export const getProjects = createAsyncThunk<
    projectObj[],
    void,
    { rejectValue: void }
>(
    'api/projects',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/api/projects`);
            return data

        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }

)


export const projectSlice = createSlice({
    name: 'projectReducer',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<projectObj>) => {
            const projectObj = action.payload
            state.projects = [projectObj, ...state.projects]
        },
        update: (state, action: PayloadAction<projectObj>) => {
            const { id } = action.payload
            state.projects = state.projects.map((project) => {
                if (project.id === id) {
                    return action.payload
                } else {
                    return project
                }
            })
        },

        deleteP: (state, action: PayloadAction<number>) => {
            const id = action.payload
            state.projects = state.projects.filter(project => project.id !== id)
        }
    },
    extraReducers: (builder) => {

        // GET PROJECTS
        builder.addCase(getProjects.pending, (state: projectState) => {
            state.projectFetching = true

        })
        builder.addCase(getProjects.fulfilled, (state: projectState, action: PayloadAction<projectObj[]>) => {
            state.projects = action.payload
            state.projectFetching = false
        })
    }
})

// CREATE PROJECT

export const createProject = (projectObj: projectObj) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/api/projects`, projectObj)
        const data: projectObj = response.data.project
        dispatch(create(data))
    } catch (err: any) {
        console.log(err)
    }
}

export const updateProject = (updateProjectObj: updatedProjectObj) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.patch(`${API_URL}/api/projects`, updateProjectObj)
        const data: projectObj = response.data
        dispatch(update(data))
    } catch (err: any) {
        console.log(err)
    }
}

export const deleteProject = (id: number) => async (dispatch: Dispatch) => {
    try {
        await axios.delete(`${API_URL}/api/projects/${id}`)
        dispatch(deleteP(id))
    } catch (err) {
        console.log(err)
    }
}

export const { create, update, deleteP } = projectSlice.actions

export default projectSlice.reducer