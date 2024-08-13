import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Switch, Button, IconButton, Box, Paper, Typography } from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";

// Predefined data
const data = [
  { no: 1, owner: "Owner 1", upload: 10, location: "Location 1", status: true },
  {
    no: 2,
    owner: "Owner 2",
    upload: 20,
    location: "Location 2",
    status: false,
  },
  { no: 3, owner: "Owner 3", upload: 30, location: "Location 3", status: true },
  {
    no: 4,
    owner: "Owner 4",
    upload: 40,
    location: "Location 4",
    status: false,
  },
  { no: 5, owner: "Owner 5", upload: 50, location: "Location 5", status: true },
  {
    no: 6,
    owner: "Owner 6",
    upload: 60,
    location: "Location 6",
    status: false,
  },
  { no: 7, owner: "Owner 7", upload: 70, location: "Location 7", status: true },
  {
    no: 8,
    owner: "Owner 8",
    upload: 80,
    location: "Location 8",
    status: false,
  },
  { no: 9, owner: "Owner 9", upload: 90, location: "Location 9", status: true },
  {
    no: 10,
    owner: "Owner 10",
    upload: 100,
    location: "Location 10",
    status: false,
  },
];

// Column definitions with reduced width
const columns = [
  { accessorKey: "no", header: "No", size: 50 },
  { accessorKey: "owner", header: "Owner", size: 100 },
  { accessorKey: "upload", header: "Upload", size: 100 },
  { accessorKey: "location", header: "Location", size: 120 },
  {
    accessorKey: "status",
    header: "Status",
    size: 80,
    Cell: ({ cell }) => <Switch size="small" checked={cell.getValue()} />,
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 100,
    Cell: () => (
      <>
        <IconButton color="primary" aria-label="view" size="small">
          <Visibility fontSize="small" />
        </IconButton>
        <IconButton color="error" aria-label="delete" size="small">
          <Delete fontSize="small" />
        </IconButton>
      </>
    ),
  },
  {
    accessorKey: "approved",
    header: "Approved",
    size: 100,
    Cell: () => (
      <Button variant="contained" color="primary" size="small">
        Approve
      </Button>
    ),
  },
];

const Owners = () => {
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
          <span style={{ fontSize: 30, fontWeight: 700 }}>Admin</span>/owners
        </Typography>
      </Paper>
      <Box sx={{ width: "100%", m: 2 }}>
        <MaterialReactTable
          columns={columns}
          data={data}
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

export default Owners;
