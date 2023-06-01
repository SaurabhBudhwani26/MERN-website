import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser)//this route is gonna be /user/:id
// if frontend is giving some id, we can grab id and call our database
//this is called a query string
/* read routes represent routes for the grabing information, as we are not
saving any thing to the database or changing and updating any thing */
router.get("/:id/friends", verifyToken, getUserFriends)

/*UPDATE*/
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

/*patch is an HTTP method used to partially update a resource on the 
server. It is typically used when you want to modify only specific 
fields or properties of an existing resource.
*/

export default router;

