import express from 'express';
import { handleHome } from '../controllers/fileController';
import { handleMypage, handleMyinfo } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/mypage", handleMypage);
globalRouter.get("/myinfo", handleMyinfo);

export default globalRouter;