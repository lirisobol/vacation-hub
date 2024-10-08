import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the filter's state.
export type FilterState = {
    selectedFilter: string | null; // can hold a string representing the current filter or be null if no filter is selected
};

// Define the initial state of the filter slice.
const initialState: FilterState = {
    selectedFilter: null, // initially no filter is selected
};

// Creating the slice using createSlice method from Redux Toolkit which handles immutability under the hood
const filterSlice = createSlice({
    name: 'filters',
    initialState, 
    reducers: { 
        setFilter(state, action: PayloadAction<string | null>) {
            state.selectedFilter = action.payload; // set a new filter
        },
        resetFilter(state) {
            state.selectedFilter = null; // reset the filter to no selection
        },        
    },
});

export const filterActionCreators = filterSlice.actions;
export const filterReducersContainer = filterSlice.reducer;
