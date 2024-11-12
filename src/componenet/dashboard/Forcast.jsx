import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import partlycloud from "../image/partly-cloud.png";
import rainyday from "../image/rainy-day.png";
import clearday from "../image/clear-day.png";
import { useTranslation } from "react-i18next";
import { FadeLoader } from "react-spinners";
import ThemeContext from "../context/Theme";

function Forcast() {
  const [detail, setDetail] = useState(null);
  const [t, i18n] = useTranslation("global");
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.weatherbit.io/v2.0/forecast/daily?city=Tehran&key=425d6e6ef8044b78b9f27e4a2589d8be"
      );
      setDetail(result.data);
      console.log(detail);
    };
    fetchData();
  }, []);

  //convert dates to days of the week
  function getDayOfWeek(datetimeString) {
    const date = new Date(datetimeString);
    const daysOfWeek = [
      t("sun"),
      t("mon"),
      t("tue"),
      t("wed"),
      t("thu"),
      t("fri"),
      t("sat"),
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }
  function isToday(dateString) {
    const today = new Date();
    const givenDate = new Date(dateString);
    return today.toDateString() === givenDate.toDateString();
  }

  return (
    <>
      <div
        className=" rounded-3xl shadow-xl w-full   h-96 "
        id={isDarkMode ? "darkDash" : "lightDash"}
        // style={{height:"370px"}}
      >
        <h2 className="md:text-2xl text-xl font-semibold pt-6 ps-7">
          {t("forcast")}
        </h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          breakpoints={{
            640: { slidesPerView: 5, spaceBetween: 40 },
            768: { slidesPerView: 9, spaceBetween: 50 },
            1024:{slidesPerView :11 , spaceBetween:50}
          }}
          loop
          className="w-full"
        >
          {/* condition for loading */}
          {detail ? (
            detail.data.map((day) => (
              <div className="">
                <SwiperSlide
                  key={day.id}
                  className="md:mx-2 pt-5 md:px-7 px-4  "
                >
                  <div
                    id={isDarkMode ? "darkswiper" : "lightswiper"}
                    className="rounded-3xl flex flex-col text-center items-center justify-around   "
                    style={{
                      height: "270px",
                      width: "104px",
                    }}
                  >
                    <div className=" ">
                      <p
                        className=" pb-3 "
                        style={{
                          borderBottom: `1px solid ${
                            isDarkMode ? "#e2e8f0" : "#003464"
                          }`,
                        }}
                      >
                        {isToday(day.datetime)
                          ? t("today")
                          : getDayOfWeek(day.datetime)}
                      </p>
                    </div>

                    <img
                      className="md:w-20 w-14"
                      src={
                        day.weather.description === "Clear Sky"
                          ? clearday
                          : day.weather.description === "Heavy rain" ||
                            day.weather.description === "Light shower rain" ||
                            day.weather.description === "Light rain"
                          ? rainyday
                          : partlycloud
                      }
                      alt=""
                    />

                    <p>{Math.round(day.temp)}°C</p>
                  </div>
                </SwiperSlide>
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <FadeLoader color="#1b5285" />
            </div>
          )}
        </Swiper>
      </div>
    </>
  );
}

export default Forcast;
