import React , {useState, useEffect} from "react";
import LandingPage from './components/LandingPage';
import { Route, Routes  } from 'react-router-dom';


import BookingRequest from "./components/BookingRequest";
import ServiceProviderDashboard from "./components/ServiceProviderDashboard"; 
import { Link } from "@chakra-ui/react";
import AddQuotation from "./components/AddQuotation";
import Login from "./components/Login";

export default function App(){

  const [services, setServices]= useState([])
  const [currentUser, setCurrentUser] =useState(false)
  
  
  
  const fetchServices=()=>{
    fetch ("/services")
    .then(r=>r.json())
    .then(services=>setServices(services))
  }
 
   useEffect(()=>{
    fetch ('/authorised_user')
    .then(res=>{
      if(res.ok){
        res.json()
        .then (user=>{
          setCurrentUser(user)
          fetchServices()
        })
      }
   })
  },[])







  function addRequest(newRequest){
    setServices([...services, newRequest])
  }

  const updateUser=(user)=> setCurrentUser(user)

  // const checkLogin =()=>{
  //   console.log('current user is '+currentUser)
  //   return currentUser
  // }

  return (

    <>
     {/* {!currentUser? <Login ></Login> : */}
    <Routes>
      <Route exact path= "/" element={<LandingPage updateUser={updateUser}   currentUser={currentUser}/>}></Route>
      <Route path="booking_request" element={<BookingRequest addRequest={addRequest}/>} ></Route>
      <Route path="service_provider_dashboard" element={<ServiceProviderDashboard/>} ></Route>
    
      </Routes>
{/* } */}
      </>

  )
}


