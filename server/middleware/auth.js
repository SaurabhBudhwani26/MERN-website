import jwt from "jsonwebtoken"
/* AUTHORIZATION PROCESS */
export const verifyToken = async(req, res, next) => {
    // the next parameter will allow us to have the function continue
    try {

        let token = req.header("Authorization");
        // the token in the front end will be set according to this

        if (!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")) {
            //Make sure it starts with Bearer in frontend
            token = token.slice(7, token.length).trimLeft();

        }

        const verified = jwt.verify(token.  process.env.JWT_SECRET);
        //verifying the authenticity of the token

        req.user = verified
        next();/*this will now percieve to the next part(controller 
        function) in the routes statements */

    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}

/* we will put this in the middle before the controllers functions in 
the routes that we create */ 