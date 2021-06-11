// require('./db/mongoose');
// const Task = require('./models/task');
// const User = require('./models/user');


// Task.findByIdAndRemove("60bed9a72591ec29e4ae7c91").then(() => {
//     console.log("removed successfully");
//     return Task.countDocuments({completed: false})
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

// const deleteAndCount = async(id,complete) => {

//     await Task.findByIdAndDelete(id);
//     const count = await Task.countDocuments(complete);
//     return count
// }

// deleteAndCount("60bedb9f1637222c3cc6313a",{completed:false}).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// ************************ use bcryptjs for password hashing
// const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("cabhishek", salt);
// console.log(hash);
// console.log(bcrypt.compareSync("cabhishek",hash))
// console.log(bcrypt.compareSync("abhishek",hash))