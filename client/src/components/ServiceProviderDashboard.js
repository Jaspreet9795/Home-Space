import React, {useEffect, useState, useRef} from "react";
import { Box, Text, Tab, Tabs, TabList, GridItem, Grid, SimpleGrid, Card, CardBody, CardHeader, Heading, CardFooter, Divider} from '@chakra-ui/react'
import {HomeTwoTone} from "@ant-design/icons";
import AddQuotation from "./AddQuotation";
import RequestReview from "./RequestReview";

export default function ServiceProviderDashboard (){
   const[services, setServices]= useState([])
   const [reviewRequest, setReviewRequest]= useState(false)
   const [id, setId]= useState(1)
   const [quotations, setQuotations]=useState([])

   const formRef = useRef(null);
   
   
    useEffect(()=>{
        fetch("/services")
        .then(r=>r.json())
        .then (services=>{
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
        <Box   display={'flex'}  borderRadius='lg'   px={4} h={"60px"}>
          <HomeTwoTone style={{ marginTop: '15px', fontSize: '30px' }}/>
          <Text fontSize={"2xl"} fontFamily={'cursive'} marginLeft="10px" marginTop={'15px'} >Home Space</Text>
          <Tabs marginTop={'12px'} marginLeft={"800px"} >
            <TabList >
              <Tab >Confirmed Bookings</Tab>
              <Tab ></Tab>
              <Tab >Login</Tab>
            </TabList>
          </Tabs>
          
          
          
          <Grid position={'fixed'} marginTop="110px"  templateColumns='repeat(4, 1fr)'  gap={5}>
            <GridItem  overflow="scroll" display="grid" borderRadius='3xl' borderWidth={'thin'}   w='350px' h='700' bg='white'  >
              {services.map(service=>{
                return(
                <SimpleGrid spacing={4}  margin='10px' templateRows='repeat(auto-fill, minmax(200px, 1fr))'>
                  <Card onClick={()=> {
                    setReviewRequest(!reviewRequest);
                    setId(service.id);
                    console.log("this is check 2:" + service)
                    }} key={service.id} >
                      
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
            
           
            <GridItem borderRadius='lg' borderWidth={'2px'} w='1050px' h='740' bg='white'  overflow={'scroll'} >
           
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
        </Box>
    )
}