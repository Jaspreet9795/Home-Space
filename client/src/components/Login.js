import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Tabs,
  Select,
  InputGroup,
  InputRightElement,
  InputLeftAddon
} from '@chakra-ui/react'

export default function Login ({ updateUser }) {
  // console.log("update User" + updateUser)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState('')
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

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
            if (user.role=="service_provider"){
            navigate('/service_provider_dashboard')}
            else {
            navigate('/')}
          } else {
            // TODO: set error message because credentials are wrong
          }
        })
      } else {
        r.json().then(json => setErrors(json.errors))
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
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Input
                  ref={initialRef}
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <Input
                  placeholder='Password'
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleLogin}>Login</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Tabs>
    </>
  )
}
