import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use('/static', express.static("assets"));

app.use("/", globalRouter);

export default app;