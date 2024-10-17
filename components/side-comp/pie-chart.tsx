import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

interface PieChartProps {
  total_courses: number;
  courses_completed: number;
  enrolled_courses: number;
}

interface PieChartDataProps {
  label: string;
  data: number;
  color: string;
}

function calculateCoursePercentages(
  totalCourses: number,
  completedCourses: number,
  inProgressCourses: number
) {
  // Ensure the inputs are valid
  if (totalCourses <= 0) {
    throw new Error("Total courses must be greater than zero.");
  }

  const notStartedCourses = totalCourses - completedCourses - inProgressCourses;

  // Calculate percentages
  const completedPercentage = (completedCourses / totalCourses) * 100;
  const notStartedPercentage = (notStartedCourses / totalCourses) * 100;
  const inProgressPercentage = (inProgressCourses / totalCourses) * 100;

  return {
    completed: parseFloat(completedPercentage.toFixed()), // Round to 2 decimal places
    notStarted: parseFloat(notStartedPercentage.toFixed()), // Round to 2 decimal places
    inProgress: parseFloat(inProgressPercentage.toFixed()), // Round to 2 decimal places
  };
}

interface sortDataProps {
  value: number;
  index: number;
}

const sortData = (data: any): sortDataProps[] => {
  const pieChartData = data.datasets[0].data;

  // Pair values with their original indices
  const indexedPieChart = pieChartData.map((value: number, index: number) => ({
    value,
    index,
  }));

  // Sort the pairs by value in descending order
  return indexedPieChart.sort(
    (a: sortDataProps, b: sortDataProps) => b.value - a.value
  );
};

const sliceThicknessPlugin = {
  id: "sliceThickness",
  beforeDraw(chart: any) {
    const { data } = chart;
    const sortedIndexedChart = sortData(data);

    console.log(sortedIndexedChart[1].index);
    console.log(sortedIndexedChart);

    chart.getDatasetMeta(0).data[sortedIndexedChart[1].index].outerRadius =
      (chart.chartArea.width / (chart.chartArea.width * 1.8)) * 100;
    chart.getDatasetMeta(0).data[sortedIndexedChart[2].index].outerRadius =
      (chart.chartArea.width / (chart.chartArea.width * 2)) * 100;
  },
};

const PieChart = ({
  courses_completed,
  enrolled_courses,
  total_courses,
}: PieChartProps) => {
  const [data, setData] = useState<PieChartDataProps[]>();

  useEffect(() => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const percentageResult = calculateCoursePercentages(
      total_courses,
      courses_completed,
      enrolled_courses
    );
    if (percentageResult) {
      const doughnutData = [
        {
          label: "completed",
          data: percentageResult.completed,
          color: "rgba(182, 229, 255, 0.9)",
        },
        {
          label: "Not started",
          data: percentageResult.notStarted,
          color: "#FF1053",
        },
        {
          label: "In progress",
          data: percentageResult.inProgress,
          color: "#2FBC8D",
        },
      ];
      setData(doughnutData);
    }
  }, [courses_completed, enrolled_courses, total_courses]);

  const pieChartData = {
    label: data?.map((itm) => itm.label),
    datasets: [
      {
        data: data?.map((itm) => itm.data),
        backgroundColor: data?.map((itm) => itm.color),
        borderWidth: 0,
        dataVisibility: new Array(data?.length).fill(true),
      },
    ],
  };

  const segmentTextPlugins = {
    id: "segmentTextCloud",
    afterDatasetDraw(chart: any) {
      const { ctx, data } = chart;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      const sortedIndexedChart = sortData(data);

      chart.getDatasetMeta(0).data.forEach((datapoint: any, index: number) => {
        if (data.datasets[0].data[index] > 0) {
          const outerRadius = chart.getDatasetMeta(0).data[index].outerRadius;
          const startAngle = chart.getDatasetMeta(0).data[index].startAngle;
          const endAngle = chart.getDatasetMeta(0).data[index].endAngle;
          const centerAngle = (startAngle + endAngle) / 2;

          const x = chart.getDatasetMeta(0).data[index].tooltipPosition().x;
          const y = chart.getDatasetMeta(0).data[index].tooltipPosition().y;

          ctx.save();

          // NOTE: for the text position you can either use these
          // ctx.translate(x - 30, y);
          //NOTE: or these
          ctx.translate(xCenter, yCenter);
          ctx.rotate(centerAngle);

          // text
          if (index == sortedIndexedChart[0].index) {
            ctx.font = "700 26px Montserrat";
          } else if (index == sortedIndexedChart[1].index) {
            ctx.font = "600 16px Montserrat";
          } else {
            ctx.font = "500 14px var(--font-sf-pro-display)";
          }

          index == 0 ? (ctx.fillStyle = "#014873") : (ctx.fillStyle = "white");
          // ctx.font = "bold 15px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`${data.datasets[0].data[index]}%`, outerRadius / 2, 0);
          ctx.restore();
        }
      });
    },
  };

  return (
    <div className="flex justify-between">
      <ul
        id="legend-container"
        className="self-end font-sfProDisplay font-medium"
      >
        {data?.map((itm, idx) => (
          <li
            className={
              "text-sm  before:absolute before:left-0 before:top-[6px] font-medium relative pl-4 text-[#666]  before:w-2 before:h-2 before: rounded-full before:rounded-full " +
              (idx == 0
                ? `before:bg-[#CCEDFF]`
                : idx == 1
                ? "before:bg-[#FF1053]"
                : "before:bg-[#2FBC8D]")
            }
            key={idx}
          >
            {itm.label}
          </li>
        ))}
      </ul>
      {data && (
        <div className="max-w-[150px]   flex justify-end">
          <Pie
            data={pieChartData}
            plugins={[segmentTextPlugins, sliceThicknessPlugin]}
          />
        </div>
      )}
    </div>
  );
};

export default PieChart;
