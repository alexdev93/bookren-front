import React, { useMemo } from "react";
import { useBooks } from "../contexts/BooksContext";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  TableContainer,
  Stack,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const MyNewTitle = ({ text, variant }) => (
  <Typography
    variant={variant}
    style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "0.6rem",
    }}
  >
    {text}
  </Typography>
);

const BookStatus = () => {
  const { books, loading } = useBooks();

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "No",
        size: 30,
      },
      {
        accessorKey: "id",
        header: "Book No",
        size: 60, 
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 60, 
        Cell: ({ cell }) => (
          <Box display="flex" alignItems="center">
            <CircleIcon
              style={{
                color: cell.getValue() === "free" ? "blue" : "orange",
                fontSize: "0.6rem",
              }}
            />
            <Typography
              variant="body2"
              style={{ marginLeft: 2, fontSize: "0.6rem" }}
            >
              {cell.getValue()}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "owner.username",
        header: "Owner Name",
        size: 80,
        Cell: ({ cell }) => (
          <Typography style={{ fontSize: "0.6rem" }}>
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 30,
        Cell: ({ cell }) => (
          <Typography style={{ fontSize: "0.6rem" }}>
            ${cell.getValue()}
          </Typography>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: books || [],
    enablePagination: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    initialState: { density: "spacious" },
    options: {
      density: "compact", 
      tableLayout: "fixed", 
      sx: {
        "& .MuiTable-root": {
          fontSize: "0.6rem", 
        },
        "& .MuiTableCell-root": {
          padding: "2px",
          borderBottom: "1px solid #ddd",
        },
        "& .MuiTypography-root": {
          fontSize: "0.6rem", 
        },
        "& .MuiSvgIcon-root": {
          fontSize: "0.6rem", 
        },
      },
    },
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
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <MaterialReactTable table={table} />
      </TableContainer>
  );
};

export default BookStatus;
