const mongoose = require('mongoose');
const config = require('config');

function connectDB(){
    mongoose.connect(config.get("mongoURI"), {useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=> console.log("connected to mongo"))
        .catch((err)=> {
            console.log(`could not connect to mongo. error: ${err}`);
            process.exit(1);
        }
    )
}

module.exports = connectDB;