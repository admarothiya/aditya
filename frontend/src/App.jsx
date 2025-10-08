


import { BrowserRouter, Routes, Route, NavLink } from "react-router";


import Home from "./component/Home";
import RegisterBox from "./component/RegisterBox";
import Login from "./component/Login";
import Members from "./component/Members";
import ProfilePage from "./component/ProfilePage";
import DashboardLayout from "./component/DashboardLayout";
import Dashboard from "./component/Dashboard";
import Settings from "./component/Settings";
import About from "./component/About";
import ComplaintForm from "./component/ComplaintForm";
import Navbar from "./component/navbar";
import UserDashboard from "./component/UserDashboard"; 
import UserLogin from "./component/UserLogin"; 
import UserComplaintForm from "./component/UserComplaintForm";
import Events from "./component/Events";
import CreateEvent from "./component/CreateEvent";

const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/rgisterbox" element={<RegisterBox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/complaintform" element={<ComplaintForm/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/userdashboard" element={<UserDashboard />} /> 
        <Route path="/UserLogin" element={<UserLogin />} /> 
        <Route path="/usercomplaint" element={<UserComplaintForm />} />
        <Route path="/events" element={<Events />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />


       
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
