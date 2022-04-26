import express from 'express';
import { handleHome } from '../controllers/fileController';

const globalRouter = express.Router();

globalRouter.get("/", handleHome);

export default globalRouter;