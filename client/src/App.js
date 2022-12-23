import React , {useState, useEffect} from "react";
import LandingPage from './components/LandingPage';
import { Route, Routes  } from 'react-router-dom';


import BookingRequest from "./components/BookingRequest";
import ServiceProviderDashboard from "./components/ServiceProviderDashboard"; 
import { Link } from "@chakra-ui/react";
import AddQuotation from "./components/AddQuotation";

export default function App(){

  const [services, setServices]= useState([])

  useEffect(()=>{
    fetch ("/services")
    .then(r=>r.json())
    .then(services=>setServices(services))
  },[])


  function addRequest(newRequest){
    setServices([...services, newRequest])
  }


  return (

    <>
    <Routes>
      <Route exact path= "/" element={<LandingPage />}></Route>
      <Route path="booking_request" element={<BookingRequest addRequest={addRequest}/>} ></Route>
      <Route path="service_provider_dashboard" element={<ServiceProviderDashboard/>} ></Route>
      {/* <Route exact path= "addQuote" element={<AddQuotation />}></Route> */}
       
      </Routes>
      
      </>
  )
}


