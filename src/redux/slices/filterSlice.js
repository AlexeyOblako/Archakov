import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryID: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'raiting',
    }
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID(state, action) {
            state.categoryID = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryID = Number(action.payload.categoryID);
        },


    }
})

export const {setCategoryID, setSort, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;