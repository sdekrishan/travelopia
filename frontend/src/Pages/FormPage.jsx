import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import axios from "axios";
import {BiUser} from 'react-icons/bi'
import {BsCurrencyDollar, BsEnvelope} from 'react-icons/bs'
import {FaUsers} from 'react-icons/fa'
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import "./styles/FormPage.css";
import { Select } from "@chakra-ui/select";
import Loader from "../Components/Loader";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";

const FormPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    destination: "",
    totalTravellers: 1,
    budget: 500,
  });
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8080/", form)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

 
  return (
    <>
    <Button onClick={()=>navigate("/dashboard")}>Dashboard</Button>
      <form onSubmit={handleFormSubmit}>
       {loading ? <Loader/>: <FormControl>
          <FormLabel>Name</FormLabel>
          <InputGroup>
          <InputLeftElement>
          <BiUser/>
          </InputLeftElement>
          <Input
            name="name"
            type="text"
            isRequired
            placeholder="Enter your name"
            onChange={handleFormChange}
          />
          </InputGroup>

          <FormLabel>Email</FormLabel>
          <InputGroup>
          <InputLeftElement>
          <BsEnvelope/>
          </InputLeftElement>
          <Input
            type="email"
            name="email"
            isRequired
            onChange={handleFormChange}
            />
            </InputGroup>

          <FormLabel>Destination</FormLabel>
          
              <Select
            placeholder="Select Destination"
            onChange={handleFormChange}
            name="destination"
            >
            <option value="India">India</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
          </Select>

          <FormLabel>Number of Travellers</FormLabel>
          <InputGroup>
          <InputLeftElement>
          <FaUsers/>
          </InputLeftElement>
          <Input
            type="number"
            isRequired
            onChange={handleFormChange}
            name="totalTravellers"
            />
            </InputGroup>

          <FormLabel>Budget $</FormLabel>
          <InputGroup>
          <InputLeftElement>
          <BsCurrencyDollar/>
          </InputLeftElement>
          <Input
            name="budget"
            type="number"
            isRequired
            placeholder="Amount will be calculated in dollars"
            onChange={handleFormChange}
            />
            </InputGroup>

          <Input
            type="submit"
            value="submit"
            bgColor="lightGreen"
            mt="1rem"
            w="30%"
          />
        </FormControl>}
      </form>
    </>
  );
};

export default FormPage;
