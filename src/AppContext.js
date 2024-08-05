import React, { createContext, useReducer } from 'react';

const initialState = {
    user: null,
    books: [],
    filteredBooks: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_BOOKS':
            return { ...state, books: action.payload };
        case 'SET_FILTERED_BOOKS':
            return { ...state, filteredBooks: action.payload };
        default:
            return state;
    }
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
