const connectDB = require(`./startup/db`);
const videos = require('./routes/videos');
const express = require('express');//link document
const app = express();//get exported funtion of document

connectDB();

app.use(express.json());
app.use('/api/videos', videos);
const port = process.env.PORT||5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
