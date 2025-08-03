import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {categoryID, sortType, search, orderType, currentPage} = params;
        const {data} = await axios.get(
            `https://685a69ed9f6ef96111564553.mockapi.io/Items?page=${currentPage}&limit=4&${categoryID > 0 ? `category=${categoryID}` : ''}&sortBy=${sortType}&order=${orderType}${search}`);
        return data;
    },
);

type Pizza = {
    id: string;
    types: number[];
    title: string;
    imageUrl: string;
    price: number;
    sizes: number[];
}

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItem(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {  // ✅ Используем builder-нотацию
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const {setItem} = pizzaSlice.actions;
export default pizzaSlice.reducer;