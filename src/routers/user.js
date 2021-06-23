const express = require('express');
const User = require("../models/user");
const router = new express.Router()
const auth = require('../middlewares/auth');

// multer library is use for uploading image and other non textual document in express application
const multer = require('multer');
const upload = multer({
    dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("please upload jpg or jpeg or png file"))
        }
        cb(undefined, true);
    }
})

router.post('/users',async(req,res) =>{

    const user = new User(req.body);
    
    try{
       const result = await user.save();
       const token = await user.generateAuthToken();
       res.send({result, token})
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/users/login', async(req, res) => {

    try{
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});

    }catch(e){
        res.status(400).send();
    }
    
})

router.post('/users/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(500).send();
    }

})

router.post('/users/logoutAll',auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
})

router.get('/users/me',auth,async(req,res) => {

    res.status(200).send(req.user);
     
})

router.patch('/users/me',auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowUpdates = ['name','email','password','age'];
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({error: "invalid updates"})
    }

    try{
        const user = req.user;
        updates.forEach((update) => {
            user[update] = req.body[update];
        })
        await user.save();
    }catch(e){
        res.status(500).send();
    }
   
})

router.delete('/users/me',auth, async(req, res) => {

    try{
        await req.user.remove();

        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
    
});

function errorMiddleware(next){
    throw new Error(" this is the error handler function");
}
router.post('/users/me/avatar',errorMiddleware,async(req, res) => {
    try{
        res.send()
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router;