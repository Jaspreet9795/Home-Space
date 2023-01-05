import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  useDisclosure,
  Tab,
  Tabs,
  Alert,
  AlertIcon,
  AlertDescription,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react'

export default function Login ({ updateUser }) {
  // console.log("update User" + updateUser)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState('')
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => setShowPassword(!showPassword)

  function handleLogin (e) {
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }
    let url = '/login'
    // if (register) url = '/users'

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(r => {
      if (r.ok) {
        r.json().then(user => {
          if (user.id !== undefined) {
            console.log('checking response ' + JSON.stringify(r))
            updateUser(user)
            if (user.role === 'service_provider') {
              navigate('/service_provider_dashboard')
            } else {
              navigate('/')
            }
          } else {
            setError(true)
          }
        })
      } else {
        r.json().then(json => setError(json.error))
      }
    })
  }

  return (
    <>
      <Tabs>
        <Tab onClick={onOpen}>Login</Tab>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader marginLeft={'170px'}>Login</ModalHeader>
            {error && (
              <Box marginLeft={'90px'} marginBottom={5} w={'60%'}>
                <Alert status='error' borderRadius={4}>
                  <AlertIcon />
                  <AlertDescription>
                    {' '}
                    Invalid Email or Password!
                  </AlertDescription>
                </Alert>
              </Box>
            )}
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <Input
                  value={email}
                  ref={initialRef}
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} id='password' isRequired>
                <InputGroup>
                  <Input
                    h='40px'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                    required
                  ></Input>
                  <InputRightElement width={'4.5rem'}>
                    <Button h='1.5rem' size='sm' onClick={handleClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button width={'50%'} marginRight={'100px'} onClick={handleLogin}>
                Login
              </Button>
              <br></br>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Tabs>
    </>
  )
}
