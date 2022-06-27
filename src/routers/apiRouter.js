import express from 'express';
import { registerView } from '../controllers/fileController';

const apiRouter = express.Router();

apiRouter.post("/:id([0-9a-f]{24})/view", registerView);

export default apiRouter;