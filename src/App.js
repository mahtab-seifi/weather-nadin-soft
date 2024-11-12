
import { Route, Routes } from "react-router-dom";
import LoginForm from "./componenet/form/LoginForm";
import DashBoard from "./componenet/dashboard/DashBoard";


function App() {
  
  return (
    <>
 
        <Routes>
          <Route element={<LoginForm />} path="/" />
          <Route element={<DashBoard />} path="/dashBoard" />
        </Routes>
      
    </>
  );
}

export default App;