import express from 'express';
import {getUsers, deleteUser, getUserById} from "../db/users";

export const getAllUsers = async(req:express.Request, res: express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message})
    }
}

export const deleteUserById = async(req:express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const deletedUser = await deleteUser(id);
        return res.json(deletedUser);
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message})
    }
}
export const updateUser = async(req:express.Request, res:express.Response) => {
    try{
        const {username} = req.body;
        const {id} = req.params;
        if(!username){
            return res.status(404).json({message: "not found"});
        }
        const user = await getUserById(id);
        user.username = username;
        await user.save();
        return res.status(200).json(user).end();
        

    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message})
    }
}