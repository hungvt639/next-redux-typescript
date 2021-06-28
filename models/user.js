import mongoose from "mongoose";
var Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: false,
    },
});
mongoose.models = {};
var User = mongoose.model("User", userSchema, "user");
export default User;
