
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select,  Upload,message} from 'antd';
import { Box } from "@chakra-ui/react";
import DatePicker from "react-multi-date-picker";
import  Header  from './UserHeader';
import { Link } from "react-router-dom";

const { TextArea } = Input;


export default function BookingRequest ({addRequest}){

  const [date, setDate] = useState([])

  const [category, setCategory]= useState("")
  const [description, setDescription] = useState("")
  const [images, setImages]= useState([])

   
   function onSubmit(e){
    console.log(date.map(date=>{
        return date.toString()
    }))
    // e.preventDefault();
    const newRequest= {
        service_type: category, 
        description: description, 
        images: images, 
        dates : date.map(date=>{
            return date.toString()
        }), 
    }
    fetch("/services", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(newRequest)
    })
    .then(r=>r.json())
    .then(request=> {
      addRequest(request);
      message.success('Submit success!');
    });
    
   }


  return (
  
    <div style={{backgroundImage: "url(https://cdn5.vectorstock.com/i/1000x1000/29/69/home-and-house-repair-service-professional-plumber-vector-18032969.jpg)", height:"auto" ,display:"flex"}}>
     
    <Box  height={"700"} width="750" marginLeft={"400px"} marginTop="80px" backgroundColor={"white"} marginBottom="90px" borderRadius={"2xl"} >
    <div  style={{height:600, width: 600, marginLeft:20, marginTop:20, marginRight:20, backgroundColor:"white"}} display="flex " borderRadius="2px"  >
    <h1 style={{marginBottom:50, fontFamily:'sans-serif' ,fontSize:30, fontWeight:'bold'}} align="center">Home Service Request Details...</h1>
    
    
    <Form layout="vertical" onFinish={onSubmit} >
        
      <Form.Item label="Select Category" >
          <Select onChange= {e=>setCategory(e)} placeholder='Select Category..' required>
            <Select.Option value="landscaping">Landscaping</Select.Option>
            <Select.Option value="electrician">Electrician</Select.Option>
            <Select.Option value="plumber">Plumber</Select.Option>
            <Select.Option value="home_cleaning">Home Cleaning</Select.Option>
            <Select.Option value="home_painting">Home Painting</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item label="Upload related Images " valuePropName="fileList">
          <Upload    onChange={e=>setImages(e.target.value)}   listType="picture-card" required>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
       
        <Form.Item label="Request Description:"  >
          <TextArea value={description} onChange={e=>{
            console.log(e);
            setDescription(e.target.value)}} rows={4} required />
        </Form.Item>

     
        <Form.Item label="Select upto 3 suitable dates">
         <DatePicker 
          multiple
          value={date} 
          onChange={setDate}
          minDate={new Date()}
         required />
         </Form.Item>
       
        <Form.Item  wrapperCol={{
          offset: 9,
          // span: 16,
        }} >
          <Button type="primary" htmlType="submit" >Submit</Button>
         <Link to="/">
          <Button  style={{
              margin: '0 12px',
            }}    type="primary" htmlType="submit" >  Back </Button>
            </Link>
        
          
        </Form.Item>
      </Form>
      </div>
      </Box>
      </div>
  );
};








