import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import AboutUs from './pages/AboutUs'
import { Routes, Route } from "react-router-dom";
import Services from './pages/Services'
import Universities from './pages/Universities'
import News from './pages/News'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Layout from './pages/Layout'
import NewsDetails from './pages/NewsDetails'
import Admin from './pages/Admin'
import Users from './pages/Users'
import Login from './pages/Login'
import UserProfiles from './pages/UserProfiles'
import UserProfilePage from './components/UserProfilePage'
import AirportPickupForm from './components/AirportForm'
import MembershipForm from './components/CompleteProfileForm'
import ProtectedRoutes from './services/ProtectedRoutes'
import Register from './pages/Register'
import MyProfile from './pages/MyProfile'
import CompleteProfileForm from './components/CompleteProfileForm'
import AirportPickupFormList from './components/AirportPickupFormList'
import AirportPickupFormEdit from './components/AirportPickupFormEdit'
import GuidenceForm from './components/GuidenceForm'
import ChangePassword from './pages/ChangePassword'
import ForgotPassword from './pages/ForgotPassword'
import AdminEvents from "./pages/admin/AdminEvents";
import AdminAirportPickupRequests from "./pages/admin/AdminAirportPickupRequests";



function App() {
  const [count, setCount] = useState(0)

  return (


    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/airport-form" element={<AirportPickupForm />} />
        <Route path="/services/membership-form" element={<MembershipForm />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/universities" element={<Universities />} />
        <Route element={<ProtectedRoutes allowedRoles={['is_superuser','is_active']}/>}>
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={['is_superuser']}/>}>
          <Route path='/admin' element={<Admin/>} />
          <Route path='/admin/users' element={<Users/>} />
          <Route path='/admin/profiles' element={<UserProfiles/>} />
          <Route path="/admin/profiles/:id" element={<UserProfilePage />} />
          <Route path="/admin/board-members" element={<UserProfilePage />} />
          <Route path="/admin/airport-pickup" element={<AdminAirportPickupRequests />} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/membership-form' element={<CompleteProfileForm/>} />
        <Route path="/my-airport-forms" element={<AirportPickupFormList />} />
        <Route path="/my-airport-forms/edit/:id" element={<AirportPickupFormEdit />} />
        <Route path='/guidence-form' element={<GuidenceForm/>}></Route>


        <Route path="/events" element={<AdminEvents />} />
        


      </Route>  
    </Routes>
    
  )
}

export default App
