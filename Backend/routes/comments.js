const {Comment, validate} = require('../models/comment');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var comments = await Comment.find();
        comments = comments.filter(comment => {
            if (comment.parent="top") {
                return true;
            } else {
                return false;
            }
        })
        return res.send(comments);
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`internal server error : ${ex}`)
    }
});

router.get('/:id', async (req,res) => {
    try{
        const comment = await Comment.findById(req.params.id);

        if(!comment){
            return res.status(400).send(`the product with id "${req.params.id}" does not exist.`);
        }

        return res.send(comment);

    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`internal server error: ${ex}`);
    }
});

router.post('/:parentId', async (req,res)=>{
    try {
        const {error} = validate(req.body);

        let parentId = req.params.parentId;
        if (parentId != "new") {
            const parent = await Comment.findById(parentId)
            if (!parent) {
                return res.status(400).send(`the card with id: ${parentId} does not exist`)
            } 
            //create new card to push
            const comment = new Comment({
                parent: parent._id,
                title: req.body.title,
                description: req.body.description,
                children: req.body.children
            })
            let newcomment = await comment.save();
           
            parent.chilrden.push(newcomment);
            await parent.save();
            return res.send(parent.children);
        }
        else{
            
            const mycomment = new Comment({
                title: req.body.title,
                description: req.body.description,
            })
            await mycomment.save();
            return res.send([mycomment]);
        }
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`interneal server error: ${ex}`);
    }
})

router.put('/:id', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error);
        }
        const currentState = await findById(req.params.id);
        if (!currentState) {
            return res.status(400).send(`the comment with id: ${req.params.id} does not exist`);
        }
        if (currentState.parent === req.body.parent) {
            //to change parents I need to remove the original parent and child from it, and link the new. 
            const parent = Comment.findById(currentState.parent)
            const stepParent = Comment.findByIdAndUpdate(
                req.body.parent,  
                {$push: {"history": currentState}},//this is probably right
                {new: true}
            );
            if (!stepParent || !parent) {
                return res.status(400).send(`there was an error changing parents`);
            }

            parent.children = parent.children.filter(child=>{
                if (child._id === currentstate._id) {
                    return false;
                } else {
                    return true;
                }
            });
            parent.save()

            
        }
        const comment = await Comment.findByIdAndUpdate(
            req.params.id, //not sure if this is proper.
            {
                $push: {"history": currentState},//can this be in the same object?
            
                parent: req.body.parent,
                title: req.body.title,
                description: req.body.description,
                children: req.body.children
            },
            {new: true}
        );

        if (!comment){
            return res.status(400).send(`the video with id "${req.params.id} does not exist`);
        }
        await comment.save();
        return res.send(comment);
    } catch (ex){
        console.log(ex);
        return res.status(500).send(`internal server error : ${ex}`)
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const comment = await Comment.findByIdAndRemove(req.params.id);

        if (!comment){
            return res.status(400).send(`the product with id "${req.params.id}" does not exist.`)
        }
        const children = comment.children;
        if (comment.parent !== "top") {
            var parent = Comment.findById(comment.parent)
            var newChildren = [];
            if (!parent) {
                for (let index = 0; index < children.length; index++) {
                    const child = children[index];
                    const childFromDb = await Comment.findByIdAndUpdate(child._id, {parent: parent_id}, {new: true});
                    newChildren.push(childFromDb);
                }
            }
            for (let index = 0; index < newChildren.length; index++) {
                const newChild = newChildren[index];
                
                parent.children.push(newChild);
            }
            await parent.save();
            return res.send(parent);
            
        } else {
            
        }

        return res.send(comment);
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`internal server error : ${ex}`);
    }
})
module.exports = router;