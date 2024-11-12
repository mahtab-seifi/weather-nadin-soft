import { useContext, useState } from "react";
import moon from "../image/moon.png";
import rain from "../image/rain.png";
import wind from "../image/wind.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeContext from "../context/Theme";

function LoginForm() {
  const { isDarkMode } = useContext(ThemeContext);
  // dropDown menu
  const [t, i18n] = useTranslation("global");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(t("English"));
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    setActive(lang);
    setOpen(false);
  };
  //handle input
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError(t("error"));
      return;
    } else {
      navigate("/dashBoard");
    }
  };

  return (
    <>
      <div
        id={isDarkMode ? "dark" : "light"}
        className={`
         flex flex-col justify-center items-center absolute top-2/4 left-2/4 w-screen h-screen`}
        style={{ transform: "translate(-50% , -50%)" }}
      >
        {/* design loginform card */}
        <div
          id={isDarkMode ? "darklogin" : "lightlogin"}
          // style={{ width: "960px", height: "560px" }}
          className={` rounded-xl shadow-xl  flex items-center justify-between  `}
        >
          {/* design input loginform */}
          <div className="md:w-96 w-80  text-center md:h-80 h-72 md:m-14 ">
            <h1 className="font-bold md:text-2xl  mb-8 mt-8 md:mt-0">{t("login")}</h1>

            <form className="flex flex-col md:gap-48 gap-20 " onSubmit={handleSubmit}>
              <div>
                <input
                  id={isDarkMode ? "darklogin" : "lightlogin"}
                  type="text"
                  placeholder={t("placeholder")}
                  className={`${
                    active !== "English" ? "rtl" : "ltr"
                  } border-2 border-zinc-400 py-2 px-2 md:w-96 `}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error && (
                  <p
                    className={`text-rose-500  md:p-1 ${
                      active !== "English" ? "rtl" : "ltr"
                    }`}
                  >
                    {error}
                  </p>
                )}
              </div>
              <button
                className="text-white py-2 md:px-5  rounded-sm mx-12 md:mx-0 "
                style={{ backgroundColor: "#2196F3" }}
              >
                {t("buttonText")}
              </button>
            </form>
          </div>

          {/* desin image of loginform */}
          <div
            className="relative rounded-xl rounded-s-none hidden md:block"
            style={{
              width: "454px",
              height: "560px",
              backgroundColor:`${isDarkMode?"#545e77":"#D3E1E7"}` ,
            }}
          >
            <img
              src={moon}
              alt=""
              className="md:w-48 w-16 top-14 absolute drop-shadow-2xl"
              style={{ left: "211px" }}
            />
            <img
              src={rain}
              alt=""
              className="md:w-48 w-16 absolute left-9 drop-shadow-2xl"
              style={{ top: "162px" }}
            />
            <img
              src={wind}
              alt=""
              className="md:w-48 w-16 absolute drop-shadow-2xl "
              style={{ top: "302px", left: "211px" }}
            />
          </div>
        </div>

        {/* change languages button */}
        <div className="mt-8">
          <fieldset className="border-2 border-zinc-400  px-3 ">
            <legend className="text-zinc-500 text-xs ">{t("languages")}</legend>
            <button onClick={handleOpen} className="text-base ">
              <div className="flex items-center gap-20 ">
                <p className="">{active}</p>
                <i className="bi bi-caret-down-fill text-zinc-500 text-xs"></i>
              </div>
              <div>
                <ul
                  className={`flex flex-col transition-all duration-300 ease-in-out text-left [&>*]:cursor-pointer ${
                    open ? "block" : "hidden"
                  }`}
                >
                  <li
                    onClick={() => {
                      handleChangeLang(t("English"));
                    }}
                    className="text-zinc-500 text-sm border-y-2 py-1"
                  >
                    {t("english")}
                  </li>
                  <li
                    onClick={() => {
                      handleChangeLang(t("Farsi"));
                    }}
                    className={`text-zinc-500 text-sm py-1  `}
                  >
                    {t("persian")}
                  </li>
                </ul>
              </div>
            </button>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
