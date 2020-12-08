const {Video, validate} = require('../models/video');
const express = require('express');
const router = express.Router();

//endpoints
router.post('/videos/', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send(error);
        }

       
        const video = new Video({
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            comment: {type: [commentSchema], default: []}
        });
        await video.save();

        return res.send(video);
    }
    catch(ex){
        console.log(ex);
        return res.status(500).send(`internal server errorL ${ex}`);
    }
});

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        return res.send(videos);
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`internal server error : ${ex}`)
    }
});

router.get('/:id', async (req,res) => {
    try{
        const video = await Video.findById(req.params.id);

        if(!video){
            return res.status(400).send(`the product with id "${req.params.id}" does not exist.`);
        }

        return res.send(video);

    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`internal server error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error);
        }

        const video = await Video.findByIdAndUpdate(
            req.params.id, 
            {
                videoUrl : req.body.videoUrl,
                description: req.body.description,
                commentId: req.body.commentId
            },
            {new: true}
        );

        if (!video){
            return res.status(400).send(`the video with id "${req.params.id} does not exist`);
        }
        await video.save();
        return res.send(video);
    } catch (ex){
        console.log(ex);
        return res.status(500).send(`internal server error : ${ex}`)
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const video = await Video.findByIdAndRemove(req.params.id);

        if (!video){
            return res.status(400).send(`the product with id "${req.params.id}" does not exist.`)
        }

        return res.send(video);
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`internal server error : ${ex}`);
    }
})
module.exports = router;