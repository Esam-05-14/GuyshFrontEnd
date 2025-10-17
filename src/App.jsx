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
import MembershipForm from './components/MembershipForm'


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
        <Route path="/universities" element={<Universities />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/users' element={<Users/>} />
        <Route path='/admin/profiles' element={<UserProfiles/>} />
        <Route path="/admin/profiles/:id" element={<UserProfilePage />} />
        <Route path='/login' element={<Login/>} />

      </Route>  
    </Routes>
  )
}

export default App
