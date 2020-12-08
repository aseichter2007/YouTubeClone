// const mongoose = require('mongoose');
// const Joi = require('joi');
// const {videoSchema} = require('./product');
// const { object, string } = require('joi');

// const cardSchema = new mongoose.Schema({
//     parent : {type: String, required: false, default: '', trim: true },
//     title :{ type: String, required: true, default: '', trim: true  },
//     type: {type: String, required : false, default: '', trim: true },
//     description: {type: String, required: false, default: '', trim: true },
//     described: [{type: Array, required: false}],
//     children:[{ type:monogoose.Schema.Types.ObjectId, ref : 'Card' ,required: false}],
//     recipe:{type: String, required: false, default: '', trim: true },
//     markup:{type: String, required: false, default: '', trim: true },
//     dateModified: { type: Date, default : Date.now },
//     cardReady: {type: Boolean, default: false},
//     user:{type: String,  required: false, default:"SecretAgentInstructorMan", trim:true},
//     history:[{type:monogoose.Schema.Types.ObjectId, ref : 'Card' ,required: false}],

// });
// const Card = mongoose.model('Card', cardSchema);

// function validataCard(card) {
//     const schema = JOI.object({
//         parent: Joi.string(),
//         title: Joi.string().required(),
//         type: Joi.string(),
//         description: Joi.string(),
//         recipe: Joi.string(),
//         markup: Joi.string(),
//         cardReady: Joi.string(),
//         user: Joi.string()
//     });
//     return schema.validate(card);
// }
// exports.Card = Card;
// exports.validate = validataCard;
// exports.cardSchema = cardSchema;