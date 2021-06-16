const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
    
    try{
        const token = req.header('Authorization').replace("Bearer ","");
        const decoded = await jwt.verify(token,"thisismytoken");
        const user = await User.findOne({_id: decoded._id, "tokens.token": token});

        if(!user){
            throw new Error();
        }
        req.user = user;
        next();
    }catch(e){
        res.status(401).send({"error":"please do authentication"})
    }
}

module.exports = auth;