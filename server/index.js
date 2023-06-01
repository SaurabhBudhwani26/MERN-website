import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";;
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; /* will allow to properly set the paths when we configure directories */
import authRoutes from "./routes/auth.js" // routes folder will have the path and the routes for every kind of fetures
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js"
import { register } from './controllers/auth.js'
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js"

/* CONFIGURATIONS */
const __filenames = fileURLToPath(import.meta.url); /* This configuration is specifically for the type module so we can grab the file url for the dir names */

const __dirname = path.dirname(__filenames);
dotenv.config(); /* so that we can use dotenv files */
const app = express(); //so we can build express application
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
/* Helmet: Helmet is a popular middleware for securing web applications 
in Node.js. It provides various security-related HTTP headers to help 
protect against common web vulnerabilities. Helmet can be used to set 
headers such as Content-Security-Policy, Strict-Transport-Security, 
X-Content-Type-Options, X-XSS-Protection, and more.

Cross-Origin Policy: Cross-Origin Resource Sharing (CORS) is a mechanism 
used by web browsers to allow or restrict access to resources (e.g., fonts, 
scripts, or APIs) on a web page from different domains. CORS policies are
implemented to prevent certain types of cross-site attacks and protect 
user data. The CORS policy is defined by the server and specifies which
origins (domains) are allowed to access its resources.*/
app.use(morgan("common"));
/* Morgan is a popular logging middleware for Node.js web applications,
specifically designed for logging HTTP requests. It provides an easy way 
to generate logs that capture important information about incoming 
requests and outgoing responses.

By integrating Morgan into your application, you can automatically log 
details such as the HTTP method, URL, status code, response time, and more.
This logging information is useful for debugging, monitoring, and analyzing 
the behavior of your application during development or in production 
environments.

Morgan offers various logging formats that you can choose from, including
"common", "combined", "dev", and others. Each format represents a different
level of detail and includes specific fields in the log output. You can 
select the format that best suits your needs based on the level of 
information you want to capture in your logs. */
app.use(bodyParser.json({ limit: "30mb", extended: true}));
/* extended: true: Enables the extended mode of the JSON 
parser. This allows parsing of nested objects and arrays. */
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
/* This middleware is used to parse URL-encoded data from incoming requests.*/
app.use(cors());


app.use(cors({
    origin: 'http://localhost:3000'
  }));
/* The cors middleware is used to enable Cross-Origin Resource Sharing,
which allows your application to make requests to resources from a 
different domain. */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
/* To store our images and and files */
//
//
//
//
/* File Storage Configuration */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "pubilc/assets");
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
/* This code sets up the storage configuration for multer,
a middleware used for handling file uploads in Node.js 
applications. 
 
Please note that this code is just a configuration example
for multer storage and should be used in conjunction with the 
multer middleware to handle file uploads in your Node.js application. 
Make sure to adjust the destination directory according to your file 
storage requirements and ensure that the directory exists and is 
accessible by your application*/
const upload = multer({ storage }); // this variable would be used to upload the file

/* ROUTES WITH FILES */

/*we have this section only when we need to upload the files, other 
routes will be in routes folder */

app.post("/auth/register", register);// we did not add this to the routes folder because we need the upload folder here
/* Here it will hit this route and upload the picture on the assets location
and the logic for theat is in register- these functions are normally called 
controller, upload is the middlewere function that will run before we 
hit the endpoint. */
app.post("/post", verifyToken, upload.single("picture"), createPost);


/*ROUTES*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);// routhes for all user specific things
app.use("/posts", postRoutes);//routes for all the post specific things

// MONGOOSE SETUP
const PORT=process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    /* ADD DATA ONE TIME */
    //User.insertMany(users);
    //Post.insertMany(posts);

}).catch((error) => console.log(`${error} did not connect`));
/* mongoose.connect(process.env.MONGO_URL, { useNewUrlParse: true,
useUnifiedTopology: true }) connects to the MongoDB database specified 
in the MONGO_URL environment variable. It uses the useNewUrlParser and 
useUnifiedTopology options for ensuring compatibility with the latest 
MongoDB driver. 

Inside the then() block, app.listen(PORT, () => console.log(Server Port:
${PORT})) starts the server and listens on the specified port. It also 
logs a message to the console indicating the port on which the server is 
running.*/











