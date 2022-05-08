import express from 'express';
import morgan from 'morgan';
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
import globalRouter from './routers/globalRouter';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL}),
    cookie:{
        maxAge: 1000*60*60
    }
}));
app.use(localsMiddleware);
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use('/static', express.static("assets"));

app.use("/", globalRouter);

export default app;