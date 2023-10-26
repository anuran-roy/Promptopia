import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Cannot create prompt without referencing a user id"]
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required."],
    },
    tag: {
        type: String,
        required: [true, "Prompt is required"]
    }
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;