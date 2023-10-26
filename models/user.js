import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists."],
        required: [true, "Email is required."]
    },
    username: {
        type: String,
        unique: [true, "Username must be unique."],
        require: [true, "Username is required."],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username must be 8-20 alphanumeric characters long."]
    },
    image: {
        type: String
    }
});
// Due to the serverless nature of NextJS, the models User will be created everytime the DB connection is established.
// So we first establish a check if the model exists inside the models already registered in the DB, else create the model

const User = models.User || model("User", userSchema);

export default User;