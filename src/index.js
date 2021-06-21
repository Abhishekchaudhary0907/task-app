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

const Task = require('./models/task');
const User = require('./models/user');


const main = async() => {
    // const task = await Task.findById('60d0146c69ffd4374c9a36c9');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    // const user = await User.findById('60d00be1cbcecb2af8c5695c');
    // await user.populate('tasks').execPopulate();
    // console.log(user.tasks);
}

main();