import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email : {type:String, required:true, unique:true},
    password: {type:String, required:true},
    password2: {type:String, required:true},
    nickname:{type:String, required:true},
    campus: {type:String, required:true}
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;