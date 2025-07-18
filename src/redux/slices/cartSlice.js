import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryID: 0,
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action) {
            const findItem = state.items.find((obj => obj.id === action.payload.id));
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count;
            }, 0);
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj => obj.id === action.payload.id));
            if (findItem) {
                findItem.count--;
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
})

export const {addItem, minusItem, removeItem, clearItem} = cartSlice.actions;

export default cartSlice.reducer;