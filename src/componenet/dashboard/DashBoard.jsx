import Forcast from "./Forcast";
import Monthly from "./Monthly";
import WeatherNow from "./WeatherNow";
import Menu from "./Menu";
import ThemeContext from "../context/Theme";
import { useContext } from "react";

function DashBoard() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <Menu />
      <div id={isDarkMode ? "dark" : "light"} className={`w-full  p-5 h-max `}>
        <div className="flex md:flex-row flex-col  gap-2 md:justify-around mb-5 ">
          <WeatherNow />
          <Monthly />
        </div>
        <Forcast />
      </div>
    </>
  );
}

export default DashBoard;
