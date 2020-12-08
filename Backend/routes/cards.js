const {card, validate} = require('../models/card');
const express = require('express');
const {startSession} = require('mongoose');
const router = express.router();

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error){
            return res.status(400).send(error);
        }
        const card = newCard();
        
    } catch (error) {
        
    }
})
function newCard(res) {
    const output;
    if (!res.type) {
        output = cardProcessor(res, type)
    } else  {
        
    }
    
  

    
}
function cardProcessor(req, type) {
    let output;
    switch (type) {
        case "comment":
            output= commentProcessor(req)
            break;
        default:
            return;
    }
    let cardformat ={ parent : req.body.parent,
        title : req.body.title,
        type: req.body.type,
        description: req.body.description,
        described: req.body.described,
        children: req.body.children,
        recipe: req.body.recipe,
        markup: req.body.markup,
        cardReady: req.body.cardReady,
        user: req.body.user,
        history: req.body.history
    }

}
function commentProcessor(){

}