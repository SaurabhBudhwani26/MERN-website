import Post from "../models/Post.js";
import User from "../models/User.js";


/* CREATE */

export const createPost = async(req, res) => {

        // this will pass the post throug the middleware
    try{

        const { userId, description, picturePath } = req.body;
        /* req.params is used to access route parameters in the URL, 
        while req.body is used to access the parsed request body 
        data. They serve different purposes depending on the type 
        of data being accessed in the request. */

        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath, 
            picturePath,
            likes: {},
            comments: []


        });

        await newPost.save();

        const posts = await Post.find()
        // this is returning all the posts to the frontend
        res.status(201).json({ posts })
        /* we always have to consider what to return and how the frontend 
        is going to be affected by that return */
    } catch (err) {
        res.status(409).json({ message: err.message })
    }


}

/* READ */
export const getFeedPosts = async(req, res) => {

    try {

        const post = await Post.find()
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {

    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);

    } catch (err){
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const likePost = async(req, res) => {
    try{

        const { id } = req.params;
        const { userID } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        // if this is empty that means the user hasen't liked it

        if (isLiked) {
            post.likes.delete(userID);
        } else {
            Post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }//we want a new object
        );

        res.status(200).json(updatedPost);
    
    // we always have to update the frontend once you hit the like button

    } catch (err){
        res.status(404).json({ message: err.message })
    }
}

//This completes our backend