import bcrypt from "bcrypt"; // will help encrypting password
import jwt from "jsonwebtoken"; // this will send user a web token that they can use for authorization
import User from "../models/User.js";

/* REGISTER USER */

export const register = async (req, res) => {
    try {

        var formData = req.body;
        console.log(req);

        const 
            firstName= formData.get("firstName"),
            lastName= formData.get('lastName'),
            email= formData.get('email'),
            password= formData.get('password'),
            picturePath= formData.get('picturePath'),
            friends= formData.get('friends'),
            location= formData.get('location'),
            occupation= formData.get('occupation');



        console.log(occupation);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        console.log("test");
        const newUser = new User({

            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)

        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        console.log("saurabh")
        res.status(201).json(savedUser);// This will let the frontend engineer that the data received was correct
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err.message);
    }



};


/*When we call a mongoose dastabase it is a async call life we do in 
frontend to backend and backend to database. Req is the request body 
that we get from the frontend and res is the response that we give to t
he frontend. */

// LOGGING IN
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        // we are using mongoose to find the specific email

        if (!user) return res.status(400).json({ msg: "User does not exist." })

        const isMatch = await bcrypt.compare(password, user.password);
        //this will compare the password to encrypted password stored in data ase
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;// We dont want to send back the poassword
        res.status(200).json({ token, user })
        // generating and using using the json web token here 
        // this token is then used for aignin and authentication
        /* sign() is a method provided by the JWT library to generate 
        a new JWT. It takes two main arguments: the payload and the 
        secret key.

        The generated JWT is assigned to the token variable for further
        use, such as sending it in the response to the client, storing
        it in a cookie, or including it in the request headers for 
        authentication. */


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* Async functions are particularly useful when dealing with I/O 
operations, interacting with databases, making API calls, 
or performing any task that involves waiting for a response or result. 
They can help avoid callback hell and make your code more readable and 
maintainable. */