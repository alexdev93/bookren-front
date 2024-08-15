import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Typography,
  Paper,
  Box,
  TableContainer,
  IconButton,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookApprove = ({ state, onEdit, onDelete }) => {
  const books = [
    {
      No: 1,
      BookNo: "B001",
      BookName: "ፍቅርና ግርማ",
      Status: "free",
      Price: 250.0,
    },
    {
      No: 2,
      BookNo: "B002",
      BookName: "አንተና እኔ",
      Status: "rented",
      Price: 300.0,
    },
    {
      No: 3,
      BookNo: "B003",
      BookName: "የሰላም አበባ",
      Status: "free",
      Price: 150.0,
    },
    {
      No: 4,
      BookNo: "B004",
      BookName: "አስቂኝ ታሪክ",
      Status: "rented",
      Price: 200.0,
    },
    {
      No: 5,
      BookNo: "B005",
      BookName: "ከእናቴ በላይ",
      Status: "free",
      Price: 350.0,
    },
    {
      No: 6,
      BookNo: "B006",
      BookName: "ቀላል አማርኛ",
      Status: "free",
      Price: 100.0,
    },
    {
      No: 7,
      BookNo: "B007",
      BookName: "የጠላት ስታዝ",
      Status: "rented",
      Price: 400.0,
    },
    {
      No: 8,
      BookNo: "B008",
      BookName: "በእራሴ ጠንቀቅኩ",
      Status: "free",
      Price: 180.0,
    },
    {
      No: 9,
      BookNo: "B009",
      BookName: "ሀበሻ ግርማ",
      Status: "rented",
      Price: 220.0,
    },
    {
      No: 10,
      BookNo: "B010",
      BookName: "ሙሉ በሙሉ",
      Status: "free",
      Price: 280.0,
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "No",
        size: 30,
      },
      {
        accessorKey: "BookNo",
        header: "Book No",
        size: 60,
      },
      {
        accessorKey: "BookName",
        header: "Book Name",
        size: 100,
      },
      {
        accessorKey: "Status",
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
        accessorKey: "Price",
        header: "Price",
        size: 30,
        Cell: ({ cell }) => (
          <Typography style={{ fontSize: "0.6rem" }}>
            ${cell.getValue()}
          </Typography>
        ),
      },
      {
        header: "Edit",
        size: 40,
        Cell: ({ row }) => (
          <IconButton
            onClick={() => onEdit(row.original)}
            size="small"
            color="primary"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        ),
      },
      {
        header: "Delete",
        size: 40,
        Cell: ({ row }) => (
          <IconButton
            onClick={() => onDelete(row.original)}
            size="small"
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useMaterialReactTable({
    columns,
    data: books || [],
    enablePagination: false,
    enableTableHead: true,
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
          padding: "4px",
          borderBottom: "1px solid #ddd",
        },
        "& .MuiTypography-root": {
          fontSize: "0.6rem",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "0.6rem",
        },
        "& .MuiTableContainer-root": {
          maxHeight: 300,
          maxWidth: "100%",
          overflow: "auto",
        },
      },
    },
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 300,
        maxWidth: "100%",
        overflow: "auto",
        "@media (max-width: 600px)": {
          maxHeight: 200,
        },
      }}
    >
      <MaterialReactTable table={table} />
    </TableContainer>
  );
};

export default BookApprove;
