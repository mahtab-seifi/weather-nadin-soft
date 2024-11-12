import { useContext, useState } from "react";
import logo from "../image/logo.png";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/Theme";
import { useTranslation } from "react-i18next";

function Menu() {
  const [setting, setSetting] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState();

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    setActiveLang(lang);
  };
  const handleOpen = () => {
    setSetting(!setting);
  };

  //design active button
  function activeTab(lang) {
    return lang === activeLang
      ? "text-sky-300 text-lg transition-all duration-300 ease-in-out outline-none "
      : "   outline-none ";
  }

  return (
    <>
      <div
      id={isDarkMode? "dark" : " light"}
        className=' flex justify-between md:px-7 px-2 items-center   '
        style={{height:"80px",}}
        
      >
        <div className="flex  items-center md:gap-2">
          <img className="md:w-14 md:h-14 hidden md:block rounded-full" src={logo} alt="" />
          <span className="font-normal md:text-sm text-xs" >
            {t("WeatherDashBoard")}
          </span>
        </div>
        <div className="flex items-center gap-3 ">
          <div>
            <fieldset className="border-2 border-zinc-400  px-2 md:w-72   " >
              <legend className=" text-xs " htmlFor="">
                {t("search")}
              </legend>
              <div className="flex items-center justify-between  ">
                <p className="text-sm md:text-base">{t("tehran")} </p>
                <i className="bi bi-caret-down-fill  text-xs"></i>
              </div>
            </fieldset>
          </div>
          <div className="">
            <button
              onClick={handleOpen}
              className="   p-1 px-2"
            >
              <span className="bi bi-gear text-xl"></span>
            </button>
            {setting === true && (
              <div id={isDarkMode ? "dark" :"light"} className=" h-60 w-56 right-4 border-2 top-16 absolute shadow-lg rounded-2xl">
                <div className=" flex flex-col justify-between gap-8 p-4 ">
                  <div>
                    <h2 className="pb-1">{t("mode")}</h2>
                    <ul className="flex gap-4 border-2 border-zinc-400 items-center text-sm justify-around  ">
                      <button
                        className={`${
                          isDarkMode
                            ? "text-zinc-400"
                            : "text-sky-300 text-lg  transition-all duration-300 ease-in-out outline-none"
                        }`}
                        onClick={toggleTheme}
                      >
                        <span className={`bi bi-sun text-xs `}></span>
                        <span> {t("light")}</span>
                      </button>
                      <button
                        className={`${
                          isDarkMode
                            ? "text-sky-300 text-lg transition-all duration-300 ease-in-out outline-none"
                            : "text-zinc-400"
                        }`}
                        onClick={toggleTheme}
                      >
                        <span className={`bi bi-moon text-xs `}></span>
                        <span> {t("dark")}</span>
                      </button>
                    </ul>
                  </div>
                  <div>
                    <h2 className="pb-1">{t("languages")}</h2>
                    <ul className="flex gap-4 border-2 border-zinc-400 items-center text-sm justify-around   ">
                      <button
                        className={`${activeTab("English")}`}
                        onClick={() => handleChangeLang(t("English"))}
                      >
                        {t("english")}
                      </button>
                      <button
                        className={`${activeTab("Farsi")}`}
                        onClick={() => handleChangeLang(t("Farsi"))}
                      >
                        {t("persian")}{" "}
                      </button>
                    </ul>
                  </div>
                  <button className="text-left" onClick={() => navigate("/")}>
                    <span className="bi bi-box-arrow-right text-sm"></span>
                    <span className="text-sm"> {t("exit")}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
