import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from './pages/home/Home';  
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddPost from './pages/admin/page/AddPost';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allposts from './pages/allposts/Allposts';
import Challenge from './pages/challenges/Challenge';
import AddChallenge from './pages/challenges/SubmitChlg';
import ChallengeInfo from './pages/challenges/ChallengeInfo';
import CommentReply from './pages/commentform/CommentReply';
function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allposts" element={<Allposts />} /> 
            {/* <ProtectedRoute> */}
              <Route path="/challenges" element={<Challenge />} />
            {/* </ProtectedRoute>  */} 
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/productinfo/:id' element={<ProductInfo/>} />

          <Route path='productinfo/commentreplies/:id' element={<CommentReply/>} />

          <Route path='/challengeInfo/:id' element={<ChallengeInfo/>} />

          <Route path='/submitChallenge' element={ 
              <AddChallenge/> 
          } />

          <Route path='/addproduct' element={ 
              <AddPost/> 
          } />
          <Route path='/updateproduct' element={
              <UpdateProduct/> 
          } />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>

  )
}

export default App 

// user 

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin 

const ProtectedRouteForAdmin = ({children})=> {
  const admin = JSON.parse(localStorage.getItem('user'))
  
  if(admin.user.email === 'siddiqui20042007@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}