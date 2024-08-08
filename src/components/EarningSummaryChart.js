import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { useBooks } from "../contexts/BooksContext"; // Adjust the path to your context
import { Box, Button, Typography } from "@mui/material";

// Updated Chart options with legend on top
const baseChartOptions = {
  chart: {
    height: 250,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: [1, 1],
    dashArray: [0, 2],
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      shadeIntensity: 0.3,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  grid: {
    borderColor: "transparent", // Set grid border color to transparent
    strokeDashArray: 2,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        fontSize: "0.6rem",
        colors: "transparent",
      },
    },
    axisBorder: {
      show: false, // Hide x-axis line
    },
    axisTicks: {
      show: false, // Hide x-axis ticks
    },
    tickAmount: 5, // Show 6 ticks (one for each month)
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "0.6rem",
        colors: ["#9e9e9e"],
      },
    },
    axisBorder: {
      show: false, // Hide y-axis line
    },
    axisTicks: {
      show: false, // Hide y-axis ticks
    },
    tickAmount: 4, // Manually define the number of ticks on the y-axis
  },
  colors: ["blue", "gray"],
  markers: {
    size: 0,
  },
  tooltip: {
    shared: true,
    x: {
      show: false,
    },
    y: {
      formatter: (value) => `$${value}`,
    },
  },
  legend: {
    position: "top", // Move the legend to the top
    horizontalAlign: "right", // Center align the legend
    offsetX: 0, // Adjust horizontal offset
    offsetY: 0, // Adjust vertical offset
    labels: {
      colors: ["#9e9e9e"], // Color of the legend labels
      useSeriesColor: true, // Use series colors for legend labels
    },
  },
  title: {
    text: "Earning Summary",
    align: "left",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: true,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#263238",
    },
  },
};

export default function EarningSummaryChart() {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const { books } = useBooks(); // Fetch books from context

  const [options, setOptions] = useState(baseChartOptions);
  const [series, setSeries] = useState([
    {
      name: "Last Six Months",
      data: [],
    },
    {
      name: "Same Period Last Year",
      data: [],
    },
  ]);
  const [period, setPeriod] = useState("current"); // State to manage chart period

  useEffect(() => {
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentYearMonths = allMonths.slice(
      new Date().getMonth(),
      new Date().getMonth() + 6
    );

    const lastSixMonths = allMonths.slice(
      new Date().getMonth() - 5,
      new Date().getMonth() + 1
    );

    const months = period === "current" ? currentYearMonths : lastSixMonths;

    const lastSixMonthsEarnings = new Array(12).fill(0);
    const lastYearEarnings = new Array(12).fill(0);

    books.forEach((book) => {
      const month = new Date(book.createdAt).getMonth();
      lastSixMonthsEarnings[month] += parseFloat(book.price);
      if (
        new Date(book.createdAt).getFullYear() ===
        new Date().getFullYear() - 1
      ) {
        lastYearEarnings[month] += parseFloat(book.price);
      }
    });

    setOptions({
      ...baseChartOptions,
      xaxis: {
        categories: months,
        labels: {
          style: {
            colors: new Array(months.length).fill(secondary),
          },
        },
        tickAmount: 5, // Adjust tick amount to match number of months
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
        min: 0,
        max: 1000,
        tickAmount: 4, // Keep manual tick count
      },
      grid: {
        borderColor: line,
      },
    });

    setSeries([
      {
        name: "Last Six Months",
        data: lastSixMonthsEarnings.slice(
          allMonths.indexOf(months[0]),
          allMonths.indexOf(months[0]) + months.length
        ),
      },
      {
        name: "Same Period Last Year",
        data: lastYearEarnings.slice(
          allMonths.indexOf(months[0]),
          allMonths.indexOf(months[0]) + months.length
        ),
      },
    ]);
  }, [books, primary, secondary, line, period]);

  return (
    <Box>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </Box>
  );
}
