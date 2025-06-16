import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import LoginAdmin from './components/SiteOwner/LoginSite'
import UserList from './components/SiteOwner/UserList'
import ComapnyCreate from './components/admin/ComapnyCreate'
import ComapnySetUp from './components/admin/CompanySetUp'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import VerifyOtp from './components/SiteOwner/VerifyOtp'
import StudentDetails from './components/SiteOwner/StudentDetails'
import CompanyDetails from './components/SiteOwner/CompanyDetails'
import RecuiterDetails from './components/SiteOwner/RecuiterDetails'

const appRouter=createBrowserRouter([
  {
    path:'/owner/login',
    element:<LoginAdmin/>
  },
  {
    path:'/owner/dashboard',
    element:<UserList/>
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

  // admin ke liye

  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ComapnyCreate/>
  },
  {
    path:"/admin/companies/create",
    element:<ComapnyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<ComapnySetUp/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  },
  {
    path:"/owner/verifyadmin",
    element:<VerifyOtp/>
  },
  {
    path:"/owner/studentlist",
    element:<StudentDetails/>
  },
  {
    path:"/owner/recuiterlist",
    element:<RecuiterDetails/>
  },
  {
    path:"/owner/companylist",
    element:<CompanyDetails/>
  },


]);
function App() {

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
