import User from "../models/User.js";

/* READ */

export const getUser = async(req, res) => {

    try{

        const { id } = req.params;
        // grabbing the id from a particular fronted string
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch(err) {
        res.status(404).json({ message: error.message });
    }

}

export const getUserFriends = async (req, res) => {


    try {
        
    const { id } = req.params;
    const user = await User.findById(id);
    

    const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
    //This will grab all the information from the friend ids
    

    );//this will make multiple api calls for database
    /* Promise.all() is a method in JavaScript that takes an array of 
    promises as input and returns a new promise. It allows you to 
    execute multiple promises concurrently and wait for all of them 
    to resolve or reject. */


    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath}
        }

        /* Inside the function, a new object is created using the 
        extracted properties, and this new object is returned. 
        The object will have the same properties as the original 
        friend object, but only with the selected properties.
        
        This function uses destructuring to extract specific properties
        from each friend object.*/

    )

    // Formatting for proper way in frontend
    
    res.status(200).json(formattedFriends);

    } catch(err) {
        res.status(404),json({ message: err.messagg });
    }

};


/* UPDATE */
export const addRemoveFriend = async (req ,res) => {
    try{
        const { id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            // this will remove the friend from the friend list
            friend.friends = friend.friends.filter((id) => id != id);
            //this will remove the user from friends friend list
        } else {
            user.friends.push(friendId);
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
            //This will grab all the information from the friend ids
            
        
            );//this will make multiple api calls for database
            /* Promise.all() is a method in JavaScript that takes an array of 
            promises as input and returns a new promise. It allows you to 
            execute multiple promises concurrently and wait for all of them 
            to resolve or reject. */
        
        
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath}
            });
        
        
            res.status(200).json(formattedFriends);


    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
// SO we can grab our userfriends as needed