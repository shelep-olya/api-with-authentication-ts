import express from 'express';
import { createUser, getUserByEmail } from 'db/users';
import { authentication, random } from 'helpers';

export const signUp = async(req:express.Request, res:express.Response)=> {
    try{
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.status(400).json({message: "Please enter all the credentials."});
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({message: "You are already signed up."})
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
        return res.status(200).json(user).end();

    }catch(err){
        console.log(err);
        return res.status(400).json({message: err.message})
    }
}