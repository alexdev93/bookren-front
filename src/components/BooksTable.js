import React, { useMemo } from "react";
import { useBooks } from "../contexts/BooksContext";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const BooksTable = () => {
  const { books, loading } = useBooks(); // Fetch books data and loading state

  // Define columns using useMemo
  const columns = useMemo(
    () => [
      {
        accessorKey: "title", // Assuming book has a 'title' field
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "author", // Assuming book has an 'author' field
        header: "Author",
        size: 150,
      },
      {
        accessorKey: "categoryId", // Assuming book has a 'categoryId' field
        header: "Category ID",
        size: 150,
      },
      {
        accessorKey: "isApproved", // Assuming book has an 'isApproved' field
        header: "Approved",
        size: 150,
      },
      {
        accessorKey: "createdAt", // Assuming book has a 'createdAt' field
        header: "Created At",
        size: 150,
      },
      {
        accessorKey: "updatedAt", // Assuming book has an 'updatedAt' field
        header: "Updated At",
        size: 150,
      },
    ],
    []
  );

  // Setup the table with useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: books || [], // Use books data from the context, default to empty array if undefined
  });

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return <MaterialReactTable table={table} />;
};

export default BooksTable;
