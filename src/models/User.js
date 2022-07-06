import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email : {type:String, required:true, unique:true},
    password: {type:String, required:true},
    password2: {type:String},
    nickname:{type:String, required:true},
    campus: {type:String, required:true},
    socialOnly : {type:Boolean, default:false},
    avatarUrl : {type:String, default:""},
    files : [{type: mongoose.Schema.Types.ObjectId, ref:"File"}],
    comments : [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}]
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;