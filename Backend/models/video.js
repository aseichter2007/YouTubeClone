const mongoose = require(`mongoose`);
const Joi = require('joi');
const {cardSchema} = require("./card")

const videoSchema = new mongoose.Schema({
    videoUrl : { type: String, required: true, minlength: 2, maxlength: 255 },
    description : { type: String, required: true },
    dateModified: { type: Date, default: Date.now },
    comments: {type: [cardSchema], required:false}
})
const Video = mongoose.model('Video', videoSchema);

function validateVideo(video) {
    const schema = Joi.object({
        videoUrl: Joi.string().min(2).max(255).required(),
        description: Joi.string().required(),
        commentId: Joi.string()                           
    });
    return schema.validate(video);
}
exports.Video = Video;
exports.validate = validateVideo;
exports.videoSchema = videoSchema;
