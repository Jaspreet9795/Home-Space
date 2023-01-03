import React, {useEffect, useState, useRef} from "react";
import { Box, Text, Tab, Tabs, TabList, GridItem, Grid, SimpleGrid, Card, CardBody, CardHeader, Heading, CardFooter, Divider} from '@chakra-ui/react'
import {HomeTwoTone} from "@ant-design/icons";
import AddQuotation from "./AddQuotation";
import RequestReview from "./RequestReview";
import { Link } from "react-router-dom";
import Login from "./Login";
import LogOut from "./LogOut";
import ProviderHeader from "./ProviderHeader";


export default function ServiceProviderDashboard ({currentUser, updateUser}){
   const[services, setServices]= useState([])
   const [reviewRequest, setReviewRequest]= useState(false)
   const [id, setId]= useState(1)
   const [quotations, setQuotations]=useState([])
   const [loggedIn, setLoggedIn] = useState(currentUser)
   const formRef = useRef(null);
   
   
    // useEffect(()=>{
    //     fetch("/services")
    //     .then(r=>r.json())
    //     .then (services=>{
    //         setServices(services);
    //         setId(services[0].id)
            
    //         console.log("this is printing" + services[0].id)
    //     })
    // },[])

    useEffect(()=>{
      fetch("/filter_service")
      .then(r=>r.json())
      .then (services=>{
        console.log("checking filter services"+JSON.stringify(services))
          setServices(services);
          setId(services[0].id)
          
          console.log("this is printing" + services[0].id)
      })
  },[])


    useEffect(()=>{
      fetch("/quotations")
      .then (r=>r.json())
      .then (quotations=>setQuotations(quotations))
    },[])

    function addQuotation(newQuote){
      setQuotations([...quotations, newQuote])
    }

    const handleClick = () => {
      formRef.current?.scrollIntoView({behavior: 'smooth'});
    };


    return (
        // <Box   display={'flex'}  borderRadius='lg'   px={4} h={"60px"}>
        //   <HomeTwoTone style={{ marginTop: '15px', fontSize: '30px' }}/>
        //   <Text fontSize={"2xl"} fontFamily={'cursive'} marginLeft="10px" marginTop={'15px'} >Home Space</Text>
        //   <Tabs marginTop={'12px'} marginLeft={"800px"} >
        //     <TabList >
        //       <Link  to="/confirmed_booking">
        //       <Tab >Confirmed Bookings</Tab>
        //       </Link>
        //       <Tab ></Tab>
        //    {!loggedIn ?  
        //    <Login ></Login>: <LogOut ></LogOut>}
        //     </TabList>
        //   </Tabs>

        <>
          <ProviderHeader updateUser={updateUser}  currentUser={currentUser}></ProviderHeader>
          
          
          <Grid position={'fixed'} marginTop="110px"  templateColumns='repeat(4, 1fr)'  gap={5}>
            <GridItem  overflow="scroll" display="grid" borderRadius='3xl' borderWidth={'thin'}   w='380px' h='700' backgroundImage={"https://thumbs.dreamstime.com/b/seamless-background-cleaning-service-backdrop-services-maintenance-vector-set-pictogram-linear-pictures-can-be-used-68738809.jpg"} >
              {services.map(service=>{
                return(
                <SimpleGrid spacing={4}  margin='20px' templateRows='repeat(auto-fill, minmax(200px, 1fr))' >
                  <Card onClick={()=> {
                    setReviewRequest(!reviewRequest);
                    setId(service.id);
                    console.log("this is check 2:" + service)
                    }} key={service.id} backgroundColor={"white"}>
                      
                      <CardHeader>
                        <Heading size='md'>Request No.={service.id}</Heading>
                      </CardHeader>
                      
                      <CardBody >
                        <Text textColor={"GrayText"}>{service.description}</Text>
                      </CardBody>
                      
                      <CardFooter >
                     </CardFooter>
                   </Card>
             
                </SimpleGrid>
                )})}
            </GridItem>
            
           
            <GridItem borderRadius='lg' borderWidth={'2px'} w='1050px' h='700' bg='white'  overflow={'scroll'} backgroundImage={"https://png.pngtree.com/background/20210716/original/pngtree-white-background-photography-labor-tools-may-1-labor-day-picture-image_1382106.jpg"}>
           
              <RequestReview id={id} key={id} formRef={formRef} handleClick={handleClick}></RequestReview>
             
              <br></br>
              <br></br>
              <Divider></Divider>
              <GridItem  w='1050px' h='740' bg='white'  >
                <div style={{marginLeft: 130, marginTop:100}}>
                <AddQuotation id={id} addQuotation={addQuotation}  formRef={formRef}></AddQuotation>
                </div>
              </GridItem>
             
            </GridItem>
          
          </Grid>
        {/* </Box> */}

</>
    )
}