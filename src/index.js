const express = require("express");
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

require("./db/mongoose");  // run mongodb server

const portNumber = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // for parsing the application json

// middleware method which apply all the router because it is not mounted
// app.use(function(req, res, next){
//     console.log(req.method);
//     next();
// }, function(req, res, next){
//     console.log(req.originalUrl);
//     next();
// });

// app.use(function(req,res, next){
//     res.status(503).send("site under mentainence");
// })

app.use(userRouter);
app.use(taskRouter);

app.listen(portNumber,() => {
    console.log(`server is runnig on port ${portNumber}`)
})