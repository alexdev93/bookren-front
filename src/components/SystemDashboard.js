import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';

const SystemDashboard = () => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('/api/books');
            dispatch({ type: 'SET_BOOKS', payload: response.data });
        };

        fetchBooks();
    }, [dispatch]);

    const fetchFilteredBooks = async (filters) => {
        try {
            const response = await axios.get('/api/books', { params: filters });
            dispatch({ type: 'SET_FILTERED_BOOKS', payload: response.data });
        } catch (error) {
            console.error('Error fetching filtered books:', error);
        }
    };


    const columns = [
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'author', header: 'Author' },
        { accessorKey: 'category', header: 'Category' },
        { accessorKey: 'price', header: 'Price' },
    ];

    return (
        <MaterialReactTable
            columns={columns}
            data={state.books}
            enableSorting
            enableFiltering
            manualFiltering
            onFilterChange={fetchFilteredBooks}
        />
    );
};

export default SystemDashboard;
