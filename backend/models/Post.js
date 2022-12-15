const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        cover: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default : 0
        },
        tags: {
            type: [String],
            required: false
        },
        status: {
            type: String,
            enum: ['Approved', 'Senied', 'Review'],
            default: 'Review'
        }
    },
    {
        timestamps: true
    }
)

postSchema.plugin(AutoIncrement, {
    inc_field: 'post',
    id: 'postNums',
    start_seq: 0
})

module.exports = mongoose.model('Post', postSchema)