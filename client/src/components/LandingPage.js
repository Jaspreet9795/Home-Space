import React from "react";
import Header from "./Header";
import { Card } from 'antd';
import { Container , Button} from "@chakra-ui/react";
// import { Carousel } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./styles.css";
import {Autoplay, Pagination, Navigation } from "swiper";


const { Meta } = Card;


export default function LandingPage(){
   
   
   
    return (
    <div style={{ backgroundImage: "url(https://www.residencestyle.com/wp-content/uploads/2019/03/home-maintenance.jpg)" }}>
        <Header></Header>
        
        <Container style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            width: '1200px'
           }} >

       <Swiper

       marginTop="300px"
       slidesPerView={1}
       slidesPerGroup={1}
       loop={true}
       loopFillGroupWithBlank={true}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{width: '100%'}}
      >


        <SwiperSlide >
        <Card 
         hoverable
         style={{width: 550, height:600}}
         cover={<img style={{ height:450, width:650 }}  alt="Landscape" src="https://i.insider.com/62dafedf21142200185ed6d9?width=750&format=jpeg&auto=webp" />}
        >
        <Meta  title="Landscaping" description="www.instagram.com"></Meta>
        <Button>Book</Button> 
        </Card>
               
        </SwiperSlide>
        <SwiperSlide>
        <Card 
         hoverable
         style={{width: 550, height:600}}
         cover={ <div ><img style={{ height:450, width:650 }}  alt="Landscape" src="https://www.4servicepros.com/wp-content/uploads/2022/11/electrical-outlet-installation.jpg" /></div>}
        >
        <Meta  title="Europe Street beat" description="www.instagram.com" />
        </Card>
        </SwiperSlide>
        {/* <SwiperSlide>Slide 3</SwiperSlide> */}
       
      </Swiper>

      
      </Container>










        {/* <Container style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        width:'2xl'
           }} >
        <Card 
         hoverable
         style={{width: 550, height:400}}
         cover={<img style={{ height:300, width:400 }}  alt="Landscape" src="https://i.insider.com/62dafedf21142200185ed6d9?width=750&format=jpeg&auto=webp" />}
        >
        <Meta  title="Europe Street beat" description="www.instagram.com" />
        </Card>

        <Card 
         hoverable
         style={{width: 550, height:400}}

         cover={ <div ><img style={{ height:300, width:400 }}  alt="Landscape" src="https://www.4servicepros.com/wp-content/uploads/2022/11/electrical-outlet-installation.jpg" /></div>}
        >
        <Meta  title="Europe Street beat" description="www.instagram.com" />
        </Card>
        </Container> */}
    </div>
   )
}

