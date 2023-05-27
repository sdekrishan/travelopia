import { Box, Flex, Text } from '@chakra-ui/layout';
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Loader from '../Components/Loader';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Button } from '@chakra-ui/button';
import {AiOutlineReload} from "react-icons/ai"

const Dashboard = () => {
    const [currentPage ,setCurrentPage] = useState(1)
    const [bookings, setBookings] = useState([]);
    const [loading ,setLoading] = useState(false);
    const [totalBooking, setTotalBookings] = useState(0)
    
    useEffect(()=>{
        setLoading(true)
        axios.get(`http://localhost:8080?page=1`)
        .then(res => {
            console.log(res);
            setBookings(res.data.allBookings)
            setTotalBookings(res.data.total)
        })
        .catch(err => console.log(err));
        setLoading(false)
    },[]);

    
    
    const getPagePosts = (p) => {
        setCurrentPage(p)
        setLoading(true)
        axios.get(`http://localhost:8080?page=${p}`)
        .then(res => {
            setLoading(false)
            setBookings(res.data.allBookings)
        })
        .catch(err => setLoading(false));
        
    }
    const downloadCSV =()=> {
        
            fetch(`http://localhost:8080?page=${currentPage}`) // Replace with your API endpoint
              .then(response => response.text())
              .then(csvData => {
                const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'data.csv';
                link.click();
              })
              .catch(error => {
                console.error('Error:', error);
              });
        
      }
      const getDate = (time) => {
        let d = new Date(time);
        return d.toLocaleDateString()
      }
      const getTime = (time) => {
        let d = new Date(time);
        return d.toLocaleTimeString()
      }
      
  return (
    <>
    <Flex>        
        <Button colorScheme='whatsapp' onClick={()=>getPagePosts(currentPage)} rightIcon={<AiOutlineReload/>}>Reload</Button>
    </Flex>
        {/* {bookings.length > 0 && !loading ?
        <> */}
         <Table>
            <Thead>
                <Tr>
                <Th>Booking Id</Th>
                <Th>Booking Date</Th>
                <Th>Booking Time</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Destination</Th>
                <Th>Total Travellers</Th>
                <Th>Budget $</Th>
                </Tr>
            </Thead>
            <Tbody>
            {bookings.length > 0 && !loading ?bookings.map((booking)=>(
            <Tr key={booking._id} border='1px solid black'>
                <Td>{booking._id}</Td>
                <Td>{getDate(booking.createdAt)}</Td>
                <Td>{getTime(booking.createdAt)}</Td>
                <Td>{booking.name}</Td>
                <Td>{booking.email}</Td>
                <Td>{booking.destination}</Td>
                <Td>{booking.totalTravellers}</Td>
                <Td>{booking.budget}</Td>
            </Tr>
        )) : <Tr>
            <Td colSpan={'8'}><Loader/></Td>
        </Tr> }
        </Tbody>
        </Table>
        <Flex  marginInline={'auto'} border='1px solid lightgrey' justifyContent={'space-between'}>
            <Flex alignItems={'center'}>
            <Button isDisabled={currentPage === 1} onClick={()=>getPagePosts(currentPage-1)}>Prev</Button>
            <Text>{currentPage}/{Math.ceil(totalBooking.length/5)}</Text>
            <Button onClick={()=>getPagePosts(currentPage+1)} isDisabled={currentPage === Math.ceil(totalBooking.length/5)}>Next</Button>
            </Flex>
            <Button onClick={downloadCSV}>Download CSV</Button>
        </Flex>
        {/* </> 
        :
         <Loader/>} */}
        
    </>
  )
}

export default Dashboard