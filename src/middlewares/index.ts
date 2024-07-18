import express from "express";
import {get, merge} from 'lodash';

import { getUserBySessionToken } from "../db/users";

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        if(!currentUserId){
            return res.status(404).json({message: "not found"});
        }
        if(currentUserId.toString() !== id){
            return res.status(403).json({message: "something went wrong"}); 
        }
        next();
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
}

export const isAuthenticated = async(req: express.Request, res: express.Response, next:express.NextFunction) => {
    try{
        const sessionToken = req.cookies["COOKIE_AUTH"];
        if(!sessionToken){
            return res.status(403).json({message: "you're not logged in"});
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.status(404).json({message: "not found"});
        }

        merge(req, {identity:existingUser});
        return next();
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message})
    }
}