import express from 'express';
import morgan from 'morgan';
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import globalRouter from './routers/globalRouter';
import oauthRouter from './routers/oauthRouter';
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
app.use(flash());
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use('/static', express.static("assets"));
app.use('/upload', express.static("upload"));
app.use("/", globalRouter);
app.use("/oauth", oauthRouter);
app.use("/api", apiRouter);

export default app;