import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is unique"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is unique"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;