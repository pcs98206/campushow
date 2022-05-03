import express from 'express';
import { handleHome, getSell, postSell, getEdit, postEdit, see, remove } from '../controllers/fileController';
import { handleMypage, handleMyinfo } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.route("/sell").get(getSell).post(postSell);
globalRouter.route("/sell/:id([0-9a-f]{24})").get(getEdit).post(postEdit);
globalRouter.get("/:id([0-9a-f]{24})", see);
globalRouter.get("/delete/:id([0-9a-f]{24})", remove);
globalRouter.get("/mypage", handleMypage);
globalRouter.get("/myinfo", handleMyinfo);

export default globalRouter;