const express = require('express');
const Task = require("../models/task");
const router = new express.Router();
const auth = require('../middlewares/auth');


router.post('/tasks',auth, async(req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    
    try{
        await task.save()
        res.status(201).send(task);
    }catch(e){
        res.status(400).sen(e);
    }
    
})

// tasks?completed=true
// tasks?limit=5
// tasks?sortBy=createdAt:desc

router.get('/tasks',auth,async(req,res) => { 

    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try{

         await req.user.populate({
             path: 'tasks',
             match,
             options:{
                 limit: parseInt(req.query.limit),
                 skip: parseInt(req.query.skip),
                 sort
             }

         }).execPopulate();
        res.status(201).send(req.user.tasks);
    }catch(e){
        res.status(500).send("could not connected");
    }
    
})

router.get('/tasks/:id',auth, async(req, res) => {
   
    try{
        const task = await Task.findOne({
            _id : req.params.id,
            owner: req.user._id
        })
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

router.patch('/tasks/:id',auth,async(req,res) => {

    const updates = Object.keys(req.body);
    const validUpdate = ['description','completed'];
    const isValidUpdate = updates.every((update) => {
        return validUpdate.includes(update);
    })
    if(!isValidUpdate){
        return res.status(400).send({error:"invalid updates!"})
    }

  try{
      const task = await Task.findOne({
          _id : req.params.id,
          owner: req.user._id
      });
      
      updates.forEach((update) => {
          task[update] = req.body[update];
      })

      await task.save();
   // const task = await Task.findByIdAndUpdate(_id, req.body,{new: true,runValidators: true})

    if(!task){
        res.status(400).send();
    }
    res.status(201).send(task)
  }catch(e){
        res.status(500).send(e)
  }
  
})

router.delete('/tasks/:id',auth, async(req, res) => {
   
    try{

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).send()
        }
        res.send(task);

    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;