import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { postSlice } from "./post";
import { userSlice } from "./user";

const initialState = {
  currentMenu : 'main'
}

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    changeMenu(state,action){
      state.currentMenu = action.payload;
    }
  }
})

const rootReducer = (state,action) => {
  if(action.type === HYDRATE){
    return {
      ...state,
      ...action.payload,
    }
  }
  
  return combineReducers({
    index: indexSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
  })(state, action);
}
export default rootReducer;