import mongoose from "mongoose";


const postSchema = mongoose.Schema(

    {
        userId: {
            type: String,
            required: true,


        },

        firstName: {
            type: String,
            required: true,


        },

        lastName: {
            type: String,
            required: true,


        },

        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,//this would be the profile picture

        likes: {
            type: Map,
            of: Boolean
            /* The of: Boolean specifies that the values stored in the 
            Map should be of the Boolean data type 
            
            If someone likes the picture the value will come in the 
            map and boolean will always be true. We just have to 
            check if userid exists here*/
        },


        comments: {
            type: Array,
            default: []
        },
    },

    { timestamp: true}

);

const Post = mongoose.model("Post", postSchema);

export default Post;