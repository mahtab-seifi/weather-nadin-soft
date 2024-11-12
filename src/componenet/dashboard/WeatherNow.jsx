import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import partlycloud from "../image/partly-cloud.png";
import rainyday from "../image/rainy-day.png";
import clearday from "../image/clear-day.png";
import { FadeLoader } from "react-spinners";
import ThemeContext from "../context/Theme";

function WeatherNow() {
  const { isDarkMode } = useContext(ThemeContext);
  const [tomorrow, setTomorrow] = useState(null);
  const [t, i18n] = useTranslation("global");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.weatherbit.io/v2.0/forecast/daily?city=Tehran&key=425d6e6ef8044b78b9f27e4a2589d8be"
      );
      setTomorrow(result.data.data[0]);
      console.log(tomorrow && tomorrow);
    };
    fetchData();
  }, []);

  //convert dates to days of the week
  function getDayOfWeek(datetimeString) {
    // ایجاد یک شیء تاریخ از رشته تاریخ
    const date = new Date(datetimeString);

    // آرایه‌ای از نام روزهای هفته به فارسی
    const daysOfWeek = [
      t("sun"),
      t("mon"),
      t("tue"),
      t("wed"),
      t("thu"),
      t("fri"),
      t("sat"),
    ];

    // گرفتن اندیس روز هفته (0 برای یکشنبه، 1 برای دوشنبه و ...)
    const dayIndex = date.getDay();

    // برگرداندن نام روز هفته
    return daysOfWeek[dayIndex];
  }

  return (
    <>
      <div
        id={isDarkMode ? "darkDash" : "lightDash"}
        className="  rounded-3xl shadow-lg flex gap-8 md:gap-0  justify-between md:p-12 p-6 items-center   w-full md:h-56"
        // style={{
        //   height: "234px",
        //   width: "480px",
        // }}
      >
        {/* condition for loading */}
        {tomorrow ? (
          <>
            <div
              className="flex flex-col justify-between"
              style={{ width: "203px", height: "193px" }}
            >
              <div
                className="rounded-full flex items-center gap-2 p-3 md:h-10 md:w-44 h-8 w-32 "
                style={{
                  backgroundColor: "#CDD9E0",
                }}
              >
                <span
                  className="bi bi-geo-alt-fill"
                  style={{ color: "#003464" }}
                ></span>
                <span
                  style={{ color: "#003464" }}
                  className="text-base font-normal"
                >
                  {t("tehran")}
                </span>
              </div>
              <div>
                <p className="font-medium md:text-3xl text-2xl">
                  {getDayOfWeek(tomorrow.datetime)}
                </p>
                <span>
                  <span className="text-xs font-thin">
                    {new Date(tomorrow.datetime).toLocaleDateString()}
                  </span>
                </span>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-medium">
                  {Math.round(tomorrow.temp)}°C
                </p>
                <div>
                  <span className="font-thin text-xs">
                    {t("high")} : {Math.round(tomorrow.low_temp)}
                  </span>
                  <span className="font-thin text-xs px-2">
                    {t("low")} : {Math.round(tomorrow.low_temp)}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col justify-evenly"
              style={{ width: "187px", height: "214px" }}
            >
              <img
                className="md:w-36 md:h-28 w-28 h-20"
                src={
                  tomorrow.weather.description === "Clear Sky"
                    ? clearday
                    : tomorrow.weather.description === "Heavy rain" ||
                      tomorrow.weather.description === "Light shower rain"
                    ? rainyday
                    : partlycloud
                }
                alt=""
              />
              <p className="md:text-3xl text-2xl font-medium">
                {tomorrow.weather.description}
              </p>
              <div>
                <span className="text-xs font-thin">{t("feel")}</span>
                <span className="text-xs font-thin px-2">
                  {Math.round(tomorrow.low_temp)}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <FadeLoader color="#1b5285" />
          </div>
        )}
      </div>
    </>
  );
}

export default WeatherNow;
