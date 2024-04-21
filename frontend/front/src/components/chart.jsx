import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useWebContext } from "../context/contextprovider";
import { MoonLoader } from "react-spinners";
import { initFlowbite } from "flowbite";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale, // Needed for categorical data in Bar chart
  LinearScale, // Needed for numerical scales
  BarElement // Needed to render Bar charts
);

const Chartjs = () => {
  const { chartdata } = useWebContext();

  useEffect(() => {
    initFlowbite();
  }, []);

  // Function to generate random colors
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };
  const barChartOptions = {
    plugins: {
      legend: {
        display: false, // Disable legend for the Bar chart
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Only integer values
          precision: 0, // Display integers without any decimal
        },
      },
    },
  };
  let roledata = "";
  let ageData = "";
  let occupationData = "";
  let stateData = "";
  let countryData = "";
  // Prepare data for sthe chart
  if (chartdata !== "None") {
    roledata = {
      labels: Object.keys(chartdata.roleChart),
      datasets: [
        {
          data: Object.values(chartdata.roleChart),
          backgroundColor: generateColors(
            Object.keys(chartdata.roleChart).length
          ),
          hoverOffset: 4,
        },
      ],
    };
  }
  if (chartdata !== "None") {
    ageData = {
      labels: Object.keys(chartdata.ageChart),
      datasets: [
        {
          data: Object.values(chartdata.ageChart),
          backgroundColor: generateColors(
            Object.keys(chartdata.ageChart).length
          ),
          hoverOffset: 4,
        },
      ],
    };
  }
  if (chartdata !== "None") {
    occupationData = {
      labels: Object.keys(chartdata.occupationChart),
      datasets: [
        {
          data: Object.values(chartdata.occupationChart),
          backgroundColor: generateColors(
            Object.keys(chartdata.occupationChart).length
          ),
          hoverOffset: 4,
        },
      ],
    };
  }
  if (chartdata !== "None") {
    stateData = {
      labels: Object.keys(chartdata.stateChart),
      datasets: [
        {
          data: Object.values(chartdata.stateChart),
          backgroundColor: generateColors(
            Object.keys(chartdata.stateChart).length
          ),
          hoverOffset: 4,
        },
      ],
    };
  }

  if (chartdata !== "None") {
    countryData = {
      labels: Object.keys(chartdata.countryChart),
      datasets: [
        {
          data: Object.values(chartdata.countryChart),
          backgroundColor: generateColors(
            Object.keys(chartdata.countryChart).length
          ),
          hoverOffset: 4,
        },
      ],
    };
  }
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 flex  items-center justify-center border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {chartdata === "None" ? (
          <div
            className="flex items-center justify-center"
            style={{ width: "100%", height: "100vh" }}
          >
            <div>
              <MoonLoader color="#1A56DB" />
            </div>
          </div>
        ) : (
          <div
            className="flex  flex-col items-center justify-center"
            style={{ width: "50%", height: "50%", gap: "5rem" }}
          >
            {false === "None" ? (
              <div
                className="flex items-center justify-center"
                style={{ width: "100%", height: "100vh" }}
              >
                <div>
                  <MoonLoader color="#1A56DB" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Doughnut data={roledata} key="doughnutChart-role" />
                  </div>
                  <div className="text-base mb-2">Role basis distribution</div>
                </div>
                <hr className="w-full my-8 border-t border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Bar
                      data={ageData}
                      options={barChartOptions}
                      key="barChart-age"
                    />{" "}
                  </div>
                  <div className="text-base mb-2">Age distribution</div>
                </div>
                <hr className="w-full my-8 border-t border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Bar
                      data={occupationData}
                      options={barChartOptions}
                      key="barChart-occupation"
                    />
                  </div>
                  <div className="text-base mb-2">Occupation distribution</div>
                </div>{" "}
                <hr className="w-full my-8 border-t border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Doughnut data={stateData} key="doughnutChart-state" />
                  </div>
                  <div className="text-base mb-2">State distribution</div>
                </div>{" "}
                <hr className="w-full my-8 border-t border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Doughnut data={countryData} key="doughnutChart-country" />
                  </div>
                  <div className="text-base mb-2">Country distribution</div>
                </div>
                <hr className="w-full my-8 border-t border-gray-200 dark:border-gray-700" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chartjs;
