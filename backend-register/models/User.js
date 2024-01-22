import { Schema, Types, model } from "mongoose"

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    posts: [{
        type: Types.ObjectId,
        ref: "Post"
    }],
    created: {
        type: Date,
        default: Date.now()
    }
})
export default model("User", UserSchema)