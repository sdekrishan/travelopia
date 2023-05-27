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
    const page = req.query.page || 1;
    const limit = 5;
    try {
        const total = await FormModel.find()
        const allBookings = await FormModel.find().skip((page-1)*limit).limit(limit);
        res.status(201).send({allBookings,total:total})
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

module.exports = {formRouter}