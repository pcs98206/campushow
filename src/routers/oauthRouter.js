import express from 'express';
import { getGithubStart, getGithubFinish } from '../controllers/userController';

const oauthRouter = express.Router();

oauthRouter.get("/github/start", getGithubStart);
oauthRouter.get("/github/finish", getGithubFinish);

export default oauthRouter;