import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {categoryID, sortType, search, orderType, currentPage} = params;
        const {data} = await axios.get<Pizza[]>(
            `https://685a69ed9f6ef96111564553.mockapi.io/Items?page=${currentPage}&limit=4&${+categoryID > 0 ? `category=${categoryID}` : ''}&sortBy=${sortType}&order=${orderType}${search}`);
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

enum Status {
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success',

}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItem(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {  // ✅ Используем builder-нотацию
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const {setItem} = pizzaSlice.actions;
export default pizzaSlice.reducer;