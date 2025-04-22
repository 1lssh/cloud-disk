import { createSlice } from "@reduxjs/toolkit";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";

type listItemType = {
  url: string
  name: string
  date: string
}

type fileListType = {
  list: Array<listItemType>
}

// Начальное значение
const initialState: fileListType = {
  list: [],
};

const fileItemSlice = createSlice({
  name: 'fileList',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    getListItem: (state, action) => {
      state.list = [...state.list, action.payload]
    },
    deleteItem: (state, action) => {
      const fileRef = ref(storage, `images/${action.payload}`);
      // Delete the file
      deleteObject(fileRef).then(() => {


        alert('File deleteddd')
        // File deleted successfully
      }).catch((error) => {
        alert(error)
        // Uh-oh, an error occurred!
      }).finally(() => {
        console.log(state.list)
        state.list = state.list.filter(obj => obj.name !== action.payload)
        console.log(state.list)
      });
    }
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Пример с данными
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { getListItem, deleteItem } = fileItemSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default fileItemSlice.reducer;