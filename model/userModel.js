import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Please Provide an Email"],
        unique: [true, "Email Exist"]
    },

    password: {
        type: String,
        required: [true, "Please provide a Password"],
        unique: false
    }
});

const User = mongoose.model("User", userSchema);

export default User;