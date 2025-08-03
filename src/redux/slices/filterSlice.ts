import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: FilterSliceState = {
    searchValue: "",
    categoryID: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'raiting',
    }
};

type Sort = {
    name: string;
    sortProperty: 'raiting' | 'price' | 'title';
}

interface FilterSliceState {
    searchValue: string;
    categoryID: number;
    currentPage: number;
    sort: Sort;
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID(state, action: PayloadAction<number>) {
            state.categoryID = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryID = Number(action.payload.categoryID);
        },


    }
})

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {setCategoryID, setSearchValue, setSort, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;