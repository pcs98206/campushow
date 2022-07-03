import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text : {type:String, required:true},
    file : {type: mongoose.Schema.Types.ObjectId, ref:"File"},
    createdAt : {type: Date, required: true, default: Date.now()},
    owner : {type: mongoose.Schema.Types.ObjectId, ref:"User"}
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;