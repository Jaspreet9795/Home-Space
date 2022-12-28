import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Tab,
  Select, InputGroup, InputRightElement, InputLeftAddon, 
} from '@chakra-ui/react'

export default function Register ({addUser}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [name, setName] = useState('')
  const [userSelection, setUserSelection] = useState('')
  const [serviceSelection, setServiceSelection] = useState('')
  const [email, setEmail]=useState("")
  const [password, setPassword]= useState("")
  const [address, setAddress]= useState("")
  const [stateSelection, setStateSelection]=('')
  const [zip, setZip]= useState()
  const [phone, setPhone]= useState()
  const [show, setShow] = useState(false)
  const [showPassword, setShowPassword]= useState(false)
 

  const handleClick=()=> setShowPassword(!showPassword)

  const states =['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
 

 

  function handleSubmit (e){
    e.preventDefault();
    console.log("print this")
    const newUser= {
        name : name, 
        role : userSelection, 
        service_provided :serviceSelection, 
        address :address, 
        zip :zip, 
        state :stateSelection, 
        email: email, 
        password :password, 
        phone :phone
    }
    fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(r => r.json())
        .then(newUser => {
          addUser(newUser)
        })
  } 

  return (
    <>
      <Tab onClick={onOpen}>Register</Tab>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'lg'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl>
              <Input ref={initialRef} placeholder='Name' onChange={e=>setName(e.target.value)}/>
            </FormControl>
            <br></br>



            <FormControl id='userSelection'>
              <Select
                value={userSelection}
                onChange={e => {
                  setUserSelection(e.target.value)
                  if (e.target.value === 'service_provider') {
                    console.log('setting Show ')
                    setShow(true)
                  } else {
                    setShow(false)
                  }}}
                placeholder='Select Role'
              >
                <option value='user'>User</option>
                <option value='service_provider'>Service Provider</option>
              </Select>
            </FormControl>
            <br></br>



            {show && <FormControl id='serviceSelection'>
              <Select
                value={serviceSelection}
                onChange={e => setServiceSelection(e.target.value)}
                placeholder='Select the service you will provide'
              >
                <option value='landscaping'>Landscaping</option>
                <option value='electrician'>Electrician</option>
                <option value='plumber'>Plumber</option>
                <option value='home_cleaning'>Home Cleaning</option>
                <option value='home_painting'>Home Painting</option>
              </Select>
            </FormControl> }
            <br></br>

            <FormControl id="email" isRequired>
            <Input h="30px" placeholder="Email address " 
            onChange={e=>setEmail(e.target.value)}></Input>
           </FormControl>
           <br></br>

           <FormControl id="password" isRequired>
            <InputGroup>
            <Input h="40px" type={showPassword? "text" : "password"} placeholder="Password" 
            onChange={e=>setPassword(e.target.value)}></Input>
            <InputRightElement width={"4.5rem"}>
                <Button   h="1.5rem" size="sm" onClick={handleClick}>{showPassword? "Hide" : "Show"}</Button>
            </InputRightElement>
            </InputGroup>
           </FormControl>
           <br></br>

            <FormControl id="address" isRequired>
            <Input h="30px" placeholder="Address " 
            onChange={e=>setAddress(e.target.value)}></Input>
           </FormControl>
           <br></br>

           <FormControl id='stateSelection'>
              <Select
                value={stateSelection}
                onChange={e => setStateSelection(e.target.value)}
                placeholder='State'
              >
                {states.map((state, index)=>{
                    return (<option value={state} key={index}>{state}</option>)
                    })}
                
                
              </Select>
            </FormControl> 
            <br></br>

            <FormControl id="zip" isRequired>
            <Input h="30px" placeholder="Zip code " 
            onChange={e=>setZip(e.target.value)}></Input>
           </FormControl>
           <br></br>
           
           <FormControl id="phone" isRequired>
           <InputGroup>
           <InputLeftAddon h="30px" children="+1" />
            <Input type='tel' h="30px" placeholder="Phone number " 
            onChange={e=>setPhone(e.target.value)}></Input>
             </InputGroup>
           </FormControl>
           <br></br>
          </ModalBody>

          <ModalFooter>
            <Button  onClick={handleSubmit} colorScheme='blue' mr={3}>
              Register
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
