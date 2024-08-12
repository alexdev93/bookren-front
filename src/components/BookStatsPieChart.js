import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { transformData as transformDataPie } from "../utils/transformBooksChart";
import { books } from "../books";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const BookStatsPieChart = ({ state }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [categoryInfo, setCategoryInfo] = useState([]);

  useEffect(() => {
    const transformedData = transformDataPie(books);

    const colors = [
      "#52c93f",
      "#ff2727",
      "#006aff",
      ""
    ];

    setChartData({
      labels: transformedData.map((item) => item.category),
      datasets: [
        {
          label: "Books by Category",
          data: transformedData.map((item) => item.count),
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 1,
          hoverOffset: 10,
        },
      ],
    });

    setCategoryInfo(
      transformedData.map((item, index) => ({
        category: item.category,
        count: item.count,
        color: colors[index % colors.length],
      }))
    );
  }, [state.books]);

  if (state.loading) return <div>Loading...</div>;

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
          padding: "20px",
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
            cutout: "80%",
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

export default BookStatsPieChart;
