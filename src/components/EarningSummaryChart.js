import { useState, useEffect } from "react";
import { useTheme, ButtonGroup, Button } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { Box, useMediaQuery } from "@mui/material";
import { parseISO } from "date-fns";
import { transactions } from "../transaction"

const baseChartOptions = {
  chart: {
    type: "area",
    height: "100%",
    width: "100%",
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
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
    borderColor: "transparent",
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
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tickAmount: 5,
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "0.6rem",
        colors: ["#9e9e9e"],
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tickAmount: 4,
  },
  colors: ["#00abff", "gray"],
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
    position: "top",
    horizontalAlign: "right",
    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: ["#9e9e9e"],
      useSeriesColor: true,
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
      color: "#263238",
    },
  },
};

export default function EarningSummaryChart({ state }) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  // const { transactions } = state;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6;

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

    const startMonth = new Date().getMonth() - currentPage * itemsPerPage;
    const months =
      startMonth < 0
        ? [
            ...allMonths.slice(12 + startMonth),
            ...allMonths.slice(0, startMonth + itemsPerPage),
          ]
        : allMonths.slice(startMonth, startMonth + itemsPerPage);

    const lastSixMonthsEarnings = new Array(12).fill(0);
    const lastYearEarnings = new Array(12).fill(0);

    transactions.forEach((transaction) => {
      if (!transaction.createdAt) return;
      const date = parseISO(transaction.createdAt);
      const month = date.getMonth();
      const year = date.getFullYear();

      lastSixMonthsEarnings[month] += parseFloat(transaction.amount);
      if (year === new Date().getFullYear() - 1) {
        lastYearEarnings[month] += parseFloat(transaction.amount);
      }
    });

    setOptions({
      ...baseChartOptions,
      xaxis: {
        categories: months,
        labels: {
          style: {
            colors: new Array(months.length).fill(secondary),
            fontSize: isMobile ? "0.4rem" : "0.6rem",
          },
        },
        tickAmount: 5,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
            fontSize: isMobile ? "0.4rem" : "0.6rem",
          },
        },
        min: 0,
        max: Math.max(...lastSixMonthsEarnings, ...lastYearEarnings),
        tickAmount: 4,
      },
      grid: {
        borderColor: line,
      },
      legend: {
        labels: {
          colors: [secondary],
          fontSize: isMobile ? "0.5rem" : "0.6rem",
        },
      },
      title: {
        style: {
          fontSize: isMobile ? "12px" : "14px",
        },
      },
    });

    setSeries([
      {
        name: "Last Six Months",
        data: lastSixMonthsEarnings.slice(
          startMonth < 0 ? 12 + startMonth : startMonth,
          startMonth < 0
            ? 12 + startMonth + months.length
            : startMonth + months.length
        ),
      },
      {
        name: "Same Period Last Year",
        data: lastYearEarnings.slice(
          startMonth < 0 ? 12 + startMonth : startMonth,
          startMonth < 0
            ? 12 + startMonth + months.length
            : startMonth + months.length
        ),
      },
    ]);
  }, [transactions, secondary, line, isMobile, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    const maxPages = Math.ceil(12 / itemsPerPage) - 1;
    if (currentPage < maxPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: isMobile ? "10px" : "20px",
        boxSizing: "border-box",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <ButtonGroup
        sx={{ mb: 2, justifyContent: "center", width: "100%" }}
        variant="outlined"
        size="small"
      >
        <Button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </Button>
        <Button onClick={handleNextPage}>Next</Button>
      </ButtonGroup>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={isMobile ? "200px" : "200px"}
      />
    </Box>
  );
}
