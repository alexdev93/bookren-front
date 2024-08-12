import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import { useAppContext } from "../AppContext";

const Books = () => {
  const { state } = useAppContext();
  const { user, books, loading } = state;
  const [rowSelection, setRowSelection] = useState({});
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRowData, setEditedRowData] = useState({});


  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
        Cell: ({ cell, row }) =>
          editingRowId === row.original.id ? (
            <input
              type="text"
              value={editedRowData.title || ""}
              onChange={(e) =>
                handleEdit(row.original.id, "title", e.target.value)
              }
            />
          ) : (
            cell.getValue()
          ),
      },
      {
        accessorKey: "author",
        header: "Author",
        size: 150,
        Cell: ({ cell, row }) =>
          editingRowId === row.original.id ? (
            <input
              type="text"
              value={editedRowData.author || ""}
              onChange={(e) =>
                handleEdit(row.original.id, "author", e.target.value)
              }
            />
          ) : (
            cell.getValue()
          ),
      },
      {
        accessorKey: "categoryId",
        header: "Category ID",
        size: 150,
        Cell: ({ cell, row }) =>
          editingRowId === row.original.id ? (
            <input
              type="text"
              value={editedRowData.categoryId || ""}
              onChange={(e) =>
                handleEdit(row.original.id, "categoryId", e.target.value)
              }
            />
          ) : (
            cell.getValue()
          ),
      },
      {
        accessorKey: "isApproved",
        header: "Approved",
        size: 150,
        Cell: ({ cell, row }) =>
          user?.role === "admin" ? (
            editingRowId === row.original.id ? (
              <select
                value={editedRowData.isApproved ? "true" : "false"}
                onChange={(e) =>
                  handleEdit(
                    row.original.id,
                    "isApproved",
                    e.target.value === "true"
                  )
                }
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : cell.getValue() ? (
              "True"
            ) : (
              "False"
            )
          ) : cell.getValue() ? (
            "True"
          ) : (
            "False"
          ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 150,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) =>
          editingRowId === row.original.id ? (
            <>
              <DoneIcon
                onClick={() => saveEdit(row.original.id)}
                style={{ cursor: "pointer", color: "green" }}
              />
              <RevertIcon
                onClick={() => cancelEdit()}
                style={{ cursor: "pointer", color: "red" }}
              />
            </>
          ) : (
            <EditIcon
              onClick={() => startEdit(row.original.id, row.original)}
              style={{ cursor: "pointer" }}
            />
          ),
      },
    ],
    [user?.role, editingRowId, editedRowData]
  );

  const handleEdit = (bookId, key, value) => {
    setEditedRowData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const startEdit = (rowId, rowData) => {
    setEditingRowId(rowId);
    setEditedRowData(rowData);
  };

  const saveEdit = async (rowId) => {
    // await updateBook(rowId, editedRowData);
    setEditingRowId(null);
    setEditedRowData({});
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setEditedRowData({});
  };

  const table = useMaterialReactTable({
    columns,
    data: books || [],
    enableColumnOrdering: true,
    enableRowSelection: true,
    enablePagination: false,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return <MaterialReactTable table={table} />;
};

export default Books;
