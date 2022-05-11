import express from 'express';
import { githubStart, githubFinish } from '../controllers/userController';
import { protectMiddleware, publicMiddleware } from "../middlewares";

const oauthRouter = express.Router();

oauthRouter.get("/github/start", publicMiddleware, githubStart);
oauthRouter.get("/github/finish", publicMiddleware, githubFinish);

export default oauthRouter;