/*
 * STSWENG -XX22
 * Test-Driven Development (TDD) with Jest
 * Members: Rojo, Kate Lynn
 *          Romblon, Kathleen Mae 
 */

const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);
// mongoose.exports = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

// TODO: create updatePost implementation
exports.updatePost = (obj, next) => {
    const query = { _id: obj._id };
    const update = { title: obj.title, content: obj.content };

    Post.findOneAndUpdate(query, update, {new: true}, (err, post) => {
        next(err, post);
    })
}

//TODO: create findPost implementation
exports.findPost = (obj, next) => {
    const found = { _id: obj.id };

    Post.findOne(found, obj, (err, post) => {
        next(err, post);
    })
}
