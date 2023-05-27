import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import axios from "axios";
import { BiUser } from "react-icons/bi";
import { BsCurrencyDollar, BsEnvelope } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import "./styles/FormPage.css";
import { Select } from "@chakra-ui/select";
import Loader from "../Components/Loader";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";
import { Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

const FormPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    destination: "",
    totalTravellers: 1,
    budget: 500,
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("https://travelopia-3psd.onrender.com/booking", form)
      .then((res) => {
        setLoading(false);
        return toast({
          title: "Booking Successfull.",
          description: "Go to Dashboard to see all Bookings.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      })
      .catch((err) => {
        setLoading(false);
        return toast({
          title: "An Error Occured.",
          description:
            "Something went wrong. Please try again after some time !",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Text fontFamily={"Dancing Script"} fontSize={"6xl"} fontWeight={"bold"}>
        Travelopia
      </Text>
      <Button
        data-testid="dashboard"
        colorScheme="twitter"
        onClick={() => navigate("/dashboard")}
        position="absolute"
        top="10"
        right="10"
      >
        Dashboard
      </Button>
      <Box
        color="white"
        fontFamily={"Dancing Script"}
        marginInline={"auto"}
        padding={".5rem .7rem"}
        borderRadius={".3rem"}
        bgColor={"red"}
        w="fit-content"
        fontSize={"2xl"}
      >
        Submit Form to Book your excited Journey !
      </Box>
      <form onSubmit={handleFormSubmit}>
        {loading ? (
          <Loader />
        ) : (
          <FormControl>
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <BiUser />
              </InputLeftElement>
              <Input
                name="name"
                type="text"
                data-testid="name"
                isRequired
                placeholder="Enter your name"
                onChange={handleFormChange}
              />
            </InputGroup>

            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <BsEnvelope />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                isRequired
                placeholder="Enter your Email"
                data-testid="email"
                onChange={handleFormChange}
              />
            </InputGroup>

            <FormLabel>Destination</FormLabel>

            <Select
              placeholder="Select Destination"
              data-testid="destination"
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
                <FaUsers />
              </InputLeftElement>
              <Input
                type="number"
                data-testid="totalTravellers"
                isRequired
                placeholder="Total Travellers"
                onChange={handleFormChange}
                name="totalTravellers"
              />
            </InputGroup>
            <FormLabel>Budget $</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <BsCurrencyDollar />
              </InputLeftElement>
              <Input
                name="budget"
                type="number"
                data-testid="budget"
                isRequired
                placeholder="Budget Per Person (in dollars $)"
                onChange={handleFormChange}
              />
            </InputGroup>
            <FormHelperText
              color="white"
              border="1px solid white"
              w="fit-content"
              padding={".3rem"}
              borderRadius={"5px"}
            >
              Net Budget {form.budget * form.totalTravellers}
            </FormHelperText>

            <Input
              type="submit"
              value="Submit"
              bgColor="#26cc00"
              color="white"
              mt="1rem"
              w="30%"
            />
          </FormControl>
        )}
      </form>
    </>
  );
};

export default FormPage;
