import User from "../Models/User"
export const getUser = async (req , res)=>{
    try {
        const {id} = req.params ;
        const user = await User.findById(id);
        res.status(200).json(user) ; 
    } catch (err) {
        res.status(404).json({message : err.message})
    }
}

export const getUserFriends = async (req , res)=>{
    try {
        const {id} = req.params 
        const user = await User.findById(id) ;
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) 
        )
        const formattedFriends = friends.map(
            ({_d, firstName, lastName, occupation , location , picturePath}) =>{
            return  {_d, firstName, lastName, occupation , location , picturePath}
        })
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({message : err.message})
    }
    

}
export const addRemoveFriend = async (req , res)=>{
    try {
        const {_id, friendId } = req.params 
        const user = await User.findById(_id) ;
        const friend = await User.findById(friendId) 

        if(user.friends.includes(friend)){
            user.friend = user.friends.filter((id) => id !== friendId) ;
            friend.friends =  friend.friends.filter((id) => id !== _id) ;
        }
        else{
            user.friends.push(friendId) ;
            friend.friends.push(_id) ;
        }
        await user.save() 
        await friend.save() 
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) 
        )
        const formattedFriends = friends.map(
            ({_d, firstName, lastName, occupation , location , picturePath}) =>{
            return  {_d, firstName, lastName, occupation , location , picturePath}
        })

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message : err.message})
    }
}