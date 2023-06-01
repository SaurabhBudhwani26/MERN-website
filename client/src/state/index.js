import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    mode: "light",//for light-dark mode view
    user: null,//auth information
    token: null,//auth information
    posts: [],

};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
        setMode: (state) => {

            state.mode = state.mode === "light" ? "dark" : "light";
        // the first state.mode here represents the previous condition
        },

        setLogin: (state, action) =>{
         // action is where the se params for the function, here they 
         //call it payload
         
         state.user = action.payload.user;//we are sonding his user parameter in our payload
         state.token = action.payload.token;
         //action includes all the parameters
        },

        setLogout: (state) =>{
            state.user = null;
            state.token = null;
        },

        setFriends: (state,action) =>{

            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends non-exist")
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });

            state.posts = updatedPosts;
        }


    }

})
/* createSlice({ ... }): This function is part of Redux Toolkit and 
allows for creating a slice of the Redux store that includes the 
reducer logic and actions. 

reducers: { ... }: This field defines the reducer functions for 
the authentication slice.

setMode: (state) => { ... }: This is the reducer function that handles 
the setMode action. It takes the current state of the slice as a 
parameter and updates the mode property. If the current mode is "light", 
it changes it to "dark"; otherwise, it changes it to "light".

*/

//this would be stored in the global state. this kind of data will bw accessible throughout
//our entire application and we can grab it anywhere we want so we dont have
//so we dont have to pass in state and properties down to different compomnents

export const  { setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;