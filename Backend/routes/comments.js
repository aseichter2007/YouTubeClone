const {Comment, validate} = require('../models/comment');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {//noone should ever do this in production
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

router.get('/:id', async (req, res) => {
    try {
        var comments = await Comment.find();
        comments = comments.filter(comment => {
            if (comment.parent=req.params.id) {
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

router.post('/:parentId', async (req,res)=>{
    console.log(req.body)
    try {
        const {error} = validate(req.body);

        let parentVideoId = req.params.parentId;
     
           
            //create new card to push
            const comment = new Comment({
                parent: req.body.parent,
                title: req.body.title,
                description: req.body.description,
            })
            let newcomment = await comment.save();
           
         
            var comments = await Comment.find();
            comments = comments.filter(comment => {
                if (comment.parent=req.params.id) {
                    return true;
                } else {
                    return false;
                }
            })
            return res.send(comments);
        
        
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(`interneal server error: ${ex}`);
    }
})
router.put('/like/:id', async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(
        req.params.id, //not sure if this is proper.
        {            
          likes: (req.body.likes +1 )
       },
        {new: true}
    );

    if (!comment){
        return res.status(400).send(`the comment with id "${req.params.id} does not exist`);
    }
    var comments = await Comment.find();
    comments = comments.filter(eachComment => {
        if (comment.parent===eachComment.parent) {
            return true;
        } else {
            return false;
        }
    })
    return res.send(comments);

})

router.put('/:id', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error);
        }
      
        const comment = await Comment.findByIdAndUpdate(
            req.params.id, //not sure if this is proper.
            {            
                parent: req.body.parent,
                title: req.body.title,
                description: req.body.description,
                likes: req.body.likes 
           },
            {new: true}
        );

        if (!comment){
            return res.status(400).send(`the comment with id "${req.params.id} does not exist`);
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