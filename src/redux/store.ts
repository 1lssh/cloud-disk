import { configureStore } from "@reduxjs/toolkit";
import fileListReducer from '../components/FileList/fileItemSlice'

export const store = configureStore({
  reducer: {
    fileList: fileListReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch