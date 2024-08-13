import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Switch, Button, Paper, Box, Typography } from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";

// Predefined books data
const books = [
  {
    no: 1,
    bookNo: "B001",
    author: "J.K. Rowling",
    avatar: "https://example.com/avatar1.jpg",
    ownername: "Alice Johnson",
    category: "Fantasy",
    bookName: "Harry Potter and the Sorcerer's Stone",
    status: "Available",
  },
  {
    no: 2,
    bookNo: "B002",
    author: "George R.R. Martin",
    avatar: "https://example.com/avatar2.jpg",
    ownername: "Bob Smith",
    category: "Fantasy",
    bookName: "A Game of Thrones",
    status: "Checked Out",
  },
  {
    no: 3,
    bookNo: "B003",
    author: "J.R.R. Tolkien",
    avatar: "https://example.com/avatar3.jpg",
    ownername: "Carol Williams",
    category: "Fantasy",
    bookName: "The Hobbit",
    status: "Available",
  },
  {
    no: 4,
    bookNo: "B004",
    author: "Isaac Asimov",
    avatar: "https://example.com/avatar4.jpg",
    ownername: "David Brown",
    category: "Science Fiction",
    bookName: "Foundation",
    status: "Under Review",
  },
  {
    no: 5,
    bookNo: "B005",
    author: "Agatha Christie",
    avatar: "https://example.com/avatar5.jpg",
    ownername: "Eva Davis",
    category: "Mystery",
    bookName: "Murder on the Orient Express",
    status: "Available",
  },
  {
    no: 1,
    bookNo: "B001",
    author: "J.K. Rowling",
    avatar: "https://example.com/avatar1.jpg",
    ownername: "Alice Johnson",
    category: "Fantasy",
    bookName: "Harry Potter and the Sorcerer's Stone",
    status: "Available",
  },
  {
    no: 2,
    bookNo: "B002",
    author: "George R.R. Martin",
    avatar: "https://example.com/avatar2.jpg",
    ownername: "Bob Smith",
    category: "Fantasy",
    bookName: "A Game of Thrones",
    status: "Checked Out",
  },
  {
    no: 3,
    bookNo: "B003",
    author: "J.R.R. Tolkien",
    avatar: "https://example.com/avatar3.jpg",
    ownername: "Carol Williams",
    category: "Fantasy",
    bookName: "The Hobbit",
    status: "Available",
  },
  {
    no: 4,
    bookNo: "B004",
    author: "Isaac Asimov",
    avatar: "https://example.com/avatar4.jpg",
    ownername: "David Brown",
    category: "Science Fiction",
    bookName: "Foundation",
    status: "Under Review",
  },
  {
    no: 5,
    bookNo: "B005",
    author: "Agatha Christie",
    avatar: "https://example.com/avatar5.jpg",
    ownername: "Eva Davis",
    category: "Mystery",
    bookName: "Murder on the Orient Express",
    status: "Available",
  },
  // Add more entries as needed
];

// Column definitions with reduced width and switchable status
const columns = [
  { accessorKey: "no", header: "No", size: 100 },
  { accessorKey: "bookNo", header: "Book No", size: 100 },
  { accessorKey: "author", header: "Author", size: 150 },
  {
    accessorKey: "avatar",
    header: "Avatar",
    size: 100,
    Cell: ({ cell }) => (
      <img
        src={cell.getValue()}
        alt="avatar"
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    ),
  },
  { accessorKey: "ownername", header: "Owner", size: 150 },
  { accessorKey: "category", header: "Category", size: 100 },
  { accessorKey: "bookName", header: "Book Name", size: 200 },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    Cell: ({ cell, row, column }) => {
      const [status, setStatus] = useState(cell.getValue() === "Available");

      const handleStatusChange = () => {
        const newStatus = !status;
        setStatus(newStatus);
        // Optionally, update the status in your data source here
      };

      return (
        <Switch
          checked={status}
          onChange={handleStatusChange}
          inputProps={{ "aria-label": "status switch" }}
        />
      );
    },
  },
];

const Books = () => {
  return (
    <Box sx={{ margin: "0 auto" }}>
      <Paper
        sx={{
          height: 50,
          boxShadow: "0 3px 10px rgba(0, 0, 0, .2)",
          borderRadius: 1,
          p: 0.5,
        }}
      >
        <Typography ml={5}>
          <span style={{ fontSize: 30, fontWeight: 700 }}>Admin</span>/Books
        </Typography>
      </Paper>
      <Box sx={{ width: "100%", m: 2, p:2 }}>
        <MaterialReactTable
          columns={columns}
          data={books}
          initialState={{
            pagination: { pageIndex: 0, pageSize: 10 },
          }}
          // Styles to ensure table fits within its parent container
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
              width: "100%",
              "& .MuiTableCell-root": {
                padding: "4px 8px", // Reduced padding
                fontSize: "0.875rem", // Smaller font size
              },
              "& .MuiTableRow-root": {
                height: "48px", // Reduced row height
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Books;
