const express = require("express");

const router = express.Router();

// validation
const {check, validationResult} = require("express-validator");

// import model
const User = require("../models/Users");

router.post("/", 
    [
        check("name", "Name is required").notEmpty(),
        check("email", "Valid email is required").isEmail(),
        check(("age", "Age is required").notEmpty()),
    ],
    async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
    // check if the user exists
    const { email } = req.body;
    const userExists = await User.find({ email });
    if(userExists.length > 0)
        return res.status(400).json({error: "User already exists"});
    

    try{
        // create a new user
        const user = new User(req.body);
        await user.save();
        return res.status(201).json(user);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

router.get("/", async(req, res) => {
    try{
        const users = await User.find();
        return res.json(users);
    }catch(err){
        console.log(err);
        return res.json(`{error: err.message}`);
    }
})

router.get("/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(user);
    }catch(err)
    {
        return res.status(500).json({error: err.message});
    }
})

router.put("/:id", [
    check("name", "Name is required").notEmpty(),
],async(req, res) => {
    const { name, age, email } = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, 
            { name, age, email }, 
            {new: true}
        );
        if(!updateUser){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json({message: "User updated.", user: updateUser});
    }catch(err)
    {
        return res.status(500).json({error: err.message});
    }
})

router.delete("/:id", async(req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json({ message: "User deleted successfully", user: deleteUser });
    }catch(err){
        return res.status(500).json({error: err.message});
    }
})

module.exports = router;