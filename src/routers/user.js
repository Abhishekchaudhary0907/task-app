const express = require('express');
const { findById } = require('../models/user');
const User = require("../models/user");
const router = new express.Router()

router.post('/users',async(req,res) =>{

    const user = new User(req.body);
    try{
       const result = await user.save();
       const token = await user.generateAuthToken();
       res.status(201).send(result)
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/users/login', async(req, res) => {

    try{
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user});

    }catch(e){
        res.status(400).send();
    }
    
})

router.get('/users',async(req,res) => {

    try{
        const users = await User.find({});
        res.status(201).send(users);
    }catch(e){
        res.status(500).send(e);
    }
     
})

router.get('/users/:id', async(req,res) => {
    const id = req.params;
    try{
        const user = await User.findById({_id: id.id});
        if(!user){
            return res.status(400).send();
        }

        res.status(201).send(user);
    }catch(e){
        res.status(500).send();
    }
    
})

router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowUpdates = ['name','email','password','age'];
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({error: "invalid updates"})
    }

    const _id = req.params.id;
    try{
        const user = await User.findById(_id);

        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        await user.save();
        // const user = await User.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true})
        if(!user){
           return res.status(400).send()
        }

        res.status(401).send(user);
    }catch(e){
        res.status(500).send();
    }
   
})

router.delete('/users/:id',async(req, res) => {

    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send();
        }

        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
    
});



module.exports = router;