import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { useBooks } from "../contexts/BooksContext";
import { transformData } from "../utils/transformBooksChart";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const BookStatsDonutChart = () => {
  const { books } = useBooks();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [categoryInfo, setCategoryInfo] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const transformedData = transformData(books);

        setChartData({
          labels: transformedData.map((item) => item.category),
          datasets: [
            {
              label: "Books by Category",
              data: transformedData.map((item) => item.count),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#F7829F",
                "#F4A261",
              ],
              borderColor: "#fff",
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        });

        setCategoryInfo(
          transformedData.map((item) => ({
            category: item.category,
            count: item.count,
            color: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#F7829F",
              "#F4A261",
            ][transformedData.indexOf(item) % 6],
          }))
        );

        console.log(books);
      } catch (error) {
        console.error("Error fetching book statistics:", error);
      }
    };

    fetchData();
  }, [books]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 1,
        margin: 1,
        textAlign: "center",
        minHeight: "400px",
        borderRadius: 0,
        boxShadow: "0 2px 6px rgba(0, 0, 0, .1)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxHeight: "300px",
        }}
      >
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.label}: ${tooltipItem.raw} books`;
                  },
                },
              },
              title: {
                display: true,
                text: "Available Books",
                position: "top",
              },
            },
            cutout: "50%",
            interaction: {
              mode: "nearest",
              intersect: false,
            },
          }}
        />
        <Stack spacing={1} sx={{ marginTop: 2, textAlign: "center" }}>
          {categoryInfo.map((info) => (
            <Box
              key={info.category}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: info.color,
                  marginRight: 1,
                  borderRadius: "50%",
                }}
              />
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography
                  variant="body2"
                  sx={{ width: "30%", textAlign: "left" }}
                >
                  {info.category}
                </Typography>
                <Typography variant="body2" sx={{ width: "50%" }}>
                  {info.count}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default BookStatsDonutChart;
