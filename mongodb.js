const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const url = "mongodb://127.0.0.1:27017";
const databseName = "task-app-api";

MongoClient.connect(url,{useUnifiedTopology:true},(error,client) => {
    if(error){
        return console.log("coudnt connected");
    }

    const db = client.db(databseName);

   

    db.collection("users").deleteOne({_id: new ObjectID("60b6172e717e492928e37a5e")})
    .then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log("can not be deleted")
    });

    db.collection("tasks").deleteMany({description:"take bath"})
    .then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log("doesnt work")
    })

    db.collection("users").findOneAndReplace({name:"abhi"},{name:"abhishek"})
    .then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log("error occurd")
    });

})