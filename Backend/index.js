const connectDB = require(`./startup/db`);
const videos = require('./routes/videos');
const comments = require('./routes/comments')
const express = require('express');//link document
const app = express();//get exported funtion of document
const cors = require('cors');
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/videos', videos);
app.use('/api/comments', comments);
const port = process.env.PORT||5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
