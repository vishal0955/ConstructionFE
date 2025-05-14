import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";


export const CreateSWMSHazard = createAsyncThunk("createSWMSHazard", async(FormData, thunkAPI) => {
    console.log(FormData)
    try{
        const response  = await axiosInstance.post(`${apiUrl}/hazard`, FormData);
        console.log(response.data);
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error creating SWMS Hazard")
    }
})


const initialState = {
    swmshazard: [],
    loading: false,
    error: null
}

const  swmshazardSlice = createSlice({
    name: "swmshazard",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
           .addCase( CreateSWMSHazard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase( CreateSWMSHazard.fulfilled, (state, action) => {
            state.loading = false;
            state.swmshazard.push(action.payload);
        })
        .addCase( CreateSWMSHazard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

export default swmshazardSlice.reducers;