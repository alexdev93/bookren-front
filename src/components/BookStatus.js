import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const books = [
  { No: 1, BookNo: "B001", BookName: "ፍቅርና ግርማ", Status: "free", Price: 250.0 },
  {
    No: 2,
    BookNo: "B002",
    BookName: "አንተና እኔ",
    Status: "rented",
    Price: 300.0,
  },
  { No: 3, BookNo: "B003", BookName: "የሰላም አበባ", Status: "free", Price: 150.0 },
  {
    No: 4,
    BookNo: "B004",
    BookName: "አስቂኝ ታሪክ",
    Status: "rented",
    Price: 200.0,
  },
  { No: 5, BookNo: "B005", BookName: "ከእናቴ በላይ", Status: "free", Price: 350.0 },
  { No: 6, BookNo: "B006", BookName: "ቀላል አማርኛ", Status: "free", Price: 100.0 },
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
  { No: 10, BookNo: "B010", BookName: "ሙሉ በሙሉ", Status: "free", Price: 280.0 },
];

const columns = [
  { accessorKey: "No", header: "No", size: 30 },
  { accessorKey: "BookNo", header: "Book No", size: 50 },
  { accessorKey: "BookName", header: "Book Name", size: 60 },
  {
    accessorKey: "Status",
    header: "Status",
    size: 60,
    Cell: ({ cell }) => (
      <Box display="flex" alignItems="center">
        <CircleIcon
          style={{
            color: cell.getValue() === "free" ? "#00abff" : "#ff0000",
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
  { accessorKey: "Price", header: "Price", size: 70 },
];

const BookStatus = () => {
  return (
    <Box sx={{ margin: "0 auto", overflowY: "none", overflowX: "hidden" }}>
      <Box sx={{ width: "100%", height: "250px", m: 2 }}>
        <MaterialReactTable
          columns={columns}
          data={books}
          enablePagination={false} // Corrected from enablePagination: false to enablePagination={false}
          enableTableHead={true}
          enableSorting={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          initialState={{
            density: "compact", // Corrected this placement
            pagination: { pageIndex: 0, pageSize: 10 }, // Merged with initialState above
          }}
          renderTopToolbarCustomActions={() => (
            <Typography
              variant="h6"
              sx={{ width: "100%", textAlign: "left", mt: 1 }}
            >
              Live Book Status
            </Typography>
          )}
          muiTablePaperProps={{
            sx: {
              boxShadow: "none", // Remove the shadow
              borderRadius: 0,
            },
          }}
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
              width: "90%",
              "& .MuiTableCell-root": {
                padding: "5px 10px", // Reduced padding
                fontSize: "0.75rem", // Smaller font size
              },
              "& .MuiTableRow-root": {
                height: "35px", // Reduced row height
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default BookStatus;
