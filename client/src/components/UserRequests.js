import React, { useState, useEffect } from 'react'
import {
  Box,
  Divider,
  Center,
  Grid,
  GridItem,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  CardFooter,
  CardHeader
} from '@chakra-ui/react'
import Header from './Header'

function convertToDisplayService(service) {
    if(service === 'home_painting') {
        return "Home Painting"
    }
    return "unknown service"
}

export default function UserRequests () {
    const [services, setServices]=useState([])
    const [quotes, setQuotes]= useState([])
    const [reviewQuote, setReviewQuote]= useState(false )

    useEffect(()=>{
        fetch("/filter_user_service")
        .then(r=>r.json())
        .then (services=>{
          console.log("checking filter services"+JSON.stringify(services))
            setServices(services);
            console.log("check x"+JSON.stringify(services[0].quotations));
            // setDates(services.dates)
            // setId(services[0].id)
            
            console.log("this is printing" + services[0].id)
        })
    },[])

    function handleClick(){
     

    }




  return (
    <>
      <Header></Header>
      <Box
        marginTop={'50px'}
        marginStart={'150px'}
        position={'fixed'}
        height='600px'
        width='1200px'
        display={'flex'}
        borderRadius='2xl'
        borderWidth={'thin'}
      >
        <GridItem
          overflow='scroll'
          marginLeft={'10px'}
          marginTop={'10px'}
          height={'580px'}
          width={'500px'}
          display='grid'
          borderRadius='3xl'
          borderWidth={'thin'}
        >

            {services.map((service)=>{
             return (
        
          <SimpleGrid width={'500px'}>
            <Card maxW='lg'key ={service.id} onClick={handleClick}>
              <CardBody>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>Requested For {convertToDisplayService(service.service_type)}</Heading>
                  <Text>
                    {service.description}
                  </Text>
                  <Text color='blue.600' fontSize='lg'>
                    Dates Selected:{service.dates.map((date, index)=>{
                  return(<ol key={index}>{date}</ol>)
                })}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing='2'>
                  <Button variant='solid' colorScheme='blue'>
                  Edit
                  </Button>
                  {/* <Button variant='ghost' colorScheme='blue'>
                    Add to cart
                  </Button> */}
                </ButtonGroup>
              </CardFooter>
            </Card>
          </SimpleGrid>
            )})}
        </GridItem>
  

        <Center height='550px' marginTop='20px' marginLeft={'100px'}>
          <Divider orientation='vertical' />
        </Center>

        <GridItem
          marginLeft={'10px'}
          marginTop={'10px'}
          overflow='scroll'
          height={'580px'}
          width={'500px'}
          display='grid'
          borderRadius='3xl'
          borderWidth={'thin'}
        >

            {services.map((service)=>{
          return(
           
          <SimpleGrid
            spacing={4}
            templateRows='repeat(auto-fill, minmax(200px, 1fr))'
          >
            <Card key={service.id} >
                { service.quotations.map((quote)=>{

                    return (
               
                    < >
              <CardHeader>
                <Heading size='md'> Provider's NAme </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                {quote.comment}
                </Text>
                <Text>
                {quote.date}
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
              </>
                 ) })
            }
            </Card>
           
              
          </SimpleGrid>
       )})}    
        </GridItem>
      </Box>
    </>
  )
}
