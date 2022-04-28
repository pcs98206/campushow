import express from 'express';
import { handleHome, getSell, postSell } from '../controllers/fileController';
import { handleMypage, handleMyinfo } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.route("/sell").get(getSell).post(postSell);
globalRouter.get("/mypage", handleMypage);
globalRouter.get("/myinfo", handleMyinfo);

export default globalRouter;