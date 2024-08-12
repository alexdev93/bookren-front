import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useAxios } from "../contexts/AxiosContext"; // Import your custom hook

const categories = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Fantasy" },
  { id: 3, name: "Mystery" },
  { id: 4, name: "Biography" },
  { id: 5, name: "History" },
];

const BookUpload = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    categoryId: "",
    price: 0.0,
    ownerId: "",
  });

  const axios = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/books", formValues);
      console.log("Book uploaded successfully:", response.data);
      setFormValues({})
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upload a Book
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          name="title"
          label="Book Title"
          fullWidth
          margin="normal"
          value={formValues.title}
          onChange={handleChange}
        />
        <TextField
          name="author"
          label="Author"
          fullWidth
          margin="normal"
          value={formValues.author}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Price"
          fullWidth
          margin="normal"
          type="number"
          value={formValues.price}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={formValues.categoryId}
            onChange={handleChange}
            label="Category"
          >
            {categories.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          onChange={handleChange}
          disabled
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Upload Book
        </Button>
      </Box>
    </Box>
  );
};

export default BookUpload;
