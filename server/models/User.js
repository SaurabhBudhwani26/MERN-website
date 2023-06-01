import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
        firstName:{
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        lastName:{
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        email:{
            type: String,
            required: true,
            max: 50,
            unique: true
        },

        password:{
            type: String,
            required: true,
            min: 8,
        },

        picturePath:{
            type: String,
            required: true,
            default: "",
            
        },

        friends: {
            type: Array,
            default: []
        },

        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,


},

{timestamps: true}//this will give you time and date of when it was created.

);

const User = mongoose.model("User", UserSchema);//this will create the model based on abhove schema.

export default User;