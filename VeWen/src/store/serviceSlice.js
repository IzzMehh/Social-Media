import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import randomId from "../hooks/randomId.js";
import fetchAppwriteDataHook from "../hooks/fetchAppwriteDataHook.js";
import fetchAllPostDataHook from "../hooks/fetchAllPostDataHook.js";

const initialState = {
    cacheImagesid: randomId(),
    allPosts: [],
    allComments: [],
    usersProfile: [],
    deletedPost: [],
};

export const fetchAppwriteData = createAsyncThunk('service/fetchAppwriteData', async () => {
    const data = await fetchAppwriteDataHook();
    return data;
});

export const fetchAllPostData = createAsyncThunk('service/fetchAllPostData',async () =>{
    const data = await fetchAllPostDataHook()
    return data
})

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        regenerateId: (state) => {
            state.id = randomId();
        },
        addInDeletedList:(state,action)=>{
            state.deletedPost.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppwriteData.fulfilled, (state, action) => {
                state.allComments = action.payload.allComments;
                state.allPosts = action.payload.allPosts;
                state.usersProfile = action.payload.usersProfile;
            })
            .addCase(fetchAppwriteData.rejected, (state, action) => {
                console.error('Error fetching data:', action.error.message);
            })
            .addCase(fetchAllPostData.fulfilled, (state,action)=>{
                state.allPosts = action.payload.allPosts;
            })
            .addCase(fetchAllPostData.rejected, (state,action)=>{
                console.error('Error fetching data:', action.error.message)
            });
    },
});

export const { regenerateId,addInDeletedList,addInLikedList } = serviceSlice.actions;

export default serviceSlice.reducer;
