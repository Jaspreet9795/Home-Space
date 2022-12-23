import React,{useEffect, useState} from "react";
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text,Divider, ButtonGroup, Button, Image } from '@chakra-ui/react'



export default function RequestReview ({id, formRef, handleClick}){
  console.log("this is the ID:" + id)
    const[service, setService]= useState([])
    const[dates, setDates]=useState([])
    const [loaded, setLoaded] = useState()

    useEffect(()=>{
        fetch(`/services/${id}`)
        .then(r=>r.json())
        .then (service=>{
          setService(service);
          setDates(service.dates)
          setLoaded(true)
          console.log(service)
        })
    },[])
    
    
    return loaded?(
       <div style={{marginLeft:20, marginTop:20}}  >
         <Card maxW='md' >
          <CardBody>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>Service No. > {service.id}</Heading>
              <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'/>
              <Text>
                {service.description}
              </Text>
              <Text color='blue.600' fontSize='md'>
                Dates Picked (yy/mm/dd):

               {dates.map((date, index)=>{
                  return(<ol key={index}>{date}</ol>)
                })}
              </Text>
            </Stack>



            <Button type="primary" onClick={handleClick}>Add Quote</Button>

          </CardBody>
          
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'> Locate on map </Button>
            </ButtonGroup>
            
           
       
           
           </CardFooter>
        </Card>
        
      
       </div>

    ): <p>Loading..</p>
}

