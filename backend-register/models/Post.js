import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema({
    owner: {
        type: Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: String,
    created: {
        type: Date,
        default: Date.now()
    },
});

const PostModel = model("Post", PostSchema);

export default PostModel;