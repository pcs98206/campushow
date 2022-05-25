import express from 'express';
import { handleHome, getSell, postSell, getEdit, postEdit, see, remove, search, fileDownload} from '../controllers/fileController';
import { mypage, getMyinfo, postMyinfo, getJoin, postJoin, getLogin, postlogin, logout } from '../controllers/userController';
import { protectMiddleware, publicMiddleware, uploadFilesMulter, uploadAvatarsMulter } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.route("/sell").all(protectMiddleware).get(getSell).post(uploadFilesMulter.single('uploadFile'), postSell);
globalRouter.route("/sell/:id([0-9a-f]{24})").all(protectMiddleware).get(getEdit).post(postEdit);
globalRouter.get("/:id([0-9a-f]{24})", see);
globalRouter.get("/:id([0-9a-f]{24})/download", fileDownload);
globalRouter.get("/delete/:id([0-9a-f]{24})", protectMiddleware, remove);
globalRouter.get("/search", search);
globalRouter.route("/join").all(publicMiddleware).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicMiddleware).get(getLogin).post(postlogin);
globalRouter.get("/logout", protectMiddleware, logout);
globalRouter.get("/mypage", protectMiddleware, mypage);
globalRouter.route("/myinfo").all(protectMiddleware).get(getMyinfo).post(uploadAvatarsMulter.single('uploadAvatar'), postMyinfo);

export default globalRouter;

