import express from 'express';

import {login, signUp } from "../controllers/authentication";


export default(router: express.Router) => {
    router.post('/auth/signup', signUp);
    router.post("/auth/login", login);
}