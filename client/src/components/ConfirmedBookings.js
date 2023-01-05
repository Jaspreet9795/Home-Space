import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  Button,
  background,
  color
} from '@chakra-ui/react'
import { HomeTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ProviderHeader from './ProviderHeader'
import Login from './Login'
import LogOut from './LogOut'

import { Table } from 'antd'


function getStatusText(obj) {
    if(obj.service.completion === true) {
        return 'Completed'
    }
    return 'Mark Completed'
}

export default function ConfirmedBookings ({ updateUser, currentUser }) {
  const [quote, setQuote] = useState([])
  const [users, setUsers] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)

  const [loggedIn, setLoggedIn] = useState(currentUser)

  useEffect(() => {
    setLoggedIn(currentUser)
    //   console.log('changing logged in')
  }, [currentUser])

  useEffect(() => {
    fetch('/users')
      .then(r => r.json())
      .then(users => setUsers(users))
  }, [])

  function handleCompletion (id) {
    // e.preventDefault();
    const service_completion = {
      completion: true
    }
    fetch(`services/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(service_completion)
    })
      .then(r => {
        console.log('Confirm Response' + JSON.stringify(r))
      })
      .then(setIsCompleted(!isCompleted))
  }

  useEffect(() => {
    fetch('/show_confirmation')
      .then(r => r.json())
      .then(quote => {
        setQuote(quote)
        console.log('Confirmation' + JSON.stringify(quote))
      })
  }, [isCompleted])

  const columns = [
    {
      title: 'Service Id',
      dataIndex: ['service', 'id'],
      key: 'id'
      // key: 'user_info.name'
    },

    {
      title: 'Client Name',
      dataIndex: ['user_info', 'name']
      //   key: 'id'
    },
    {
      title: 'Client Phone',
      dataIndex: ['user_info', 'phone']
      // key: 'user_info.phone'
    },
    {
      title: ' Client Address',
      dataIndex: ['user_info', 'address']
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
      key: 'action',
      render: obj => (
        <Button
          onClick={() => {
            // console.log(" object is "+JSON.stringify(id))
            handleCompletion(obj.service.id)
            console.log('Completion click')
          }}
          size={'sm'}
        >
          {' '}
          {getStatusText(obj)}
        </Button>
      )
    }
  ]

  return (
    <div
      style={{
        backgroundImage:
          'url(https://ideausher.com/wp-content/uploads/2020/02/5e4129dea00b3.png)',
        width: '1510px',
        height: '860px'
      }}
    >
      {/* <ProviderHeader updateUser={updateUser}  currentUser={currentUser} ></ProviderHeader> */}
      <Box display={'flex'} borderRadius='lg' px={4} h={'60px'}>
        <HomeTwoTone
          style={{ marginLeft: '30px', marginTop: '15px', fontSize: '30px' }}
        />
        <Link to='/service_provider_dashboard'>
          <Text
            fontSize={'2xl'}
            fontFamily={'cursive'}
            marginLeft='20px'
            marginTop={'15px'}
          >
            HomeSpace
          </Text>
        </Link>
        <Tabs marginTop={'12px'} marginLeft={'1100px'}>
          <TabList>
            {!loggedIn ? (
              <Login updateUser={updateUser}></Login>
            ) : (
              <LogOut updateUser={updateUser}></LogOut>
            )}
          </TabList>
        </Tabs>
      </Box>

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
          rowKey='id'
          style={{ width: 1000, height: 600 }}
        //   rowClassName={isCompleted ? 'bg-grey' : 'bg-red'}
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
    </div>
  )
}
