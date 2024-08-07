import React, { useMemo } from "react";
import { useBooks } from "../contexts/BooksContext";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Typography, Paper, Box, CircularProgress } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const BookStatus = () => {
  const { books, loading } = useBooks();

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "No",
        size: 50,
      },
      {
        accessorKey: "id",
        header: "Book No",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => (
          <Box display="flex" alignItems="center">
            <CircleIcon
              style={{ color: cell.getValue() === "free" ? "blue" : "orange" }}
            />
            <Typography variant="body2" style={{ marginLeft: 8 }}>
              {cell.getValue()}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "owner.username",
        header: "Owner Name",
        size: 150,
        Cell: ({ cell }) => cell.getValue(),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 100,
        Cell: ({ cell }) => `$${cell.getValue()}`, // Format price as currency
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: books || [],
    enablePagination: false,
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper>
        <Typography variant="h6" component="h2" gutterBottom>
          Books Status
        </Typography>
        <MaterialReactTable table={table} />
      </Paper>
    </Box>
  );
};

export default BookStatus;
