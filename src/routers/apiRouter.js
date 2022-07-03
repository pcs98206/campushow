import express from 'express';
import { registerView, registerComment, deleteComment } from '../controllers/fileController';

const apiRouter = express.Router();

apiRouter.post("/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/:id([0-9a-f]{24})/comment", registerComment);
apiRouter.delete("/comment/:id([0-9a-f]{24})/delete", deleteComment);

export default apiRouter;