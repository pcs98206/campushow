import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
    type: {type: String, required: true},
    subject : {type: String, required: true},
    campus : {type: String, required: true},
    professor : {type: String, required: true},
    semester: {type: String, required: true},
    price : {type: Number, required: true},
    createdAt : {type: Date, required: true, default: Date.now()}
});

const File = mongoose.model("File", fileSchema);

export default File;