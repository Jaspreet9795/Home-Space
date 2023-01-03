import React from "react";
import UserHeader from "./UserHeader";
import { Card } from 'antd';
import { Container , Button, Box, Text, Center, Heading} from "@chakra-ui/react";
// import { Carousel } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./styles.css";
import {Autoplay, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";


const { Meta } = Card;


export default function LandingPage({updateUser, currentUser}){
   
   
   
    return (
    <>
    {/* // <div style={{ backgroundImage: "url(https://www.residencestyle.com/wp-content/uploads/2019/03/home-maintenance.jpg)" }}> */}
        <UserHeader updateUser={updateUser}  currentUser={currentUser}></UserHeader>

        {/* <div   style={{ marginTop:"400px",  alignItems:"center", display:"flex", justifyContent:"center"}} > */}
      {/* <div style={{ backgroundImage: "url(https://www.residencestyle.com/wp-content/uploads/2019/03/home-maintenance.jpg)", backgroundSize:"cover" }} > */}
         
         <Box    marginTop={'50px'} marginStart={'150px'} height='200px' width='1200px'  display={'flex'}  position={'fixed'}
        >
          <div style ={{marginLeft:"300px", h:'100px' ,color:"black"}} >
            <Heading fontSize={"2xl"}> We provide Home Services on demand!</Heading>
          
           <h2 style={{marginLeft:"-20px", color:"gray"}}> Home Cleaning | Landscaping | Electrician | Plumber | Home Painting</h2>
          </div>


        </Box>
  

        <Box
       
        marginTop={'150px'}
        marginStart={'150px'}
        position={'fixed'}
        height='500px'
        width='1200px'
        display={'flex'}
        borderRadius='2xl'
        borderWidth={'thin'}
       justifyItems={"stretch"}
      >
        {/* <Container style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            width: '1200px'
           }} > */}

       <Swiper

       marginTop="300px"
       slidesPerView={3}
       slidesPerGroup={3}
       loop={true}
       loopFillGroupWithBlank={true}
        spaceBetween={30}
        // centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{width: '100%'}}
        justifyContent="space-evenly"
        
      >

       
        <SwiperSlide >
        <Link to="booking_request">
        <Card 
         hoverable
         style={{width: 350, height:400, marginLeft:"40px",  marginRight:"0px", marginTop:"30px"}}
         cover={<img style={{ height:290, width:350,  objectFit:"cover"}}  alt="Landscape" src="https://www.thespruce.com/thmb/3w5ScaETAEEyw2d429FFw7skWH8=/4119x2741/filters:fill(auto,1)/spring-lawn-care-2132455-09-df14429ef98948e69439952f6e7287fa.jpg" />}
        >
        <Meta  title="Landscaping" description="Lawn Care | Leaf Removal | Bush Trimming | Sodding | Lawn Treatment"></Meta>
       {/* <Link to="booking_request">
        <Button>Book</Button> 
        </Link> */}
        </Card>
        </Link>
               
        </SwiperSlide>
        
        <SwiperSlide>
        <Link to="booking_request">
        <Card 
         hoverable
         style={{width: 350, height:400, marginLeft:"20px", marginTop:"30px" }}
         cover={ <div ><img style={{height:290, width:350,  objectFit:"cover" }}  alt="Landscape" src="https://thisoldhouse.jppadmin.com/wp-content/uploads/sites/10/2022/06/AdobeStock_313494367-scaled.jpeg" /></div>}
        >
        <Meta  title="Plumbers" description="Repair | Replacement | Installation | Unclogging Blockage | Leak repair" />
        </Card>
        </Link>
        </SwiperSlide>

        <SwiperSlide>
        <Link to="booking_request">
        <Card 
         hoverable
         style={{width: 350, height:400, marginLeft:"-10px", marginTop:"30px" }}
         cover={ <div ><img style={{height:290, width:350,  objectFit:"cover"}}  alt="Landscape" src="https://as1.ftcdn.net/v2/jpg/02/75/82/56/1000_F_275825618_fGYIBizEgWEdiG07tKEcJn5KCm4a0oTW.jpg" /></div>}
        >
        <Meta  title="Electricians" description="Servicing | Repair | Installation | UnInstallation" />
        </Card>
        </Link>
        </SwiperSlide>

        <SwiperSlide>
        <Link to="booking_request">
        <Card 
         hoverable
         style={{width: 350, height:400, marginLeft:"200px", marginTop:"30px" }}
         cover={ <div ><img style={{height:290, width:350,  objectFit:"cover"}}  alt="Landscape" src="https://5.imimg.com/data5/MS/GS/MY-3497762/home-painting-services-1000x1000.jpg" /></div>}
        >
        <Meta  title="Home Painting" description="Water Proofing | Textured Walls | Enamel Painting" />
        </Card>
        </Link>
        </SwiperSlide>
       
        <SwiperSlide>
        <Link to="booking_request">
        <Card 
         hoverable
         style={{width: 350, height:400, marginLeft:"200px", marginTop:"30px" }}
         cover={ <div ><img style={{height:290, width:350,  objectFit:"cover"}}  alt="Landscape" src="https://www.smcflorida.com/wp-content/uploads/2022/08/sm-residential-cleaning.jpg" /></div>}
        >
        <Meta  title="Home Cleaning" description="Vacuuming | All Areas Deep Cleaning including furniture, windows, doors, walls | Mopping  " />
        </Card>
        </Link>
        </SwiperSlide>
       
    
       
      </Swiper>

      
      {/* </Container> */}







    

    </Box>
    {/* </div> */}
    </>
    //  </div>
    
    )}


