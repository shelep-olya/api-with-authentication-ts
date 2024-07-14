import express from 'express';

import {signUp } from "../controllers/authentication";

export default(router: express.Router) => {
    router.post('/auth/signUp', signUp);
}