const {SubComment, validate} = require('../models/Subcomment');
const {Comment} = require('../models/comment');
const express = require('express');
const router = express.Router();

//endpoints
router.post('/', async (req, res) => {
    console.log(req.body);
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send(error);
        }

       
        const subcomment = new SubComment({
            parent: req.body.parent,
            text: req.body.text,
        });
        await subcomment.save();

        return res.send(subcomment);
    }
    catch(ex){
        console.log(ex);
        return res.status(500).send(`internal server errorL ${ex}`);
    }
});


router.get('/:id', async (req,res) => {
    try{
        const subcomments = await SubComment.find();
        console.log( req.params.id);
        var subComments = await SubComment.find();
       var comments = subComments.filter(comment => {
           //console.log(comment.parent);
            if (comment.parent===req.params.id) {
                return true;
            } else {
                return false;
            }
        })
        console.log(subComments);
        return res.send(subComments);

    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`internal server error: ${ex}`);
    }
});

module.exports = router;