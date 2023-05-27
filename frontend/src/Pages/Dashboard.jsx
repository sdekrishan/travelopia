import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
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
        axios.get(`https://travelopia-3psd.onrender.com?page=1`)
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
        axios.get(`https://travelopia-3psd.onrender.com?page=${p}`)
        .then(res => {
            setLoading(false)
            setBookings(res.data.allBookings)
        })
        .catch(err => setLoading(false));
        
    }
    const downloadCSV =()=> {
        
            fetch(`https://travelopia-3psd.onrender.com?page=${currentPage}`) // Replace with your API endpoint
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
      <Text fontFamily={'Dancing Script'} fontSize={'6xl'} fontWeight={'bold'}>Travelopia</Text>
    <Flex>        
        <Button colorScheme='whatsapp' onClick={()=>getPagePosts(currentPage)} rightIcon={<AiOutlineReload/>}>Reload</Button>
    </Flex>
       
         <Table>
            <Thead>
                <Tr bgColor={'#BB86FC'} >
                <Th color='black' fontSize={'sm'} border='1px solid black'>Booking Id</Th>
                <Th color='black' fontSize={'sm'} border='1px solid black'>Booking Date</Th>
                <Th color='black' fontSize={'sm'} border='1px solid black'>Booking Time</Th>
                <Th color='black' fontSize={'sm'} border='1px solid black'>Name</Th>
                <Th color='black' fontSize={'sm'} border='1px solid black'>Email</Th>
                <Th color='black' fontSize={'sm'} border='1px solid black'>Destination</Th>
                <Th color='black' fontSize={'sm'} border='1px solid black'>Total Travellers</Th>
                <Th color='black' fontSize={'sm'} border='1px solid black'>Budget $</Th>
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
        <Flex alignItems={'center'} marginInline={'auto'} border='1px solid lightgrey' justifyContent={'space-between'} padding='.5rem 1rem'>
            <Button  colorScheme='orange'  onClick={downloadCSV}>Download CSV</Button>
            <Flex alignItems={'center'} gap='1rem'>
            <Button size={'sm'} colorScheme='orange' isDisabled={currentPage === 1} onClick={()=>getPagePosts(currentPage-1)}>Prev</Button>
            <Text>{currentPage}/{Math.ceil(totalBooking.length/5)}</Text>
            <Button size={'sm'} colorScheme='orange'  onClick={()=>getPagePosts(currentPage+1)} isDisabled={currentPage === Math.ceil(totalBooking.length/5)}>Next</Button>
            </Flex>
            <Box>Total Budget - {bookings.reduce((acc,el)=>el.budget+acc,0)}</Box>
        </Flex>
      
        
    </>
  )
}

export default Dashboard