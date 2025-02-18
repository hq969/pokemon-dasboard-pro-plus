import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
    name: string;
}

interface LocalStorageState {
    favItems: {};
}

const getItemsFromLocalStorage = (): {} => {
    const storedItems = localStorage.getItem('favItems');
    return storedItems ? JSON.parse(storedItems) : {};
  };

const initialState: LocalStorageState = {
    favItems: getItemsFromLocalStorage(),
};

const favLocalStorageSlice = createSlice({
    name: 'favLocalStorage',
    initialState,
    reducers: {
        toggleFav: (state, action: PayloadAction<Pokemon>) => {
            const name = action.payload.name; // Access the 'name' property of the 'action.payload'
            const items: { [key: string]: string } = { ...state.favItems };
            if (items[name]) {
                delete items[name];
            } else {
                items[name] = name;
            }
            localStorage.setItem('favItems', JSON.stringify(items));
            state.favItems = items;
        },
    },
});

export const { toggleFav } = favLocalStorageSlice.actions;
export default favLocalStorageSlice.reducer;