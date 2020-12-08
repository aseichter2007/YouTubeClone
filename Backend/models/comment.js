const mongoose = require('mongoose');
const Joi = require('joi');
const { object, string, number } = require('joi');

const commentSchema = new mongoose.Schema({
    parent : {type:mongoose.Schema.Types.ObjectId, ref : 'Comment' ,required: false, default: "top"},
    title :{ type: String, required: true, default: '', trim: true  },
    description: {type: String, required: false, default: '', trim: true },
    children: [{ type:mongoose.Schema.Types.ObjectId, ref : 'Comment' , required: false}],
    dateModified: { type: Date, default : Date.now },
    history:{type: [mongoose.Schema.Types.ObjectId], ref : 'Comment' , required: false},
    likes: {type: Number, default: 0}
});
const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = JOI.object({
        title: Joi.string().required(),
        description: Joi.string(),
    });
    return schema.validate(comment);
}
exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;