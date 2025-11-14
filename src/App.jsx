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
import Users from './pages/admin/Users'
import Login from './pages/Login'
import UserProfiles from './pages/admin/UserProfiles'
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
import AdminPosts from './pages/admin/AdminPosts'
import AdminAirportPickupRequests from "./pages/admin/AdminAirportPickupRequests";
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import UnionRulesAndRights from './pages/UnionRulesAndRights'
import AdminEmailNotifications from './pages/admin/EmailNotification'
import GuidanceVerifyPage from './pages/GuidanceVerifyPage'
import AdminMembershipRequests from './pages/admin/AdminMembershipRequests'
import AdminBoardMembers from './pages/admin/AdminBoardMembers'
import ResetPassword from './pages/ResetPassword'
import VarifyEmail from './pages/VarifyEmail'



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
          <Route path="/admin/board-members" element={<AdminBoardMembers />} />
          <Route path="/admin/airport-pickup" element={<AdminAirportPickupRequests />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/news" element={<AdminPosts />} />
          <Route path="/admin/email-notifications" element={<AdminEmailNotifications />} />
          <Route path="/admin/membership-requests" element={<AdminMembershipRequests/>}/>
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/membership-form' element={<CompleteProfileForm/>} />
        <Route path="/my-airport-forms" element={<AirportPickupFormList />} />
        <Route path="/my-airport-forms/edit/:id" element={<AirportPickupFormEdit />} />
        <Route path='/guidence-form' element={<GuidenceForm/>}></Route>
        <Route path='/terms-conditions' element={<TermsAndConditions/>}></Route>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
        <Route path='/rules-rights' element={<UnionRulesAndRights/>}></Route>
        <Route path="/guidance-verify/:uid/:token" element={<GuidanceVerifyPage />} />
        <Route path='/reset-password/:uid/:token/' element={<ResetPassword/>}/>
        <Route path='/verify-email/:uid/:token/' element={<VarifyEmail/>}/>




        


      </Route>  
    </Routes>
    
  )
}

export default App
