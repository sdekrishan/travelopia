const { FormModel } = require("../model/formModel");

const formRouter = require("express").Router();

formRouter.post("/",async(req, res) => {
    const {name, email, destination, budget, totalTravellers} = req.body;

    try {
        let regexpression = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$";
        let response = email.match(regexpression);
        
        if(response){
            let newUser = new FormModel({name,email,budget,destination,totalTravellers});
            await newUser.save();
            return res.status(200).send("booking successfull")
        }else{
            return res.status(404).send("Please Enter a valid email.")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})

formRouter.get("/",async(req, res) => {
    try {
        const allBookings = await FormModel.find();
        res.status(201).send(allBookings)
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

module.exports = {formRouter}