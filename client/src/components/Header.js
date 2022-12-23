import React from "react";
import { Box, Text, Tab, Tabs, TabList } from '@chakra-ui/react'
import {HomeTwoTone} from "@ant-design/icons";




export default function Header (){
  

    return (
    <Box   display={'flex'}  borderRadius='lg'   px={4} h={"60px"}>
        <HomeTwoTone style={{ marginTop: '15px', fontSize: '30px' }}/>
        <Text fontSize={"2xl"} fontFamily={'cursive'} marginLeft="10px" marginTop={'15px'} >Home Space</Text>
        <Tabs marginTop={'12px'} marginLeft={"800px"} >
        <TabList >
        <Tab >My Requests</Tab>
        <Tab >Register As a Service Provider</Tab>
        <Tab >Login</Tab>
      </TabList>
    </Tabs>
    </Box>
    )





}