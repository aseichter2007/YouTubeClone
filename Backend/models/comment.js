const mongoose = require('mongoose');
const Joi = require('joi');
const { object, string, number } = require('joi');

const commentSchema = new mongoose.Schema({
    parent : {type: String ,required: true},
    title :{ type: String, required: false, default: '', trim: true  },
    description: {type: String, required: false, default: '', trim: true },
    dateModified: { type: Date, default : Date.now },
    likes: {type: Number, default: 0, required: false}
});
const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = Joi.object({
        parent: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
    });
    return schema.validate(comment);
}
exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;