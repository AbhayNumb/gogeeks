import "./App.css";
import "flowbite";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import WebContextProvider from "./context/contextprovider";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "./components/sidebar";
import UserInfo from "./components/userinfo";
import ChartJS from "./components/chart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
function App() {
  return (
    <Router>
      <WebContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <div>
                <Sidebar />
                <Dashboard />
              </div>
            }
          />
          <Route
            path="/dashboard/usersinfo"
            element={
              <div>
                <Sidebar />
                <UserInfo />
              </div>
            }
          />
          <Route
            path="/dashboard/charts"
            element={
              <div>
                <Sidebar />
                <ChartJS />
              </div>
            }
          />
        </Routes>
        <Toaster />
      </WebContextProvider>
    </Router>
  );
}

export default App;
