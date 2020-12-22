const mongoose = require(`mongoose`);
const Joi = require('joi');

const subCommentSchema = new mongoose.Schema({
    parent : { type: String, required: true },
    text : { type: String, required: false },
    dateModified: { type: Date, default: Date.now },
})
const SubComment = mongoose.model('SubComment', subCommentSchema);

function validateSubComment(video) {
    const schema = Joi.object({
        parent: Joi.string().required(),
        text: Joi.string(),                          
    });
    return schema.validate(video);
}
exports.SubComment = SubComment;
exports.validate = validateSubComment;
exports.subCommentSchema = subCommentSchema;
