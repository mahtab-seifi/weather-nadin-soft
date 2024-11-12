import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";
import { FadeLoader } from "react-spinners";
import ThemeContext from "../context/Theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Monthly() {
  const { isDarkMode } = useContext(ThemeContext);
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState({ labels: [], datasets: [] });

  //design chart line
  const options = {
    scales: {
      y: {
        min: 22,
        max: 26,
        ticks: {
          callback: function (value, index, values) {
            return value + " °C";
          },
        },
        grid: {
          display: true,
        },
      },
      x: {
        ticks: {
          callback: function (value, index, values) {
            const months = [
              t("Jan"),
              t("Feb"),
              t("Mar"),
              t("Apr"),
              t("May"),
              t("Jun"),
              t("Jul"),
              t("Aug"),
              t("Sep"),
              t("Oct"),
              t("Nov"),
              t("Dec"),
            ];
            return months[value];
          },
        },
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
        
      },
    },
  };

  //get number from api for the chart
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.weatherbit.io/v2.0/normals?lat=35&lon=51&start_day=05-01&end_day=05-12&tp=daily&key=425d6e6ef8044b78b9f27e4a2589d8be"
      );

      const formattedData = {
        labels: result.data.data.map((day) => day.day),
        datasets: [
          {
            label: t("temp"),
            data: result.data.data.map((temp) => temp.temp),
            borderColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(
                10,
                100,
                20,
                10
              );
              gradient.addColorStop(0, "rgba(76, 223, 232, 1)");
              gradient.addColorStop(1, "rgba(121, 71, 247, 1)");
              return gradient;
            },
            borderWidth: 2,
          },
        ],
      };

      setData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div
      id={isDarkMode?"darkDash":"lightDash"}
        className="rounded-3xl shadow-lg md:h-56 w-full"
      >
        <h2 className="font-bold text-lg py-3 p-5" >
          {t("average")}
        </h2>

        {/* condition for loading */}
        {data.labels.length ? (
          <div className="md:h-40 px-5 pb-5 md:pb-0 w-full " id="line" >
            <Line options={options} data={data} />
          </div>
        ) : (
          <div className="flex justify-center">
            <FadeLoader color="#1b5285" />
          </div>
        )}
      </div>
    </>
  );
}

export default Monthly;
