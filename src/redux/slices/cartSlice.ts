import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type CartItem = {
    id: string;
    size: number;
    types: string;
    title: string;
    imageUrl: string;
    price: number;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
    categoryID: number;

}

const initialState: CartSliceState = {
    categoryID: 0,
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + (obj.price * obj.count);
            }, 0);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
        },
        removeItem(state, action) {
            const removedItem = state.items.find(item => item.id === action.payload);
            if (removedItem) {
                state.totalPrice -= removedItem.price * removedItem.count;
                state.items = state.items.filter(item => item.id !== action.payload);
            }
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
});

// Типизированные селекторы
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((item: CartItem) => item.id === id);

export const selectCart = (state: RootState) => state.cart;

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;