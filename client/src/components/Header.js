import React, {useEffect, useState} from "react";
import { Box, Text, Tab, Tabs, TabList } from '@chakra-ui/react'
import {HomeTwoTone} from "@ant-design/icons";
import Register from "./Register";
import Login from "./Login";
import LogOut from "./LogOut";


export default function Header ({updateUser, currentUser}){
    const [users, setUsers]= useState([])
    const [loggedIn, setLoggedIn] = useState(currentUser)
    // useEffect(() => {}, [currentUser]);

    useEffect(()=>{
      setLoggedIn(currentUser);
      console.log('changing logged in')
     }, [currentUser]);

    useEffect (()=>{
        fetch ("/users")
        .then (r=>r.json())
        .then (users=>setUsers(users))
      },[])

      function addUser(newUser){
        setUsers([...users, newUser])
      }


    

    return (
    <Box   display={'flex'}  borderRadius='lg'   px={4} h={"60px"}>
        <HomeTwoTone style={{ marginTop: '15px', fontSize: '30px' }}/>
        <Text fontSize={"2xl"} fontFamily={'cursive'} marginLeft="10px" marginTop={'15px'} >Home Space</Text>
        <Tabs marginTop={'12px'} marginLeft={"800px"} >
        <TabList >
        <Tab >My Requests</Tab>
        <Register addUser={addUser}></Register>
         {!loggedIn ? 
        <Login updateUser={updateUser}></Login>: <LogOut updateUser={updateUser}></LogOut>}
      </TabList>
    </Tabs>
    </Box>
    )





}