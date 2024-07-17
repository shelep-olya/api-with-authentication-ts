import express from 'express';
import { createUser, getUserByEmail } from 'db/users';
import { authentication, random } from 'helpers';

export const login = async(req: express.Request, res: express.Response) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "please enter both credentials"})
        }

        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
        if(!user){
            return res.status(404).json({message: "user not found"})
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if(user.authentication.password !== expectedHash){
            return res.status(403);
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie("COOKIE_AUTH", user.authentication.sessionToken, {domain: 'localhost', path: '/'});
        return res.status(200).json(user).end();
    }catch(err){
        console.log(err);
        return res.status(400).json({message: err.message})
    }
}

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