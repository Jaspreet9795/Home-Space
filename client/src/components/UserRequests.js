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
import UserHeader from './UserHeader'

function convertToDisplayService (service) {
  if (service === 'home_painting') {
    return 'Home Painting'
  } else if (service === 'home_cleaning') {
    return 'Home Cleaning'
  } else if (service === 'electrician') {
    return 'Electrician'
  } else if (service === 'plumber') {
    return 'Plumber'
  } else if (service === 'landscaping') {
    return 'Landscaping'
  } else return 'unknown service'
}

export default function UserRequests ({updateUser, currentUser}) {
  const [services, setServices] = useState([])
  const [quotes, setQuotes] = useState([])
  const [reviewQuote, setReviewQuote] = useState(false)
  const [id, setId] = useState(1)
  const [confirm, setConfirm]= useState(false)


  useEffect(() => {
    fetch('/filter_user_service')
      .then(r => r.json())
      .then(services => {
        console.log('checking filter services' + JSON.stringify(services))
        setServices(services)
        console.log('this is printing' + services[0].id)
      })
  }, [confirm])


  

  function handleConfirm (id) {
    // e.preventDefault();
   const confirm_quote={
    confirmed: true
   }

    fetch(`confirm_quote/${id}`, {
        method: "PATCH", 
        headers: {
            'Content-Type': 'application/json',
            "Accept" :"application/json"
        }, 
        body : JSON.stringify(confirm_quote)
    })
    .then (r=>{
        console.log("Confirm Response" + JSON.stringify(r))
    })
    .then (setConfirm(!confirm))
    
  }

  function handleShowQuotes () {}

  return (
    <>
      <UserHeader   updateUser={updateUser}   currentUser={currentUser} ></UserHeader>
      <Box
        marginTop={'100px'}
        marginStart={'150px'}
        marginLeft='200px'
        position={'fixed'}
        height='600px'
        width='1070px'
        display={'flex'}
        borderRadius='2xl'
        borderWidth={'thin'}
      >
        <GridItem
          overflow='scroll'
          marginLeft={'30px'}
          marginTop={'10px'}
          height={'580px'}
          width={'500px'}
          display='grid'
          borderRadius='3xl'
          borderWidth={'thin'}
          backgroundImage={
            'https://t4.ftcdn.net/jpg/03/33/21/09/360_F_333210966_pfz4MQFkZxYqwGaK6DbfMcF747ciIh9x.jpg'
          }
          //   backgroundImage={"https://inc42.com/wp-content/uploads/2015/08/home-services.jpg"}
        >
          {services.map(service => {
            return (
              <SimpleGrid
                width={'400px'}
                margin='20px'
                marginLeft={'50px'}
                templateRows='repeat(auto-fill, minmax(400px, 1fr))'
              >
                <Card maxW='lg' key={service.id} backgroundColor='white'>
                  <CardBody>
                    <Image
                      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                      alt='Green double couch with wooden legs'
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>
                        Requested for :{' '}
                        {convertToDisplayService(service.service_type)}
                      </Heading>
                      <Text>
                        <b>Description:</b>
                        <br></br>
                        {service.description}
                      </Text>
                      <Text fontSize='sm'>
                        <b> Dates Selected:</b>
                        {service.dates.map((date, index) => {
                          return <li key={index}>{date}</li>
                        })}
                      </Text>
                    </Stack>
                  </CardBody>

                  <ButtonGroup spacing='2'>
                    <Button
                      variant='solid'
                      colorScheme='blue'
                      height={'30px'}
                      size={'md'}
                      marginLeft='80px'
                      marginBottom={'20px'}
                    >
                      Edit Request
                    </Button>
                    <Button
                      variant='ghost'
                      colorScheme='blue'
                      height={'30px'}
                      size={'md'}
                      marginBottom={'20px'}
                      onClick={() => {
                        setReviewQuote(!reviewQuote)
                        console.log('Checking User on Click')
                        setId(service.id)
                      }}
                    >
                      Show Quotes
                    </Button>
                  </ButtonGroup>
                </Card>
              </SimpleGrid>
            )
          })}
        </GridItem>

        <GridItem
          marginLeft={'10px'}
          marginTop={'10px'}
          overflow='scroll'
          height={'580px'}
          width={'500px'}
          display='grid'
          borderRadius='3xl'
          borderWidth={'thin'}
          marginRight='10px'
          //   backgroundImage={"https://inc42.com/wp-content/uploads/2015/08/home-services.jpg"}
          backgroundImage={
            'https://t4.ftcdn.net/jpg/03/33/21/09/360_F_333210966_pfz4MQFkZxYqwGaK6DbfMcF747ciIh9x.jpg'
          }
        >
          {services.map(service => {
            return (
              <SimpleGrid
                templateRows='repeat(auto-fill, minmax(200px, 1fr))'
                marginTop={'20px'}
                marginBottom='20px'
                width='400px'
                marginLeft={'50px'}
                marginRight='20px'
                spacing={5}
              >
                {service.quotations
                  .filter(quote => quote.service_id === id)
                  .map(quote => {
                    return (
                      <Card
                        key={quote.id}
                        maxW='lg'
                        height={'auto'}
                        backgroundColor={'white'}
                      >
                        <CardHeader>
                          <Heading size='md'> Provider's NAme </Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>
                            <b>Comments:</b> {quote.comment}
                          </Text>
                          <Text>
                            <b> Date Provided:</b> {quote.date}
                          </Text>
                          <Text>
                            <b>Quote Given:</b> ${quote.quotation}
                          </Text>
                        </CardBody>
                        <CardFooter>
                          <Button size={'md'} onClick={()=>{handleConfirm(quote.id)}}>
                            {quote.confirmed?<> Confirmed </>: <>Confirm</>  }
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
              </SimpleGrid>
            )
          })}
        </GridItem>
      </Box>
    </>
  )
}
