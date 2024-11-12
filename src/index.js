import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import global_fa from "./locales/fa/global.json";
import global_en from "./locales/en/global.json";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { ThemeProvider } from "./componenet/context/Theme.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: "English",
  resources: {
    English: {
      global: global_en,
    },
    Farsi: {
      global: global_fa,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <I18nextProvider i18n={i18next}>
     

     <ThemeProvider>
       <HashRouter>
         <App />
       </HashRouter>
     </ThemeProvider>
   
 </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




