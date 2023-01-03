import React, { useState, useEffect, forwardRef } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { Box } from '@chakra-ui/react'

const { TextArea } = Input

function AddQuotation ({ id, addQuotation, formRef }) {
  console.log('This is ID' + id)

  const [service, setService] = useState([])
  const [serviceDates, setServiceDates] = useState([])
  const [comments, setComments] = useState('')
  const [quote, setQuote] = useState(null)
  const [loaded, setLoaded] = useState()
  const [selectedDate, setSelectedDate] = useState('')
  useEffect(() => {
    fetch(`/services/${id}`)
      .then(r => r.json())
      .then(service => {
        setService(service)
        setServiceDates(service.dates)
        setLoaded(true)
        console.log('This is check B' + service.dates)
      })
  }, [id])

  function onSubmit (e) {
    const newQuote = {
      date: selectedDate,
      quotation: quote,
      comment: comments,
      service_id: id
    }
    fetch('/quotations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    })
      .then(r => r.json())
      .then(newQuote => {
        addQuotation(newQuote)
      })
  }

  return loaded ? (
    <div
      display='flex '
      borderRadius='2px'
      id='addquotation'
      style={{ height: 600, width: 700 }}
      ref={formRef}
    >
      <h1
        style={{
          marginTop: 20,
          marginBottom: 50,
          fontFamily: 'sans-serif',
          fontSize: 30,
          fontWeight: 'bold',
          paddingTop: 60
        }}
        align='center'
      >
        Add Quotation...
      </h1>
      <Form layout='vertical' onFinish={onSubmit}>
        <Form.Item label='Select Service Date'>
          <Select
            onChange={e => {
              setSelectedDate(e)
              console.log('Selected' + e)
            }}
            placeholder='Select Date...'
            required
          >
            {serviceDates.map((date, index) => {
              return (
                <Select.Option value={date} key={index}>
                  {date}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label='Comments:'>
          <TextArea
            value={comments}
            onChange={e => {
              console.log(e)
              setComments(e.target.value)
            }}
            rows={4}
            required
          />
        </Form.Item>
        <Form.Item label='Quoted Price:'>
          <Input
            prefix='$'
            suffix='USD'
            value={quote}
            onChange={e => {
              console.log(e)
              setQuote(e.target.value)
            }}
            required
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Send Quotation
          </Button>
        </Form.Item>
      </Form>
     
    </div>
  ) : (
    <p>loading</p>
  )
}

export default AddQuotation
