import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Alert,
  AlertIcon,
  AlertDescription,
  Box
} from '@chakra-ui/react'
import SetCords from './SetCords'

export default function RequestReview ({ id, formRef, handleClick, error }) {
  console.log('this is the ID:' + id)
  const [service, setService] = useState([])
  const [dates, setDates] = useState([])
  const [loaded, setLoaded] = useState()

  useEffect(() => {
    fetch(`/services/${id}`)
      .then(r => r.json())
      .then(service => {
        setService(service)
        setDates(service.dates)
        setLoaded(true)
        console.log("service filtering user"+ JSON.stringify(service))
      })
  }, [])

  return loaded ? (
    <div style={{   marginLeft: 20, marginTop: 20, display: 'grid', gridTemplateColumns:"1fr 1fr", overflow:'hidden' }}>
      <div>
      <Card maxW='md' backgroundColor={'white'}>
        <CardBody>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Service No. - {service.id}</Heading>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Text>{service.description}</Text>
            <Text color='blue.600' fontSize='md'>
              Dates Picked (yy/mm/dd):
              {dates.map((date, index) => {
                return <ol key={index}>{date}</ol>
              })}
            </Text>
          </Stack>

          <Button type='primary' onClick={handleClick}>
            Add Quote
          </Button>
          {error && (
            <Box marginLeft={'90px'} marginTop={5} w={'70%'}>
              <Alert status='error' borderRadius={4}>
                <AlertIcon />
                <AlertDescription>
                  {' '}
                  Oops! Quote is already added!
                </AlertDescription>
              </Alert>
            </Box>
          )}
        </CardBody>

        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              {' '}
              Locate on map{' '}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      </div>
      
      
      <div style={{marginLeft:"-15px", width:520 ,height: "630px", overflow:"hidden" , marginBottom:"-50px"}} >
      <SetCords service={service}></SetCords>
      </div>

    </div>
  ) : (
    <p>Loading..</p>
  )
}
