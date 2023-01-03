import React, { useEffect, useState } from 'react'
import { Box, Text, Tab, Tabs, TabList } from '@chakra-ui/react'
import { HomeTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ProviderHeader from './ProviderHeader'

import { Table } from 'antd'
const columns = [
  {
    title: 'Name',
    dataIndex: ['user_info', 'name'],
    // key: 'user_info.name'
  },
  {
    title: 'Phone',
    dataIndex: ['user_info', 'phone'],
    // key: 'user_info.phone'
  },
  {
    title: 'Address',
    dataIndex: ['user_info','address'],
    // key: 'user_info.address'
  },
  {
    title: 'Quoted Price',
    dataIndex: 'quotation',
    key: 'quotation'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'actio',
    render: () =>  <a> Completed </a>
  }
]





export default function ConfirmedBookings ({updateUser, currentUser}) {
const [quote, setQuote]=useState([])
const [user, setUser]=useState([])
const [isCompleted, setIsCompleted]= useState(false)


  
useEffect(()=>{
    fetch ("/show_confirmation")
    .then (r=>r.json())
    .then (quote=>{
        setQuote(quote)
        console.log("Confirmation"+JSON.stringify(quote))
    })

},[])


  return (
    <>
    <ProviderHeader updateUser={updateUser}  currentUser={currentUser} ></ProviderHeader>
     

      <Box
        marginTop={'150px'}
        // marginStart={'150px'}
        marginLeft='200px'
        position={'fixed'}
        height='400px'
        width='1000px'
        display={'flex'}
        borderRadius='2xl'
        borderWidth={'thin'}
      >
        <Table
          style={{ width: 1000, height: 600 }}
          columns={columns}
          expandable={{
            expandedRowRender: record => (
              <p
                style={{
                  margin: 0
                }}
              >
                {record.service.description}
              </p>
            ),
            rowExpandable: record => record.name !== 'Not Expandable'
          }}
          dataSource={quote}
        />
      </Box>
    </>
  )
}
