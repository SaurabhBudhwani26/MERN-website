import express from "express";
import { login } from "../controllers/auth.js"

const router = express.Router()
/* This line allows us to have these routes in seperate file and allows 
us to configure them 

express.Router() function creates a new instance of an Express router 
object that can be used to define routes for specific paths in your 
application.

By assigning the new router to the router variable, you can then use 
this router to define routes and middleware specific to that router.*/

router.post("/login", login);
router.get('/xyz', (req, res) =>
{
    res.json("Saurabh");
})
/* here qwe are not using /auth/login it is considered to be prifixed 
beacuse it is used in index.js

Unlike HTTP GET requests, which typically include data in the URL 
parameters, POST requests include the data in the body of the request. 
This allows for sending larger amounts of data and more complex data 
structures. */

export default router;